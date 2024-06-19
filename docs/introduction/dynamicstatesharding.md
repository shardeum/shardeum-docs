---
title: Dynamic State Sharding
sidebar_position: 3
---

export const DynamicTable=()=>(
<table>
<tr><th>Static Sharding</th><th>Dynamic Sharding</th></tr>
<tr><td>Shards pre-exist</td><td>Shards are formed as needed</td></tr>
<tr><td>Shards address space is pre-determined </td><td>  Shards address space is variable</td></tr>
<tr><td>Asynchronous processing of multi-shard transaction</td><td> Synchronous processing of multi-shard transactions</td></tr>
<tr><td> No composability for cross shard transactions</td><td>Atomic composability for all transactions</td></tr>
</table>
    );

# Dynamic State Sharding

There are two types of State Sharding - **Static State Sharding** & **Dynamic State Sharding**.

<DynamicTable />

The most general approach to sharding is to divide the address space of accounts into multiple fixed-size regions called shards. Nodes in the network are assigned to different shards.

In a dynamic state sharding system like Shardeum, shards can adapt to changes in network conditions. It involves splitting or merging shards, adding or removing nodes from shards, or reassigning nodes to different shards. Reorganization can help maintain an optimal balance between the system's load and resources, ensuring the network operates efficiently and securely. Shard reorganization happens through various algorithms that respond to changes in real time.

In Shardeum, each validator covers a unique range of addresses and only needs to execute transactions assigned to it and store respective state changes. Although each validator covers a unique range of addresses, some validators cover the same addresses in the sense of overlap, thus adding redundancy. Ensuring every address in Shardeum has the required redundancy of at least 128 validators.

Compared to Static State Sharding, Dynamic State Sharding allows the number of shards and their composition to change dynamically based on network conditions. This adaptability enables Dynamic State Sharding to optimize the system's performance and resource allocation with increased efficiency.

* Shardeum employs dynamic sharding to distribute data and computational tasks across multiple nodes efficiently. This system adjusts the shard allocation based on the network's needs, optimizing both storage and processing resources.
* Shards are managed so that no single node has a complete set of data, enhancing security and performance. The network's sharding mechanism is designed to adapt to changes in node count and transaction volume, allowing for scalable and responsive network operations.
* These combined mechanisms enable Shardeum to manage a large network of nodes, handle high transaction volumes, and maintain security and consistency across the distributed ledger.


