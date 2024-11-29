import { useState } from 'react';
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
    <div className="App" style={{ height: '100%', overflowY: 'auto', padding: '0'}}>
      {
        added && <div>Added to MetaMask</div>
      }
      {
        !added && <button onClick={handleAddToMetamask}>Add to MetaMask</button>
      }
    </div>
  )
}

export default App
