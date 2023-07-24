// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/// @title IDataFeedApi3
/// @dev This is an interface to interact with the API3 oracle
interface IDataFeedApi3 {
    /// @notice This function returns the latest data feed from the API3 oracle.
    /// @return value The latest value from the data feed
    /// @return timestamp The timestamp of when the data feed was last updated
    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp);
}
