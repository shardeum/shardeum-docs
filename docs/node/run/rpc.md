---
title: RPC
sidebar_position: 2
---

# Running an RPC

Welcome to the comprehensive guide on setting up a Shardeum RPC node. Before we dive into the technicalities, let's establish a foundational understanding of what we're building and its significance in the broader landscape of blockchain technology.

## What is an RPC (Remote Procedure Call) Node?

An RPC node serves as a bridge between your application and the Shardeum network. It allows you to read and change the state of smart contracts, query network data, and submit transactions. Essentially, an RPC node provides an accessible interface to interact with the Shardeum network's state and ledger, enabling applications to communicate with Shardeum in a structured and efficient manner.

## Importance of RPCs in the DLT/Blockchain/Web3 Ecosystem

RPC nodes are critical for the scalability and accessibility of blockchain networks. They facilitate a decentralized infrastructure by allowing more endpoints for users and developers to interact with the blockchain. This interaction is vital for performing various operations, from simple queries about account balances to complex smart contract executions.

## Benefits of Running a Shardeum RPC Node?

Running your own Shardeum RPC node offers several advantages that enhance both performance and decentralization:

- **Increased Read and Write Speed:** Having direct access to a dedicated RPC node significantly reduces latency in DLT interactions, leading to faster transaction submissions and data retrieval.
- **Enhanced Privacy and Security:** By running your own node, you have control over the data flow and can implement tailored security measures, reducing reliance on third-party providers.
- **Support for Network Decentralization:** Operating your own RPC node contributes to the network's resilience and decentralization. A higher number of independent nodes ensures better distribution of data and redundancy, crucial for maintaining the network's integrity and availability.
- **Customization and Control:** With your own RPC node, you gain the flexibility to customize settings, optimize performance, and manage updates according to your requirements, providing a tailored environment for your blockchain interactions.

By setting up a Shardeum RPC node, you're not just enhancing your blockchain experience; you're also contributing to the growth and stability of the network. This guide is designed to navigate you through the setup process, ensuring you have the knowledge and tools to successfully deploy and manage your node.

Let's embark on this journey to unlock the full potential of blockchain technology through the power of Shardeum RPC nodes.

# Setting Up Shardeum RPC Node on a Server

If you are attempting to set up an RPC node on a personal computer, you can jump to the section below titled "Clone the Repository and Install."

## Prerequisites/Requirements

Before you begin the setup process for your Shardeum RPC node, ensure you meet the following technical and knowledge requirements:

### Technical Requirements

- **SSH Access**: You must have SSH access to your Ubuntu server. This access is crucial for securely connecting and executing commands on your server.
- **Administrative Privileges**: Sudo or root access on the server is required to install software, change configurations, and manage services.
- **Git**: A recent version of Git installed on your server is necessary for cloning the "json-rpc-server" repository. We recommend using Git version 2.20 or later to ensure compatibility and security.
- **Node.js**: The "json-rpc-server" relies on Node.js for its runtime environment. Please ensure you have Node.js version 18 or newer installed. This version supports the necessary features and ensures stability for your RPC node.
- Access to the "json-rpc-server" repository URL: https://github.com/shardeum/json-rpc-server

### Knowledge Requirements

- **Blockchain Fundamentals**: A basic understanding of blockchain technology and principles is essential. Familiarity with concepts such as blocks, transactions, smart contracts, and consensus mechanisms will help you manage and troubleshoot your RPC node more effectively.
- **Command-Line Interface (CLI) Operations**: Comfort with using the command-line interface is crucial for server management and software deployment. You'll be running commands, editing configuration files, and monitoring logs through the CLI.

## Step-by-Step Guide

This guide provides detailed instructions on how to securely access a server via SSH, deploy the "json-rpc-server" application, configure necessary files, and validate the setup by testing the node's functionality. This document is intended for exchanges or parties interested in setting up a JSON RPC node for Shardeum.

A video walkthrough of the process can also be found here: https://youtu.be/knsUIuw23BA

### Accessing the Server via SSH

**SSH Connection**:

Connect to your server using the SSH command:

```bash
ssh username@server_ip_address
```

Replace `username` with your server's username and `server_ip_address` with the server's IP address.

### Deploying the RPC Node

#### Update and Install Dependencies

1.  **Update Package Manager**:

    - Once connected, update your server's package manager:

```bash
sudo apt update && sudo apt upgrade -y
```

2.  **Install Dependencies**:

    - Install any required dependencies that your "json-rpc-server" might need. Common dependencies include Git and Node.js. If not already installed, they can typically be installed via:

```bash
sudo apt install git nodejs npm -y
```

#### Clone the Repository and Install

1.  **Clone the Repository**:

    - Clone the "json-rpc-server" repository to your server:

```bash
git clone https://github.com/shardeum/json-rpc-server.git
```

2.  **Navigate to the Repository Directory**:

    - Change directory to the cloned repository:

```bash
cd json-rpc-server
```

3.  **Install Project Dependencies**:

    - Install Node.js dependencies defined in the project:

```bash
npm install
```

### Configure Archiver IP and Run Server

#### _Configuring an up-to-date archiver is essential to operating a functional RPC Node. Due to security concerns, Shardeum does not currently publicly share current archiver IP addresses. If you are a representative from a partner of Shardeum or another interested party, please contact a Shardeum representative and you will be provided an up-to-date archiver IP_

**Edit Configuration Files (if necessary)**:

You can try running your RPC node at this point by calling the following:

```bash
npm run start
```

If you get an error along the lines of:

```
Environment variable ARCHIVER_INFO is not defined
Archivers URL not found in config
Failed to fetch data from archiver 127.0.0.1:4000: Error: connect ECONNREFUSED 127.0.0.1:4000
No archivers responded when fetching current active archivers
unhandledRejection:Error: No archivers responded
```

you'll need to manually configure the archiver IP with which your RPC node interacts. Contact a Shardeum representative for the best archiver IP address for your purposes and then proceed as follows.

Make sure you are in the json-rpc-server directory and do the following. Open the archiverConfig.json file:

```bash
nano archiverConfig.json
```

Use the arrow keys to navigate to the "ip": "127.0.0.1", line (Note that this was the archiver IP at the time of this document's creation).

Delete 127.0.0.1 and replace it with the IP address provided by your Shardeum representative.

Once you've made the change, you can save and exit nano by pressing Ctrl + O to write the changes, pressing Enter to confirm, and then Ctrl + X to exit the editor.

**Start the RPC Server**:

Start the server using npm.

```bash
npm run start
```

## Testing Your RPC Server

Once your RPC server is running, you can test it by making some read calls. It is advised that you give the node at least 10 minutes to sync after spinning it up to avoid issues.Shardeum uses a similar API modality as Ethers and you can make similar calls, for example:

```bash
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://`{your_server_IP}`:8080
```

Be sure to replace "your_server_IP" in the above call and you should get a non-zero response once your node is synced. Also note that this assumes you've not manually configured the port used to something other than 8080.

You can check an EOA's balance with:

```bash
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x924FA9B0565848a50Cc3e555eB5263a8288629f9", "latest"],"id":1}' http://`{your_server_IP}`:8080
```

## Troubleshooting

### Port Considerations

This repo defaults to using Port 8080 for external communication. If you have something else using this port, when testing your RPC Node setup, you may get a response like "(52) Empty Response from Server". If this is the case, you can either terminate the process using Port 8080, or if necessary, configure the port used by the json-rpc-server manually with the following steps:

The file where port configuration is located is: json-rpc-server(root)>src>config.ts

```bash
cd src
```

Next, open config.ts for editing:

```bash
nano config.ts
```

Next, use the arrow keys to move down to line 97 where, by default, it will read "port: 8080," and change this line to the desired port. Save the change with "CONTROL + O", "ENTER", and then exit with "CONTROL + X"

## Contact Information

hi@shardeum.org

### Terms Used

- **DLT**: Distributed Ledger Technology
