// SPDX-License-Identifier: MIT

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ICoreEvidence  {
    event Delegated(address indexed owner, address indexed delegatee);
    event EvidenceAdded(address indexed user, address indexed delegatee, uint timestamp, bytes32 evidence);

    function submitEvidence(address user, uint timestamp, bytes32 evidence) external;
    function evidenceExists(address user) external view returns(bool);
    function getEvidence(address user)  external view returns(address, address, uint, bytes32);

}