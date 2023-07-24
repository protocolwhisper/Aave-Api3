// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@api3/contracts/v0.8/interfaces/IProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title DataFeedReaderExample
/// @dev This contract interacts with an API3 oracle proxy to read data feeds.
contract DataFeedReaderExample is Ownable {
    address public proxyAddress;

    /// @notice Updates the address of the API3 oracle proxy.
    /// @dev Can only be called by the owner of the contract.
    /// @param _proxyAddress The new address of the API3 oracle proxy.
    function setProxyAddress(address _proxyAddress) public onlyOwner {
        proxyAddress = _proxyAddress;
    }

    /// @notice Reads the latest data feed from the API3 oracle proxy.
    /// @return value The latest value from the data feed.
    /// @return timestamp The timestamp of when the data feed was last updated.
    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IProxy(proxyAddress).read();
    }
}
