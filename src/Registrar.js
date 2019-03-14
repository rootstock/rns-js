import registrarAbi from './abi/RegistrarABI';
import { registrarAddress } from './contracts';

export default class Registrar {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3, options = {}) {
    this.contract = web3.eth.Contract(registrarAbi, registrarAddress, options);
    this.sha3 = web3.utils.sha3;
  }

  state (label) {
    const hash = this.sha3(label);

    return this.contract.methods.state(hash).call();
  }
}
