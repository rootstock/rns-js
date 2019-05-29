const registrarAbi = require('./abi/RegistrarABI');
const rifAbi = require('./abi/erc677ABI.json');

const BID_SIGN = '0x1413151f';

class Registrar {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Address} address contract address in network
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3, registrarAddress, rifAddress, options = {}) {
    this.contract = new web3.eth.Contract(registrarAbi, registrarAddress, options);
    this.registrarAddress = registrarAddress;
    this.rif = new web3.eth.Contract(rifAbi, rifAddress, options);
    this.utils = web3.utils;
  }

  toUint256Tokens (value) {
    return this.utils.numberToHex(value * (10**18));
  }

  /**
   * Start an auction for {label}.rsk
   * @param {String} label
   *
   * @returns {Promise<TxHash>}
   */
  startAuction (label, options) {
    const hash = this.utils.sha3(label);

    return this.contract.methods.startAuction(hash).send(options);
  }

  /**
   * New bid using ERC-677 transferAndCall method
   * @param {Bytes32} shaBid
   * @param {Number} value
   *
   * @returns {Promise<TxHash>}
   */
  newBidWithToken (shaBid, value, options) {
    const data = BID_SIGN + shaBid.slice(2);
    const tokens = this.toUint256Tokens(value);

    return this.rif.methods.transferAndCall(this.registrarAddress, tokens, data).send(options);
  }

  /**
   * Unseal a bid for {label}.rsk
   * @param {String} label
   * @param {Number} value
   * @param {Bytes32} salt
   *
   * @returns {Promise<TxHash>}
   */
  unsealBid (label, value, salt, options) {
    const hash = this.utils.sha3(label);
    const tokens = this.toUint256Tokens(value);

    return this.contract.methods.unsealBid(hash, tokens, salt).send(options);
  }

  /**
   * Finalize auction for {label}.rsk
   * @param {String} label
   *
   * @returns {Promise<TxHash>}
   */
  finalizeAuction (label, options) {
    const hash = this.utils.sha3(label);

    return this.contract.methods.finalizeAuction(hash).send(options);
  }

  /**
   * Gets the {label}.rsk auction state
   * @param {String} label
   *
   * @returns {Promise<Number>}
   */
  state (label) {
    const hash = this.utils.sha3(label);

    return this.contract.methods.state(hash).call();
  }

  /**
   * Gets auction information of {label}.rsk
   * @param {String} label
   *
   * @returns {Prmoise<Object>}
   */
  entries (label) {
    const hash = this.utils.sha3(label);

    return this.contract.methods.entries(hash).call();
  }

  /**
   * Hashes a bid for {label}.rsk of a given value
   * @param {String} label
   * @param {Address} owner
   * @param {Number} value
   * @param {Bytes32} salt
   *
   * @returns {Promise<Bytes32>}
   */
  shaBid (label, owner, value, salt) {
    const hash = this.utils.sha3(label);
    const tokens = this.toUint256Tokens(value);

    return this.contract.methods.shaBid(hash, owner, tokens, salt).call();
  }
}

module.exports = Registrar;
