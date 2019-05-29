const RegistryContract = artifacts.require('RNS');
const Registry = require('../src/Registry');

const chai = require('chai');
const bnChai = require('bn-chai');
chai.use(bnChai(web3.utils.BN));
const expect = chai.expect;

contract('Regitry', accounts => {
  let registry;
  const resolver = '0x0000000000111111111122222222223333333333';
  const rsk = 'rsk';

  beforeEach(async () => {
    const registryContract = await RegistryContract.new();

    const rootNode = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const tld = web3.utils.sha3(rsk);
    await registryContract.setResolver(rootNode, resolver);
    await registryContract.setSubnodeOwner(rootNode, tld, accounts[0]);

    registry = new Registry(web3, registryContract.address);
  });

  it('should get a name\' owner', async () => {
    const owner = await registry.owner(rsk);

    assert.equal(owner, accounts[0]);
  });

  it('should get a name\'s resolver', async () => {
    const actualResolver = await registry.resolver(rsk);

    assert.equal(actualResolver, resolver);
  });

  it('should get a name\'s ttl', async () => {
    const ttl = await registry.ttl(rsk);

    expect(ttl).to.eq.BN(web3.utils.toBN(0));
  });

  it('should set a subnode owner', async () => {
    const domain = 'domain';

    await registry.setSubnodeOwner(rsk, domain, accounts[1], { from: accounts[0] });

    const owner = await registry.owner(`${domain}.${rsk}`);

    assert.equal(owner, accounts[1]);
  });

  it('should set a node\'s owner', async () => {
    await registry.setOwner(rsk, accounts[1], { from: accounts[0] });

    const owner = await registry.owner(rsk);

    assert.equal(owner, accounts[1]);
  });

  it('should set a node\'s resolver', async () => {
    const resolver = '0x4444444444555555555566666666667777777777';
    await registry.setResolver(rsk, resolver, { from: accounts[0] });

    const actualResolver = await registry.resolver(rsk);

    assert.equal(actualResolver, resolver);
  });

  it('should set a node\'s ttl', async () => {
    const ttl = 1;
    await registry.setTtl(rsk, 1, { from: accounts[0] });

    const actualTtl = await registry.ttl(rsk);

    expect(actualTtl).to.eq.BN(ttl);
  });
});
