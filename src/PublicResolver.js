import publicResolverAbi from './abi/PublicResolverABI';
import { hash as namehash } from 'eth-ens-namehash';

export default class PublicResolver {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Object} options web3.js options
   * @param {Address} address contract address in network
   *
   * @constructor
   */
  constructor (web3, options = {}, address) {
    this.contract = web3.eth.Contract(publicResolverAbi, address, options);
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
  setAddr (name, address) {
    const hash = namehash(name);

    return this.contract.methods.setAddr(hash, address).send();
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
  setContent (name, content) {
    const hash = namehash(name);

    return this.contract.methods.setContent(hash, content).send();
  }
}
