pragma solidity ^0.4.24;

import "./AbstractResolver.sol";

contract AbstractAddrResolver is AbstractResolver {
    function addr(bytes32 node) public view returns (address ret);
    function setAddr(bytes32 node, address addrValue) public;

    event AddrChanged(bytes32 node, address addr);
}
