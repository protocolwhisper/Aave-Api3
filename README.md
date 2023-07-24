# 🚀 Aave-Api3 

This project serves as a proof of concept for the integration of the API3 oracle into the Aave protocol. Our goal is to demonstrate that it's fully compatible and functional within the Aave protocol. To achieve this, we first need to understand the workflow.

If you're new to API3, we recommend starting with this fantastic [API3 tutorial](https://www.youtube.com/watch?v=HbbRv_3NJ9Q&ab_channel=API3) for a comprehensive quick start guide.

## 🌐 Workflow

1. Gain permission for the ACL (Access Control List) Manager contract.
2. Verify the permission in the provider's address.
3. Begin querying the asset that we intend to change the source of.
4. In order to make API3 oracle compatible with the Aave protocol, it's essential to wrap the API3 oracle in a smart contract.

## Setup

Before running the project, you need to set up your environment run : 

`yarn install`

## 🧪 Testing 

To understand the implementation of the protocol, run the following command:

`yarn hardhat test`

## 🏗️ Proxy Address 

If you want to compute a proxy address that is compatible with the API3 smart contract for a specific chain ID and data feed, run:

`yarn hardhat run scripts/Computeproxy.ts`

## 🎉 Conclusion

The Aave-Api3 project serves as an exciting proof of concept demonstrating the synergy between decentralized oracles and financial protocols. By successfully integrating the API3 oracle into the Aave protocol, we showcase the potential of decentralized finance and its capabilities for adaptability and interoperability.

In the evolving landscape of DeFi, the Aave-Api3 project stands as an innovative testament to what can be achieved when decentralized oracle networks and lending protocols converge.

If you find this project helpful, feel free to star it ⭐ and share it with your friends. Don't hesitate to raise issues if you find any problems or have any suggestions. We're always open for improvement!
