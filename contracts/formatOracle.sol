// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IDataFeedApi3} from "./IApi3.sol";

contract WETHapioracle {
    IDataFeedApi3 public oracle;
    address public api3oracle;

    // We gave our API3 proxy address
    constructor(address _dataFeedReaderAddress) {
        _api3oracle(_dataFeedReaderAddress);
    }

    function _api3oracle(address fallbackOracle) internal {
        oracle = IDataFeedApi3(fallbackOracle);
    }

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
