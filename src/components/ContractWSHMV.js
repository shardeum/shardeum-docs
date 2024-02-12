import React from 'react';

export default function ContractComponent() {
  const tokenAddress = '0x1dacbab28decd115c8aa6f183877c71b942ae406'; 
  const tokenSymbol = 'WSHM';
  const tokenDecimals = 18;
  const tokenImage = 'https://www.redwolf.in/image/catalog/marketplace/shardeum/shardeum-artist-image.png'; 
  const chainId = '0x1f92'; 
  const rpcURL = 'https://sphinx.shardeum.org/'; 
  const chainName = 'Shardeum Sphinx 1.X';
  const nativeCurrencyName = 'SHM'; 
  const nativeCurrencySymbol = 'SHM';
  const addToken = async () => {
    const ethereum = window.ethereum;

    // Check if Metamask is installed
    if (!window.ethereum) {
      alert("Metamask not detected! Install Metamask then try again.")
      return;
    }

    // Switch to desired network if not already connected
    const network = await ethereum.request({ method: 'net_version' });
    if (network !== chainId) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chainId,
            chainName: chainName,
            rpcUrls: [rpcURL],
            nativeCurrency: {
              name: nativeCurrencyName,
              symbol: nativeCurrencySymbol,
              decimals: 18,
            },
          }],
        });
      } catch (addError) {
        console.error(addError);
        return;
      }
    }

    // Continue adding token
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log('Token was added!');
      } else {
        console.log('Token was not added.');
      }
    } catch (watchError) {
      console.error(watchError);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #000',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: 'white',
      marginBottom: '10px',
      color: 'black',
      fontWeight: 'bold'
    }}>
      <div>
        <div 
          style={{cursor: 'pointer'}}
        >
          Contract Name: {tokenSymbol}
        </div>
        <div
          style={{cursor: 'pointer'}}
        >
          Contract Address: {tokenAddress}
        </div>
      </div>
      <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '10px',
            padding: '10px',
            cursor: 'pointer'
          }} 
        onClick={addToken}
      >
        Add Contract
      </button>
    </div>
  );
}
