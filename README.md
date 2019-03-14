# rns-js - RNS JavaScript API

This is the RNS JavaScript API which connects to the RNS Smart Contracts.

You need to run a local or remote RSK node to use this library.

## Installation

Still just local...

```sh
git clone https://github.com/ilanolkies/rns-js
cd rns-js
yarn install
yarn link
```

## Usage

```js
import RNS from 'rns-js';

const rns = new RNS('ws://localhost:8546');

rns.publicResolver.addr('ilanolkies.rsk').then(console.log);
// 0x118cab081...
```

Also try it with REact and MetaMask:

```js
import React, { Component } from 'react';
import RNS from 'rns-js';

class Resolver extends Component {
  constructor (props) {
    super(props);

    this.state = {
      enabled: false,
      addr: null
    }

    this.unlock = this.unlock.bind(this);
  }

  unlock () {
    window.ethereum.enable().then(accounts => {
      this.setState({ enabled: true });

      if (window.ethereum.networkVersion !== '30') alert('Please connect to RSK MainNet!');

      this.rns = new RNS(window.ethereum, { defaultAccount: accounts[0] });
    });
  }

  resolve (name) {
    this.rns.publicResolver.addr(name).then(addr => {
      this.setState({ addr });
    });
  }

  render () {
    if (!this.state.enabled) {
      return <button onClick={this.unlock}>Unlock</button>;
    }

    let input

    return (
      <div className="App">
        <form onSubmit={e => {
          e.preventDefault();
          this.resolve(input.value);
        }}>
          <input type='text' ref={node => (input = node)} />
          <button type='submit'>resolve</button>
        </form>
        <label>addr: {this.state.addr}</label>
      </div>
    );
  }
}

export default Resolver;
```
