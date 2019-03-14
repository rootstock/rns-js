import registrarAbi from './abi/RegistrarABI';

export default class Registrar {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Object} options web3.js options
   * @param {Address} address contract address in network
   *
   * @constructor
   */
  constructor (web3, options = {}, address) {
    this.contract = web3.eth.Contract(registrarAbi, address, options);
    this.sha3 = web3.utils.sha3;
  }

  state (label) {
    const hash = this.sha3(label);

    return this.contract.methods.state(hash).call();
  }
}
