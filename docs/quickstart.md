---
title: Quickstart
sidebar_position: 1
slug: /quickstart
---




## Shardeum Overview


Shardeum is a layer 1 distributed ledger technology (DLT) that is compatible with the Ethereum Virtual Machine (EVM). Shardeum is designed to keep transaction fees low forever uing one of Shardeum’s core 
innovations called [dynamic state sharding](https://docs.shardeum.org/introduction/dynamicstatesharding). Please read the Shardeum whitepaper [here](https://docs.shardeum.org/whitepaper/).

### Why Shardeum?

**EVM Compatibility:** Shardeum uses the Ethereum Virtual Machine (EVM), enabling a smooth transition to Shardeum for pre-existing developers and users familiar with Ethereum.

**Low Transaction Fees For All Users:** Shardeum has minimal fees and maximum efficiency. All decentralization applications (dApps) benefit from lower transaction expenses, enhancing the accessibility 
and cost-efficiency of decentralized applications. The true scalability revolution has begun. 

**True Decentralization:** Shardeum has been designed with decentralization at its core. Shardeum delivers a genuinely decentralized platform by design; with its architecture, tokenomics, node design, 
scalability solutions and governance, ensuring that there’s no centralization or single points of failure.

**Multi-layered Security:** Shardeum takes a multi-layered approach to security using cryptography, slashing, node ejection, verifier nodes and other methods to deter and penalize attackers, 
raising the bar for solid and robust security.

**Dynamic State Sharding:** Shardeum’s innovatiove dynamic state sharding enables true linear scaling, autoscaling, and horizontal scaling without a ceiling to transactions per second (TPS), 
facilitating unprecedented scalability.

**Proof of Quorum:** A groundbreaking consensus mechanism that is a core innovation on Shardeum, enabling horizontal scaling and first-come, first-served transaction processing. 
Its blockless and leaderless structure prevents any single validator from censoring or prioritizing transactions unfairly. Due to these features, miner extractable value (MEV) is eliminated, 
enhancing transaction security and fairness.

**Instantly Portable dApps:** Developers can seamlessly transition their Ethereum-based smart contracts and dApps to Shardeum, utilizing familiar languages such as Solidity and Vyper 
with instant smart contract portability. This ease of migration between Ethereum and Shardeum extends applications' reach and impact. Additionally, Shardeum's consistently low fees 
ensure that dApp users are not forced to switch networks due to congestion or exorbitant costs.

**Wallet Compatibility:** Shardeum natively supports EVM-based wallets, eliminating the need for additional downloads and simplifying the user experience.

**Community-Centric:** Shardeum is forged by a global community of developers and Shardians, transforming it from a platform to a global movement.


## Cross Shard Composability with Linear Scaling

Shardeum is sharded, allowing the network to scale linearly with more nodes.
Horizontally scaling in this fashion allows for high transactions per second at low gas prices.

Find out more about Shardeum nodes:

[Shardeum Node Types](/node/types)

Running nodes:

[How to run a validator node](/Node/Run/Validator)

## Wallet Setup For Using Shardeum

You will need an EVM wallet like Metamask to:

- pay for transaction gas fees
- transfer tokens
- interact with smart contracts

For more info on Metamask:

[Metamask Introduction](/wallets/MetaMask/introduction)

## Fund Your Wallet With SHM On Shardeum

Find out how to get testnet tokens from our faucets here:

[Claim testnet SHM From Shardeum Faucets](/faucet/claim)

## Connect Wallet To Shardeum

Connect to Shardeum using the following network endpoints found here:

[Shardeum Endpoints](/network/endpoints)

Note: you can quickly connect your Metamask to Shardeum with:

[https://chainlist.org/?testnets=true&search=Shardeum](https://chainlist.org/?testnets=true&search=Shardeum)

## Reading Shardeum Transactions

View transactions on Shardeum using the Shardeum Explorer:

[Shardeum Explorer](/network/explorer)

## Deploy Contracts to Shardeum

Since Shardeum is EVM compatible, you can use the following frameworks to deploy to Shardeum:

[Remix IDE](/smart-contracts/deploy/remix)

[Foundry](/smart-contracts/deploy/foundry)

[Hardhat](/smart-contracts/deploy/hardhat)



To deploy contracts at the same address cross chain:

[Same Address Cross Chain](/smart-contracts/deploy/same-address)

## Deploying Tokens To Shardeum

All EVM based token standards are supported on Shardeum (since Shardeum is EVM compatible).
Popular tokens supported on Shardeum:

[ERC-20 (Fungible Tokens)](/smart-contracts/tokens/ERC-20)

[ERC-721 (NFTs)](/smart-contracts/tokens/ERC-721)

[ERC-1155 (Token Emulator)](/smart-contracts/tokens/ERC-1155)

## Cross Shard Composability Communication With EIP-2930

Smart contract addresses that don't have the same prefix are deployed to different shards.
The EIP-2930 accessList is used for shard routing contracts on different shards and is automated inside Shardeum nodes.

For more info on how the EIP-2930 accessList works on Shardeum:

[EIP-2930 Overview](/smart-contracts/eip-2930/multicall-contract)

## Integrate File Storage Into Shardeum

We recommend users to use decentralized file storage standards like IPFS and Filecoin.

Files stored on IPFS can be used in contracts to deploy contracts with CID values as shown in this example:

[IPFS and Filecoin](/storage/ipfs-and-filecoin)

## Oracles on Shardeum

Get off chain data securely on Shardeum using oracle providers.

[SupraOracles](/oracles/supraoracles)
