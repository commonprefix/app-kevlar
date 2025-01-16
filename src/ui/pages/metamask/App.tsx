import { useState } from 'react';
import kevlarLogo from '../../../../kevlar.png';
import './App.css'

function App() {
  const [added, setAdded] = useState(false);

  const handleAddToMetamask = async () => {
    try {
      // Assuming you have access to the necessary variables from start-rpc.ts
      const chainId = '0x1'; // Example: Mainnet chain ID
      const chainName = 'Ethereum Mainnet'; // Example: Mainnet name
      const nativeCurrency = {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      };
      const rpcUrls = ['http://localhost:8546']; // Example RPC URL
      const blockExplorerUrls = ['https://etherscan.io'];

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId,
          chainName,
          nativeCurrency,
          rpcUrls,
          blockExplorerUrls,
        }],
      });

      // Notify the server about the button click
      await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Button clicked to add to MetaMask' }),
      });

      setAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={kevlarLogo} alt="Kevlar Logo" style={{ height: '95px', marginBottom: '20px' }} />
      </div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>kevlar</h1>
      <p style={{ fontSize: '1rem', marginBottom: '20px' }}>Make your wallet trustless.</p>
      {
        added && <button disabled style={{ pointerEvents: 'none' }}>Added to MetaMask</button>
      }
      {
        !added && <button onClick={handleAddToMetamask} style={{ padding: '10px 20px' }}>Add to MetaMask</button>
      }
      <p style={{ fontSize: '0.875rem', marginTop: '30px' }}>
        By <a style={{ color: 'gray' }} href="https://commonprefix.com" target="_blank" rel="noopener noreferrer">
          Common Prefix
        </a>
      </p>
    </div>
  )
}

export default App
