import React, {useState} from 'react';

export default function connectToSphinx() {

  const chainId = '0x1f92';
  const rpcURL = 'https://sphinx.shardeum.org/';
  const networkName = 'Shardeum Validator Sphinx ';
  const currencyName = 'SHM';
  const currencySymbol = 'SHM';
  const explorerURL = 'https://explorer-sphinx.shardeum.org/';
  const iconUrls='https://ipfs.io/ipfs/QmRVnDJue9wyEq8zBhvm24W1sLUcdGqLhTMpso6GoJVkzf';


  const addNetwork = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected! Install Metamask then try again.")
      return;
    }
    if (window.ethereum.networkVersion == 8082) {
      alert("You are already connected to Sphinx Validator 1.X (chainId 8082).", )
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
              symbol: currencySymbol, // 2-6 characters long
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
      <button className="button buttonHighContrast" onClick={addNetwork}>Connect to Shardeum Sphinx Validator </button>
  );

}
