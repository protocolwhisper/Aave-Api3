import * as api3Contracts from '@api3/contracts';
async function main() {
  // Calling the computeDataFeedProxyAddress function from the imported api3Contracts
  // Passes in a specific chain id, data feed, and metadata
  // This will compute the data feed proxy address for a specific API3 market, given the chain id and data feed
  const dataFeedProxyAddress = await api3Contracts.computeDataFeedProxyAddress(
    11155111, 
    '0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d', 
    '0x'
  );

  console.log(dataFeedProxyAddress);
}

// Call your function
main().catch(console.error);
