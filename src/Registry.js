import registryAbi from './abi/RegistryABI';
import { hash as namehash } from 'eth-ens-namehash';

export default class Registry {
  /**
   * @param {Web3} web3 web3.js lib
   * @param {Address} address contract address in network
   * @param {Object} options web3.js options
   *
   * @constructor
   */
  constructor (web3, address, options = {}) {
    this.contract = new web3.eth.Contract(registryAbi, address, options);
    this.sha3 = web3.utils.sha3;
  }

  /**
   * Gets a name's owner
   * @param {String} name
   *
   * @returns {Promise<Address>}
   */
  owner (name) {
    const hash = namehash(name);

    return this.contract.methods.owner(hash).call()
  }

  /**
   * Sets a name's owner
   * @param {String} name
   * @param {Address} owner
   *
   * @returns {Promise<TxHash>}
   */
  setOwner (name, owner) {
    const hash = namehash(name);

    return this.contract.methods.setOwner(hash, owner).send();
  }

  /**
   * Gets a name's resolver
   * @param {String} name
   *
   * @returns {Promise<Address>}
   */
  resolver (name) {
    const hash = namehash(name);

    return this.contract.methods.resolver(hash).call()
  }

  /**
   * Sets a name's resolver
   * @param {String} name
   * @param {Address} resolver
   *
   * @returns {Promise<TxHash>}
   */
  setResolver (name, resolver) {
    const hash = namehash(name);

    return this.contract.methods.setResolver(hash, resolver).send();
  }

  /**
   * Gets a name's time to live
   * @param {String} name
   *
   * @returns {Promise<Address>}
   */
  ttl (name) {
    const hash = namehash(name);

    return this.contract.methods.ttl(hash).call()
  }

  /**
   * Sets a name's time to live
   * @param {String} name
   * @param {Number} ttl
   *
   * @returns {Promise<TxHash>}
   */
  setTtl (name, ttl) {
    const hash = namehash(name);

    return this.contract.methods.setTTL(hash, ttl).send();
  }

  /**
   * Sets a name's subnode owner
   * @param {String} name
   * @param {String} label
   * @param {Address} owner
   *
   * @returns {Promise<TxHash>}
   */
  setSubnodeOwner (name, label, owner) {
    const hash = namehash(name);
    const subnode = this.sha3(label);

    return this.contract.methods.setSubnodeOwner(hash, subnode, owner).send();
  }
}
