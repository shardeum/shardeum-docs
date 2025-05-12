"use client";

import React from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ConnectToShardeumProps {
  network: 'mainnet' | 'testnet';
}

export default function ConnectToShardeum({ network }: ConnectToShardeumProps) {
  // Network configuration based on network type
  const config = {
    mainnet: {
      rpcURL: 'https://api.shardeum.org',
      chainId: '0x1fb6', // 8118 in decimal
      chainName: 'Shardeum',
      explorerURL: 'https://explorer.shardeum.org',
      networkVersion: 8118
    },
    testnet: {
      rpcURL: 'https://api-testnet.shardeum.org',
      chainId: '0x1f93', // 8083 in decimal
      chainName: 'Shardeum Testnet',
      explorerURL: 'https://explorer-testnet.shardeum.org',
      networkVersion: 8083
    }
  };

  const { rpcURL, chainId, chainName, explorerURL, networkVersion } = config[network];
  const currencyName = 'SHM';
  const currencySymbol = 'SHM';
  const iconUrls = 'https://ipfs.io/ipfs/QmRVnDJue9wyEq8zBhvm24W1sLUcdGqLhTMpso6GoJVkzf';

  const addNetwork = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected! Install Metamask then try again.");
      return;
    }
    if (window.ethereum.networkVersion == networkVersion) {
      alert(`You are already connected to ${chainName} (chainId ${networkVersion}).`);
      return;
    }
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId,
            chainName: chainName,
            rpcUrls: [rpcURL],
            blockExplorerUrls: [explorerURL],
            iconUrls: [iconUrls],
            nativeCurrency: {
              name: currencyName,
              symbol: currencySymbol,
              decimals: 18,
            },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Failed to add the network with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  return (
    <button 
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
      onClick={addNetwork}
    >
      Connect to Shardeum {network === 'mainnet' ? 'Mainnet' : 'Testnet'}
    </button>
  );
}
