const RegistryContract = artifacts.require('RNS');
const RIFContract = artifacts.require('ERC677TokenContract');
const TokenRegistrarContract = artifacts.require('TokenRegistrar');
const Registrar = require('../src/Registrar');
const namehash = require('eth-ens-namehash').hash;

const chai = require('chai');
const bnChai = require('bn-chai');
chai.use(bnChai(web3.utils.BN));
const expect = chai.expect;

contract('Registrar', accounts => {
  let registrar, rifContract, registrarContract;

  beforeEach(async () => {
    const totalSupply = web3.utils.toBN(1e20);
    rifContract = await RIFContract.new(accounts[0], totalSupply);

    const registryContract = await RegistryContract.new();

    const rootNode = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const tld = 'rsk'

    registrarContract = await TokenRegistrarContract.new(registryContract.address, namehash(tld), rifContract.address);
    await registryContract.setSubnodeOwner(rootNode, web3.utils.sha3(tld), registrarContract.address);

    registrar = new Registrar(web3, registrarContract.address, rifContract.address);
  });

  it('should get a label\'s state', async () => {
    const state = await registrar.state('domain');

    expect(state).to.eq.BN(0);
  });

  it('should get a label\'s entry', async () => {
    const entry = await registrar.entries('domain');

    expect(entry).to.deep.equal({
      '0': '0',
      '1': '0x0000000000000000000000000000000000000000',
      '2': '0',
      '3': '0',
      '4': '0'
    });
  })

  it('should start an auction', async () => {
    const label = 'domain';

    await registrar.startAuction(label, { from: accounts[0] });

    const state = await registrar.state(label);

    expect(state).to.eq.BN(1);
  });

  it('should bid in an auction', async () => {
    const label = 'domain';

    await registrar.startAuction(label, { from: accounts[0] });

    const shaBid = await registrar.shaBid(label, accounts[1], 1, '0x00');

    //await registrar.newBidWithToken(shaBid, 1, { from: accounts[0] });
  })
});
