// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface IDataFeedApi3 {
    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp);
}
