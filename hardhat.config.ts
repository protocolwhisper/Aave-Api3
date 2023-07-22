import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {load } from "ts-dotenv";
import { string } from "hardhat/internal/core/params/argumentTypes";

const env = load ({
  API_KEY : String, 
})
const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: env.API_KEY,
      }
    }
  }
};



export default config;
