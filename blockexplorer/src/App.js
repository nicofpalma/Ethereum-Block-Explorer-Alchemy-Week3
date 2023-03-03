import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState();
  const [searchedBlockNumber, setSearchedBlockNumber] = useState(0);

  async function getBlockWithTransactions(blockNumber) {
    setBlockNumber(blockNumber);
    setBlockTransactions(await alchemy.core.getBlockWithTransactions(parseInt(blockNumber)));
  }

  function handleSearch() {
    getBlockWithTransactions(searchedBlockNumber);
  }

  function BlockSearch() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChange = (event) => {
      setSearchValue(event.target.value);
    }

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      event.preventDefault();
      if (!isNaN(searchValue)) {
        getBlockWithTransactions(searchValue);
      }
    }

    return (
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search Block by number:
          <input type="text" value={searchValue} onChange={handleSearchInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }

  return (
    <div className="App">
      <div>
        <BlockSearch />
      </div>
      <div>Block Number: <span>{blockNumber}</span></div>
      <div>Transactions: <pre>{JSON.stringify(blockTransactions, null, 2)}</pre></div>
    </div>
  );
}



export default App;

