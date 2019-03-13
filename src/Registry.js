import registryAbi from './abi/RegistryABI';
import { registryAddress } from './contracts';
import { hash as namehash } from 'eth-ens-namehash';

export default class Registry {
  constructor (web3, options = {}) {
    this.contract = web3.eth.Contract(registryAbi, registryAddress, options);
  }

  owner (name) {
    const hash = namehash(name);

    return this.contract.methods.owner(hash).call()
  }

  setOwner (name, owner) {
    const hash = namehash(name);

    return this.contract.methods.setOwner(hash, owner).send();
  }

  resolver (name) {
    const hash = namehash(name);

    return this.contract.methods.resolver(hash).call()
  }

  setResolver (name, resolver) {
    const hash = namehash(name);

    return this.contract.methods.setResolver(hash, resolver).send();
  }

  ttl (name) {
    const hash = namehash(name);

    return this.contract.methods.ttl(hash).call()
  }

  setTtl (name, ttl) {
    const hash = namehash(name);

    return this.contract.methods.setTTL(hash, ttl).send();
  }
}
