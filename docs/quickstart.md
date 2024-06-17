---
title: Quickstart
sidebar_position: 1
slug: /quickstart
---




## Shardeum Overview


Shardeum is an EVM Compatible L1 blockchain that uses dynamic state sharding to keep transaction fees low forever.

### Why Shardeum?

**EVM Compatibility:** Shardeum is tailor-made for those familiar with Ethereum's virtual machine, ensuring a smooth transition and user-friendly experience.

**Low Gas Fees:** Experience minimal transaction costs, making decentralized applications more accessible and cost-effective.

**True Decentralization:** Shardeum stands firm on its commitment to decentralization, ensuring a platform where everyone has a voice.

**Robust Security:** With token slashing implemented in Quorum, malicious activities by validators are deterred, ensuring a trustworthy network.

**Dynamic State Sharding:** Shardeum's use of dynamic state sharding ensures unparalleled scalability, processing more transactions per second than many competitors.

**Proof of Quorum:** A unique consensus mechanism that combines the best of proof of stake and proof of Quorum, ensuring faster and more secure transactions.

**Seamless Transition:** Developers can effortlessly deploy their Ethereum-based smart contracts to Shardeum, expanding their reach and impact.

**Wallet Support:** No need for additional downloads; Shardeum supports wallets based on EVM by default, streamlining user experience.

**Community-Centric:** Built and developed by a global community of developers and shardians, Shardeum is more than a platform; it's a movement.


## Cross Shard Composability with Linear Scaling

Shardeum is sharded, allowing the network to scale linearly with more nodes.
Horizontally scaling in this fashion allows for high transactions per second at low gas prices.

Find out more about Shardeum nodes:

[Shardeum Node Types](https://github.com/kaksv/shardeum-docs/blob/main/docs/node/types.md)

Running nodes:

[How to run a validator node](https://github.com/kaksv/shardeum-docs/blob/main/docs/node/Run/Validator)

## Wallet Setup For Using Shardeum

You will need an EVM wallet like Metamask to:

- pay for transaction gas fees
- transfer tokens
- interact with smart contracts

For more info on Metamask:

[Metamask Introduction](https://github.com/kaksv/shardeum-docs/blob/main/docs/wallets/metamask/introduction.md)

## Fund Your Wallet With SHM On Shardeum

Find out how to get testnet tokens from our faucets here:

[Claim testnet SHM From Shardeum Faucets](https://github.com/kaksv/shardeum-docs/blob/main/docs/faucet/claim.md)

## Connect Wallet To Shardeum

Connect to Shardeum using the following network endpoints found here:

[Shardeum Endpoints](https://github.com/kaksv/shardeum-docs/blob/main/docs/network/endpoints.mdx)

Note: you can quickly connect your Metamask to Shardeum with:

[https://chainlist.org/?testnets=true&search=Shardeum](https://chainlist.org/?testnets=true&search=Shardeum)

## Reading Shardeum Transactions

View transactions on Shardeum using the Shardeum Explorer:

[Shardeum Explorer](https://github.com/kaksv/shardeum-docs/blob/main/docs/network/explorer.md)

## Deploy Contracts to Shardeum

Since Shardeum is EVM compatible, you can use the following frameworks to deploy to Shardeum:

[Remix IDE](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/deploy/remix.md)

[Foundry](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/deploy/foundry.md)

[Hardhat](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/deploy/hardhat.md)



To deploy contracts at the same address cross chain:

[Same Address Cross Chain](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/deploy/same-address.md)

## Deploying Tokens To Shardeum

All EVM based token standards are supported on Shardeum (since Shardeum is EVM compatible).
Popular tokens supported on Shardeum:

[ERC-20 (Fungible Tokens)](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/tokens/erc-20.md)

[ERC-721 (NFTs)](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/tokens/erc-721.md)

[ERC-1155 (Token Emulator)](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/tokens/erc-1155.md)

## Cross Shard Composability Communication With EIP-2930

Smart contract addresses that don't have the same prefix are deployed to different shards.
The EIP-2930 accessList is used for shard routing contracts on different shards and is automated inside Shardeum nodes.

For more info on how the EIP-2930 accessList works on Shardeum:

[EIP-2930 Overview](https://github.com/kaksv/shardeum-docs/blob/main/docs/smart-contracts/eip-2930/multicall-contract.md)

## Integrate File Storage Into Shardeum

We recommend users to use decentralized file storage standards like IPFS and Filecoin.

Files stored on IPFS can be used in contracts to deploy contracts with CID values as shown in this example:

[IPFS and Filecoin](https://github.com/kaksv/shardeum-docs/blob/main/docs/storage/ipfs-and-filecoin.md)

## Oracles on Shardeum

Get off chain data securely on Shardeum using oracle providers.

[SupraOracles](https://github.com/kaksv/shardeum-docs/blob/main/docs/oracles/supraoracles.md)
