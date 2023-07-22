import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, should }   from "chai";
import { ContractFactory } from "ethers";
import { ethers }   from "hardhat";
import { PoolAddressesProvider } from "../typechain-types";
import { timeStamp } from "console";
import hre from "hardhat";
import Address from "@typechain/ethers-v5"


describe("Aave-Api3 - Unit tests", function() {
    let Pool_providerFactory: ContractFactory;
    let pool_contract: PoolAddressesProvider;
    let accounts: SignerWithAddress[];
    let impersonate_signer: SignerWithAddress;
    let old_owner: string;
  
    before(async function() {
        let pool_provider_owner = "0xfA0e305E0f46AB04f00ae6b5f4560d61a2183E00";
        impersonate_signer = await ethers.getSigner(pool_provider_owner);
        pool_contract = await ethers.getContractAt("PoolAddressesProvider", "0x0496275d34753A48320CA58103d5220d394FF77F", impersonate_signer);
    });

    describe("Test control over contract", function() {
        it("Owner of pool provider must be local signer", async function() {
            let owner = await pool_contract.owner();
            expect(owner).to.be.equal(impersonate_signer.address, "Owner must be local signer");
        });
    });
});
