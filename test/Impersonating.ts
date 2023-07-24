import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect}   from "chai";
import { ContractFactory } from "ethers";
import { ethers }   from "hardhat";
import { PoolAddressesProvider, AaveOracle} from "../typechain-types";
import hre from "hardhat";



describe("Aave-Api3 - Unit tests", function() {
    let Pool_providerFactory: ContractFactory;
    let pool_contract: PoolAddressesProvider;
    let accounts: SignerWithAddress[];
    let impersonate_signer: SignerWithAddress;
    let aave_oracle : AaveOracle;
    let WETH_ADDRESS : string;

  
    before(async function() {
        WETH_ADDRESS = "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92";
        accounts = await ethers.getSigners()
        let pool_provider_owner = "0xfA0e305E0f46AB04f00ae6b5f4560d61a2183E00";
        await hre.network.provider.request({
            method : "hardhat_impersonateAccount",
            params: [pool_provider_owner],
        });
      
        impersonate_signer = await ethers.getSigner(pool_provider_owner);
        // Pool Addresses Provider can be found in https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
        pool_contract = await ethers.getContractAt("PoolAddressesProvider", "0x0496275d34753A48320CA58103d5220d394FF77F", impersonate_signer);
        // Aave Oracle contract
        aave_oracle  = await ethers.getContractAt("AaveOracle" , "0x132C06E86CcCf93Afef7B33f0FF3e2E97EECf8f6", impersonate_signer);
       

        
    });

    describe("Test control over contract", function() {
        it("Owner of pool provider must be local signer", async function() {
            let owner = await pool_contract.owner();
            expect(owner).to.be.equal(impersonate_signer.address, "Owner must be local signer");
        });

        it("Check Admin role", async function name() {
            let admin_role = await pool_contract.getACLAdmin()
            expect(admin_role).to.be.equal(impersonate_signer.address)
            
        })
    });


    describe("Change chainlink orale for API3 Oracle", function(){
        it("Update the WETH asset to my custom api3 Oracle" , async function() {
            let new_oracle = await ethers.getContractFactory("WETHapioracle")

            // Here we wrap our contract in a way to make it compatible with aave int224 -> int256
            let sc_oracle = new_oracle.deploy("0x81787D0680b3d4dB1dcb2Cb24D3aE6CCb9c9eBCa") // Our API3sc the address state here will be a type from the sc API3.sol
           
            
            ;(await sc_oracle).deployed();
    
            let old_source =  await aave_oracle.getSourceOfAsset(WETH_ADDRESS)
            let update_tx =  await aave_oracle.setAssetSources([WETH_ADDRESS] , [(await sc_oracle).address])
            let new_source = await aave_oracle.getSourceOfAsset(WETH_ADDRESS)
            expect(new_source).to.not.equal(old_source)
        
        })
        it("Query WETH price with new oracle" , async function () {
            let query = await aave_oracle.getAssetPrice(WETH_ADDRESS)
            let low_limit = ethers.BigNumber.from(1200);
            let uper_limit = ethers.BigNumber.from(1200);
            // range [1200 , 2200] this is assuming the fluctations of ether price at 2023-07-22
            expect(query.gte(low_limit));
            expect(query.lte(uper_limit));
        })

    });

    describe("Deploy a Flash Loan", function (){
        it("Should take a flash loan and be able to return it", async function (){
            const flashloanexample = await ethers.getContractFactory("FlashLoanExample");
            let WETH_WHALE = "0x5c4220e10d0D835e9eDf04061379dED26E845bA8"
            await hre.network.provider.request({
                method : "hardhat_impersonateAccount",
                params: [WETH_WHALE],
            });
          
            let weth_whale = await ethers.getSigner(WETH_WHALE);
            // This is the address of the PoolAddressProvider that can be found in https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
            const _flashloanexample = await flashloanexample.connect(weth_whale).deploy(pool_contract.address);
            await _flashloanexample.deployed();
            // Fund our contract
            const token = await ethers.getContractAt("IERC20", WETH_ADDRESS);
            await token
            .connect(weth_whale)
            .transfer(_flashloanexample.address, 1000); // Sending 1000 to the contract
            const tx = await _flashloanexample.createFlashLoan(WETH_ADDRESS, 10000); // Asking for 10x more
            await tx.wait();
            const remainingBalance = await token.balanceOf(_flashloanexample.address); // Balance of our contract
            expect(remainingBalance.lt(1000)).to.be.true; // This happens cause we need to give it back with a premium
        })
    })

});
