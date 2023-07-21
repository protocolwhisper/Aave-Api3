import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, should }   from "chai";
import { ContractFactory } from "ethers";
import { ethers }   from "hardhat";
import { PoolAddressesProvider } from "../typechain-types";
import { timeStamp } from "console";
import hre from "hardhat";
import Address from "@typechain/ethers-v5"


describe("Aave-Api3 - Unit tests" , function(){
    let Pool_providerFactory: ContractFactory;
    let pool_contract : PoolAddressesProvider;
    let accounts:  SignerWithAddress[];
    let impersonate_signer : SignerWithAddress;

    before(async function() {
        let pool_provider_owner = "0xfA0e305E0f46AB04f00ae6b5f4560d61a2183E00";
        impersonate_signer = await ethers.getImpersonatedSigner(pool_provider_owner)
        Pool_providerFactory = await ethers.getContractFactory("PoolAddressesProvider");
    });

    beforeEach(async function(){
        pool_contract = await Pool_providerFactory.deploy("Ethereum Aave Marke" , impersonate_signer.address) as PoolAddressesProvider;
        
   });

    describe("Test control over contract" , function() {
        it("Owner of pool provider must be local signer" , async function() {
            let old_owner = "0xfA0e305E0f46AB04f00ae6b5f4560d61a2183E00";
            let owner = pool_contract.owner();

            expect(owner).to.not.equal(old_owner , "Owner must be local signer")
            
            

        });

    });
   

   
})