// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@aave/core-v3/contracts/interfaces/IPriceOracleGetter.sol";
import {IDataFeedApi3} from "./IApi3.sol";

contract MyPriceOracle is IPriceOracleGetter {
    IDataFeedApi3 public oracle;
    address public api3oracle;
    address public base_currency;
    uint256 public base_currency_unit;

    // We gave our API3 proxy address
    constructor(address _dataFeedReaderAddress) {
        _api3oracle(_dataFeedReaderAddress);
    }

    function BASE_CURRENCY() external view override returns (address) {
        return base_currency;
        // return
    }

    function BASE_CURRENCY_UNIT() external view override returns (uint256) {
        // return the base currency unit
        return base_currency_unit;
    }

    function _api3oracle(address fallbackOracle) internal {
        oracle = IDataFeedApi3(fallbackOracle);
    }

    function getAssetPrice(address asset) external view returns (uint256) {
        (int224 price, uint256 timestamp) = oracle.readDataFeed();
        require(price >= 0, "Negative price is not allowed");

        // Converting int224 to uint256
        uint256 positivePrice = uint256(int256(price));

        return positivePrice;
    }
}
