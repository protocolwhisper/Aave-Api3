// SPDX-License-Identifier : MIT

pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Flash Loan Example
/// @dev This contract demonstrates how to initiate a flash loan using Aave's flash loan interface.
contract FlashLoanExample is FlashLoanSimpleReceiverBase {
    using SafeMath for uint;
    event Log(address asset, uint val);

    /// @notice Contract constructor
    /// @param provider The address of the Aave Lending Pool Addresses Provider contract
    constructor(
        IPoolAddressesProvider provider
    ) FlashLoanSimpleReceiverBase(provider) {}

    /// @notice Initiates a flash loan
    /// @param asset The address of the token to be flash loaned
    /// @param amount The amount of tokens to be flash loaned
    function createFlashLoan(address asset, uint amount) external {
        address reciever = address(this); // Calling the same addy of the SC
        bytes memory params = ""; //We can use this to pass arbitrary data to executeOperation
        uint16 referralCode = 0;

        POOL.flashLoanSimple(reciever, asset, amount, params, referralCode);
    }

    /// @notice Executes operation for the flash loan
    /// @dev This function is called by the Aave protocol once the flash loan funds have been transferred.
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        // Do things like arbitrage here
        //abi.decode(params) to decode params
        uint amountOwing = amount.add(premium);
        IERC20(asset).approve(address(POOL), amountOwing);
        emit Log(asset, amountOwing);
        return true;
    }
}
