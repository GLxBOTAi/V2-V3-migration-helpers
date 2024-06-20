// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@aave/protocol-v2/contracts/flashloan/base/FlashLoanReceiverBase.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "@aave/protocol-v2/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract FlashLoanReceiver is FlashLoanReceiverBase {

    constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public {
        // Initialization code
    }

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    )
        external
        override
        returns (bool)
    {
        // Implement your logic here

        // Repay the loan
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }

        return true;
    }
}

