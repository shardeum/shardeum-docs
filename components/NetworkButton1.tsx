"use client"; 

import React from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function ConnectToSphinx() {
  const chainId = '0x1f92';
  const rpcURL = 'https://sphinx.shardeum.org/';
  const networkName = 'Shardeum Sphinx 1.X ';
  const currencyName = 'SHM';
  const currencySymbol = 'SHM';
  const explorerURL = 'https://explorer-sphinx.shardeum.org/';
  const iconUrls = 'https://ipfs.io/ipfs/QmRVnDJue9wyEq8zBhvm24W1sLUcdGqLhTMpso6GoJVkzf';

  const addNetwork = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected! Install Metamask then try again.");
      return;
    }
    if (window.ethereum.networkVersion == 8082) {
      alert("You are already connected to Shardeum Sphinx 1.X (chainId 8082).");
      return;
    }
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId,
            chainName: networkName,
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
        alert("Failed to add the network with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <button 
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
      onClick={addNetwork}
    >
      Connect to Shardeum Sphinx
    </button>
  );
}
