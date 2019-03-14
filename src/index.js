import Web3 from 'web3';
import Registry from './Registry';
import PublicResolver from './PublicResolver';
import Registrar from './Registrar';
import defaultAddresses from './contracts';

export default class RNS {
  /**
   * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} web3Provider web3.js provider
   * @param {Object} options web3.js options
   * @param {Object} addresses with ./contracts.json format
   *
   * @constructor
   */
  constructor (web3Provider, options = {}, addresses = defaultAddresses) {
    const web3 = new Web3(web3Provider, options);

    this.registry = new Registry(web3, addresses.registryAddress, options);
    this.publicResolver = new PublicResolver(web3, addresses.publicResolverAddress, options);
    this.registrar = new Registrar(web3, addresses.registrarAddress, addresses.rifAddress, options);
  }
}
