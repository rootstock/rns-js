import Web3 from 'web3';
import Registry from './Registry';

export default class RNS {
  constructor (web3Provider, options = {}) {
    const web3 = new Web3(web3Provider, options);

    this.registry = new Registry(web3, options);
  }
}
