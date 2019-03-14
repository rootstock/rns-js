import Web3 from 'web3';
import Registry from './Registry';
import PublicResolver from './PublicResolver';

export default class RNS {
  /**
   * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} web3Provider web3.js provider
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3Provider, options = {}) {
    const web3 = new Web3(web3Provider, options);

    this.registry = new Registry(web3, options);
    this.publicResolver = new PublicResolver(web3, options);
  }
}
