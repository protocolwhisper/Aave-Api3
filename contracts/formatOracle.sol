// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IDataFeedApi3} from "./IApi3.sol";

/// @title WETHapioracle
/// @dev This contract interfaces with API3 oracle to get the latest data feed.

contract WETHapioracle {
    IDataFeedApi3 public oracle;
    address public api3oracle;

    //// @notice Contract constructor
    /// @dev Accepts the address of the API3 oracle previously calculated
    /// @param _dataFeedReaderAddress The address of the API3 oracle
    constructor(address _dataFeedReaderAddress) {
        _api3oracle(_dataFeedReaderAddress);
    }

    function _api3oracle(address fallbackOracle) internal {
        oracle = IDataFeedApi3(fallbackOracle);
    }

    /// @notice Gets the latest price feed from the API3 oracle
    /// @return positivePrice The latest price feed as an integer
    function latestAnswer() external view returns (int256) {
        (int224 price, ) = oracle.readDataFeed();
        require(price >= 0, "Negative price is not allowed");

        // Converting int224 to int256
        int256 positivePrice = int256(price);

        return positivePrice;
    }

    function getTokenType() external pure returns (uint256) {
        return 1;
    }

    function decimals() external pure returns (uint8) {
        return 8;
    }
}
