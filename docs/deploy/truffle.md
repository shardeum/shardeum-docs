---
title: Truffle
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Truffle is a world-class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.

## Environment Setup

There are a few technical requirements for developers to start using Truffle. Install the following dependencies:

- NodeJS v12 or later ([available here](https://nodejs.org/en/))
- Npm/Yarn Package Installer (included with Node)
- Windows, Linux or Mac OS X

## Installing Truffle

Once the above dependencies are installed successfully. You can now install Truffle.

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
npm install -g truffle
```

  </TabItem>
</Tabs>

To verify that Truffle is installed properly, type truffle version into the terminal (cmd).

## Creating a Project

After ensuring Truffle is installed successfully. Create your own project, name it "testToken".

 - Create a new directory for your Truffle project

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
mkdir testToken
cd testToken
```

  </TabItem>
</Tabs>

- Initialize your project

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
truffle init
```

  </TabItem>
</Tabs>

Once this operation is complete, you'll now have a project structure with the following items:

```
1. contracts/: Directory for Solidity contracts
2. migrations/: Directory for scriptable deployment files
3. test/: Directory for test files for testing your application and contracts
4. truffle-config.js: Truffle configuration file
5. build(visible after compile): Compiled Solidity contracts with bytecode and ABI
```

## Create Contract

You can write your own smart contract, or use open-source openzeppellin standard contracts and buidl on top of them.

We are using openzeppelin for our testToken, which requires a dependency.

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
npm install @openzeppelin/contracts
```

  </TabItem>
</Tabs>

After the dependency is installed, create a file named "testToken.sol" in the contract directory.

<Tabs>
  <TabItem value="solidity" label="Solidity" default>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract testToken is ERC20 {

  constructor(uint256 initialSupply) ERC20("shardeumTestToken", "STT") {
      _mint(msg.sender, initialSupply);
  }

}
```

  </TabItem>
</Tabs>

## Compile Contract

To compile a Truffle project, change to the root directory (in our case testToken directory) and run the command in the terminal.

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
truffle compile
```

  </TabItem>
</Tabs>

## Coding Migrations

To deploy our testToken contract on Shardeum Liberty, we have to create a migration to get the contract on the network.
Create a file in the migrations folder named "2_deploy.js".

<Tabs>
  <TabItem value="javascript" label="Javascript" default>

```js
var test = artifacts.require("testToken");

module.exports = function(deployer) {
  // deployment
  deployer.deploy(test, '10000000000000000000000');
};
```

  </TabItem>
</Tabs>

## Configuring Truffle For Shardeum Liberty

- Go to truffle-config.js (located in root directory)
- Update with Shardeum Liberty details ([available here](/Network/endpoints))

<Tabs>
  <TabItem value="javascript" label="Javascript" default>

```js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    liberty: {
      provider: () => new HDWalletProvider(mnemonic, `https://liberty10.shardeum.org/`),
      network_id: 8080,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // A version or constraint - Ex. "^0.5.0"
    }
  }
}
```

  </TabItem>
</Tabs>

**Note:** Make sure to add your mnemonic or private key and add it to a separate file ".secret" (make sure never to upload this file to GitHub or GitLab).

Make sure you have @truffle/hdwallet-provider dependency installed, if not install it using the below command.

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
npm i @truffle/hdwallet-provider
```

  </TabItem>
</Tabs>

## Deploying on Shardeum Liberty

To deploy our testToken contract run this command in the testToken directory:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
truffle migrate --network liberty
```

  </TabItem>
</Tabs>

The contract will be deployed on Shardeum Liberty, it should look like this:

```
Starting migrations...
======================
> Network name:    'liberty'
> Network id:      8080
> Block gas limit: 20000000000 (0x4a817c800)

2_deploy.js
===========

   Deploying 'testToken'
   ---------------------
   > transaction hash:    0x9a3fcdb6d517d7cf0ee69f8076d020e1bba8cdd01378cc34eaf1030a7fdfc273
   > Blocks: 0            Seconds: 8
   > contract address:    0x4d63Ba5f3E48dbE7f2b1e459C74BE94B8d61e919
   > block number:        11
   > block timestamp:     1438271100
   > account:             0xFa0B6609cd5d8fC19A1aC16311da1466FaF09978
   > balance:             99.964878389908455424
   > gas used:            1170047 (0x11da7f)
   > gas price:           20 gwei
   > value sent:          0.00429 ETH
   > total cost:          0.02769094 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02769094 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.02769094 ETH
```

Congratulations! You have successfully deployed ERC20 Smart Contract. Now you can interact with the Smart Contract by building a dApp.
