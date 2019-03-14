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
