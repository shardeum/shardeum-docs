---
title: Quickstart
sidebar_position: 1
---

# Quickstart

## What is Shardeum?

Shardeum is a blockchain that supports EVM smart contracts.

For more general information on Shardeum:

[What is Shardeum?](/)

## What makes Shardeum special?

Shardeum is sharded, allowing the network to scale linearly with more nodes.
Horizontally scaling in this fashion allows for high transactions per second at low gas prices.

Find out more about Shardeum nodes:

[Shardeum Node Types](/Nodes/Node-Types)

## How do I start using Shardeum?

You will need an EVM wallet like Metamask to:

      -pay for transaction gas fees
      -transfer tokens
      -interact with smart contracts

For more info on Metamask:

[Metamask Introduction](/Wallets/Metamask/Introduction)

## How do I fund my wallet to pay for transaction gas fees, transfer tokens and interact with smart contracts?

Find out how to get testnet tokens from our faucets here:

[Claim LIberty 100 SHM From Shardeum Faucets](/Faucet/Claim)

## How can I connect to Shardeum with Metamask?

Connect to Shardeum using the following network endpoints found here:

[Shardeum Endpoints](/Network/Endpoints)

Note: you can quickly connect your Metamask to Shardeum with:

[chainlist.org](https://chainlist.org/)

## How do I view transactions on Shardeum?

View transactions on Shardeum using the Shardeum Explorer:

[Shardeum Explorer](/Network/Explorer)

## How do I deploy smart contracts to Shardeum?

Since Shardeum is EVM compatible, you can use the following frameworks to deploy to Shardeum:

[Remix IDE](/SmartContracts/Deploy/Remix)

[Hardhat](/SmartContracts/Deploy/Hardhat)

[Truffle](/SmartContracts/Deploy/Truffle)

## What tokens can I deploy to Shardeum?

All EVM based token standards are supported on Shardeum (since Shardeum is EVM compatible).
Popular tokens supported on Shardeum:

[ERC-20 (Fungible Tokens)](/SmartContracts/Tokens/ERC-20)

[ERC-721 (NFTs)](/SmartContracts/Tokens/ERC-721)

[ERC-1155 (Token Emulator)](/SmartContracts/Tokens/ERC-1155)

## How does sharding impact development on Shardeum?

Smart contract addresses that don't have the same prefix are deployed to different shards.
EIP-2930 accessList info is needed for transactions multicalling other contracts.

Here is a guide on how to use EIP-2930 accessList info:

[EIP-2930 Overview](/SmartContracts/EIP-2930/MulticallContract)

Shardeum is developing an RPC call to automate EIP-2930 accessList generation for transactions, which can be used with ethers.js.

## How do I integrate large files into Shardeum?

We recommend users to use decentralized file storage standards like IPFS and Filecoin.

Files stored on IPFS can be used in contracts to deploy contracts with CID values as shown in this example:

[IPFS and Filecoin](/Storage/IPFSandFilecoin)
