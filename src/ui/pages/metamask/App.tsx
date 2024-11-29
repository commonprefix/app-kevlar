import './App.css'

function App() {
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
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="App" style={{ height: '100%', overflowY: 'auto', padding: '0'}}>
      <button onClick={handleAddToMetamask}>Add to MetaMask</button>
    </div>
  )
}

export default App
