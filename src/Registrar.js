import registrarAbi from './abi/RegistrarABI';
import rifAbi from './abi/erc677ABI.json';

const BID_SIGN = '0x1413151f';

export default class Registrar {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Address} address contract address in network
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3, registrarAddress, rifAddress, options = {}) {
    this.contract = new web3.eth.Contract(registrarAbi, registrarAddress, options);
    this.rif = new web3.eth.Contract(rifAbi, rifAddress, options);
    this.sha3 = web3.utils.sha3;
  }

  /**
   * Start an auction for {label}.rsk
   * @param {String} label
   *
   * @returns {Promise<TxHash>}
   */
  startAuction (label) {
    const hash = this.sha3(label);

    return this.contract.methods.startAuction(hash).send();
  }

  /**
   * New bid using ERC-677 transferAndCall method
   * @param {Bytes32} shaBid
   * @param {Number} rifs
   *
   * @returns {Promise<TxHash>}
   */
  newBidWithToken (shaBid, rifs) {
    const data = BID_SIGN + shaBid.slice(2);
    const tokens = rifs * (10**18);

    return this.rif.methods.transferAndCall(this.registrarAddress, tokens, data).send();
  }

  /**
   * Unseal a bid for {label}.rsk
   * @param {String} label
   * @param {Number} rifs
   * @param {Bytes32} salt
   *
   * @returns {Promise<TxHash>}
   */
  unsealBid (label, rifs, salt) {
    const hash = this.sha3(label);
    const tokens = rifs * (10**18);

    return this.contract.methods.unsealBid(hash, tokens, salt).send();
  }

  /**
   * Finalize auction for {label}.rsk
   * @param {String} label
   *
   * @returns {Promise<TxHash>}
   */
  finalizeAuction (label) {
    const hash = this.sha3(label);

    return this.contract.methods.finalizeAuction(hash).send();
  }

  /**
   * Gets the {label}.rsk auction state
   * @param {String} label
   *
   * @returns {Promise<Number>}
   */
  state (label) {
    const hash = this.sha3(label);

    return this.contract.methods.state(hash).call();
  }

  /**
   * Gets auction information of {label}.rsk
   * @param {String} label
   *
   * @returns {Prmoise<Object>}
   */
  entries (label) {
    const hash = this.sha3(label);

    return this.contract.methods.entries(hash).call();
  }

  /**
   * Hashes a bid for {label}.rsk of {rifs} value
   * @param {String} label
   * @param {Address} owner
   * @param {Number} rifs
   * @param {Bytes32} salt
   *
   * @returns {Promise<Bytes32>}
   */
  shaBid (label, owner, rifs, salt) {
    const hash = this.sha3(label);
    const tokens = rifs * (10**18);

    return this.contract.methods.shaBid(hash, owner, tokens, salt).call();
  }
}
