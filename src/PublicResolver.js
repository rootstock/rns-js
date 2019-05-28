const publicResolverAbi = require('./abi/PublicResolverABI');
const namehash = require('eth-ens-namehash').hash;

class PublicResolver {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Address} address contract address in network
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3, address, options = null) {
    this.contract = new web3.eth.Contract(publicResolverAbi, address, options);
  }

  /**
   * Resolves a domain's addr
   * @param {String} name
   *
   * @returns {Promise<Address>}
   */
  addr (name) {
    const hash = namehash(name);

    return this.contract.methods.addr(hash).call();
  }

  /**
   * Sets a domain's addr resolution
   * @param {String} name
   * @param {Address} addr
   *
   * @returns {Promise<TxHash>}
   */
  setAddr (name, address, options = null) {
    const hash = namehash(name);

    return this.contract.methods.setAddr(hash, address).send(options);
  }

  /**
   * Resolves a domain's content
   * @param {String} name
   *
   * @returns {Promise<Bytes32>}
   */
  content (name) {
    const hash = namehash(name);

    return this.contract.methods.content(hash).call();
  }

  /**
   * Sets a domain's content resolution
   * @param {String} name
   * @param {Bytes32} content
   *
   * @returns {Promise<TxHash>}
   */
  setContent (name, content, options = null) {
    const hash = namehash(name);

    return this.contract.methods.setContent(hash, content).send(options);
  }
}

module.exports = PublicResolver;
