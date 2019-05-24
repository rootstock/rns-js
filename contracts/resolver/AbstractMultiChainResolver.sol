pragma solidity ^0.4.24;

import "./AbstractAddrResolver.sol";

contract AbstractMultiChainResolver is AbstractAddrResolver {
    function chainAddr(bytes32 node, bytes4 chain) public view returns (string);
    function setChainAddr(bytes32 node, bytes4 chain, string addrValue) public;

    event ChainAddrChanged(bytes32 node, bytes4 chain, string addr);
}
