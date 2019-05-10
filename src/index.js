import Registry from './Registry';
import PublicResolver from './PublicResolver';
import Registrar from './Registrar';
import mainnetContracts from './contracts';

export default class RNS {
  /**
   * @param {AbstractSocketProvider|HttpProvider|CustomProvider|String} web3Provider web3.js provider
   * @param {Object} options web3.js options
   * @param {Object} addresses with ./contracts.json format
   *
   * @constructor
   */
  constructor (web3, contracts = mainnetContracts) {
    this.registry = new Registry(web3, contracts.rns);
    this.publicResolver = new PublicResolver(web3, contracts.publicResolver);
    this.registrar = new Registrar(web3, contracts.rskRegistrar, contracts.rif);
  }
}
