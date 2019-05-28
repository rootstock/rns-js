const RegistryContract = artifacts.require('RNS');
const PublicResolverContract = artifacts.require('PublicResolver');
const PublicResolver = require('../src/PublicResolver');

contract('Resolver', accounts => {
  let resolver;
  const rsk = 'rsk';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const zeroBytes = '0x0000000000000000000000000000000000000000000000000000000000000000';

  beforeEach(async () => {
    const registryContract = await RegistryContract.new();

    const resolverContract = await PublicResolverContract.new(registryContract.address);

    const rootNode = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const tld = web3.utils.sha3(rsk);
    await registryContract.setResolver(rootNode, resolverContract.address);
    await registryContract.setSubnodeOwner(rootNode, tld, accounts[0]);

    resolver = new PublicResolver(web3, resolverContract.address);
  });

  it('should get a name\'s addr', async () => {
    const addr = await resolver.addr(rsk);

    assert.equal(addr, zeroAddress);
  });

  it('should set a name\'s addr', async () => {
    const addr = '0x0000000000111111111122222222223333333333';
    await resolver.setAddr(rsk, addr, { from: accounts[0] });

    const actualAddr = await resolver.addr(rsk);

    assert.equal(actualAddr, addr);
  });

  it('should get a name\'s content', async () => {
    const content = await resolver.content(rsk);

    assert.equal(content, zeroBytes);
  });

  it('should set a name\'s content', async () => {
    const content = '0x0000000000111111111122222222223333333333444444444444444444445555';
    await resolver.setContent(rsk, content, { from: accounts[0] });

    const actualContent = await resolver.content(rsk);

    assert.equal(actualContent, content);
  });
});
