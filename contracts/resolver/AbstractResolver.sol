pragma solidity ^0.4.24;

contract AbstractResolver {
    function supportsInterface(bytes4 interfaceID) public pure returns (bool);
}
