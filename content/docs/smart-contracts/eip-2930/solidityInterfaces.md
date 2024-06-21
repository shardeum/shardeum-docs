---
title: Solidity Interfaces
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Multicall Contracts

:::tip Automated Access List

Sphinx 1.X has automated the accessList for Shardeum RPC nodes to route shards.

Therefore, you no longer need to specify the accessList for these networks with automated accessList generation. 

This document is useful for: 

-educational purposes  
-situations where the automated accessList fails and you need to specify the accessList directly

:::

## What are Solidity interfaces?

Solidity interfaces allow smart contracts to interact with each other.

## Why are Solidity interfaces useful?

Solidity interfaces can:

-call contracts with different Solidity versions

-use functions that are only needed for their use case

## How do I define a Solidity interface?

The contract interface is defined above the contract that will be calling the contract interface.
Functions are then defined inside the interface based on name, inputs and modifiers.

## Where are Solidity interface functions defined?

A contract interface instance needs to be created in the contract that will be using the interface.
The contract interface is then defined when its address is set inside the constructor for the contract using the interface.

## When should I use a Solidity interface?

One popular contract that is useful with interfaces is WETH (Wrapped Ether).
This contract converts MSG.VALUE into an ERC-20 instance. On Shardeum, SHM Is MSG.VALUE.
Therefore, WETH is WSHM on Shardeum. This contract has wrap and unwrap functions:

Deposit (Wrap): SHM => WSHM.

Withdraw (Unwrap): WSHM => SHM.

Using a WSHM interface, we can create a Solidity 0.8.0 contract that can interact with WSHM (Solidity 0.4.0).

## WSHM Solidity 0.4.0

<Tabs>
  <TabItem value="solidity" label="Solidity" default>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.18;

contract WSHM {
    string public name     = "Wrapped SHM";
    string public symbol   = "WSHM";
    uint8  public decimals = 18;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    mapping (address => uint)                       public  balanceOf;
    mapping (address => mapping (address => uint))  public  allowance;

    function() public payable {
        deposit();
    }
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        Deposit(msg.sender, msg.value);
    }
    function withdraw(uint wad) public {
        require(balanceOf[msg.sender] >= wad);
        balanceOf[msg.sender] -= wad;
        msg.sender.transfer(wad);
        Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view returns (uint) {
        return this.balance;
    }

    function approve(address guy, uint wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad)
        public
        returns (bool)
    {
        require(balanceOf[src] >= wad);

        if (src != msg.sender && allowance[src][msg.sender] != uint(-1)) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        Transfer(src, dst, wad);

        return true;
    }
}
```

  </TabItem>
</Tabs>

## WSHM interface Solidity 0.8.0 With Multicall Contract 

<Tabs>
  <TabItem value="solidity" label="Solidity" default>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface interfaceWSHM {

    function transfer(address dst, uint wad) external returns (bool);

    function transferFrom(address src, address dst, uint wad) external returns (bool);

    function withdraw(uint wad) external;

    function deposit() external payable;

}

contract multicallWSHM {

    interfaceWSHM public WSHM;

    receive() external payable {}

    fallback() external payable {}

    constructor() {
        WSHM = interfaceWSHM(0xa80d5d2C8Cc0d06fBC1F1A89A05d76f86082C20e); // WSHM address.
    }

    function multicallDeposit() public payable {
        WSHM.deposit{value: msg.value}();
        WSHM.transfer(msg.sender, msg.value);
    }

    function multicallWithdraw(uint256 amount) public {
        WSHM.transferFrom(msg.sender,address(this),amount);
        WSHM.withdraw(amount);
        payable(msg.sender).transfer(address(this).balance);
    }

}
```

  </TabItem>
</Tabs>

