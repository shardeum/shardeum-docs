import React, {useState} from 'react';

export default function connectToSphinx() {

  const chainId = '0x1f92';
  const rpcURL = 'https://atomium.shardeum.org/';
  const networkName = 'Shardeum Atomium ';
  const currencyName = 'SHM';
  const currencySymbol = 'SHM';
  const explorerURL = 'https://explorer-atomium.shardeum.org/';
  const iconUrls='https://ipfs.io/ipfs/QmRVnDJue9wyEq8zBhvm24W1sLUcdGqLhTMpso6GoJVkzf';


  const addNetwork = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected! Install Metamask then try again.")
      return;
    }
    if (window.ethereum.networkVersion == 8082) {
      alert("You are already connected to Shardeum Atomium(chainId 8082).", )
      return;
    }
    try{
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
      alert("Failed to add the network with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    }

  };

  return (
      <button className="button buttonHighContrast" onClick={addNetwork}>Connect to Shardeum Atomium </button>
  );

}
