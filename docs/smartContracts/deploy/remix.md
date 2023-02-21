---
title: Remix IDE
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Remix IDE is an open source web and desktop application. It fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. Remix is used for the entire journey of contract development as well as act as a playground for learning and teaching Ethereum.

1, Visit https://remix.ethereum.org/

## Writing your smart contract

2, Create a "New File" under contracts with name HelloWorld.sol.

![remix_1](/img/remix/remix_1.jpg)

3, Copy and paste the code below to HelloWorld.sol file.

<Tabs>
  <TabItem value="solidity" label="Solidity" default>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17; // Specifies the version of Solidity, using semantic versioning.

contract HelloWorld { // Defines a contract named `HelloWorld`

   string public message; // Declares a state variable `message` of type `string`.

   constructor(string memory initMessage) {    // Constructors are used to initialize the contract's data.
      message = initMessage;      // Accepts a string argument `initMessage`.
   }

   function update(string memory newMessage) public { // A public function that accepts a string argument.
      message = newMessage;
   }

}
```

  </TabItem>
</Tabs>

## Compiling

4, Compile HelloWorld.sol.

![remix_2](/img/remix/remix_2.jpg)

## Deploying to Shardeum

5, Select Injected Web3 for deploying to Shardeum.

:::caution
If Injected Web3 cannot detect the network, refresh the Remix IDE page, and then switch between networks in MetaMask.
:::

![remix_3](/img/remix/remix_3.jpg)

6, Deploy the compiler contract.

![remix_4](/img/remix/remix_4.jpg)

7, Confirm the deploy transaction in MetaMask.

![remix_5](/img/remix/remix_5.jpg)

8, Find the deployed contract address in Remix.

![remix_6](/img/remix/remix_6.jpg)

## Interacting

9, Update the contract by interacting with the contract.

![remix_7](/img/remix/remix_7.jpg)

10, Confirm the deploy transaction in MetaMask.

![remix_8](/img/remix/remix_8.jpg)

11, Check the contract has been updated.

![remix_9](/img/remix/remix_9.jpg)
