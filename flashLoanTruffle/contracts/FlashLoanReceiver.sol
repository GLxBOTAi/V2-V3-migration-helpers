// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/protocol-v2/contracts/flashloan/base/FlashLoanReceiverBase.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanReceiver is FlashLoanReceiverBase {
    constructor(address _addressProvider)
        FlashLoanReceiverBase(ILendingPoolAddressesProvider(_addressProvider))
    {}

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // Logic to handle the flash loan
        for (uint i = 0; i < assets.length; i++) {
            uint amountOwing = amounts[i] + premiums[i];
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }
        return true;
    }

    function requestFlashLoan(address asset, uint256 amount) public {
        address receiverAddress = address(this);
        address[] memory assets = new address[](1);
        assets[0] = asset;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0; // No debt mode

        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            receiverAddress,
            '',
            0
        );
    }
}

