// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        uint id;
        string name;
        string origin;
        address owner;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductAdded(uint id, string name, string origin, address owner);

    function addProduct(string memory _name, string memory _origin) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _origin, msg.sender);
        emit ProductAdded(productCount, _name, _origin, msg.sender);
    }

    function getProduct(uint _productId) public view returns (string memory, string memory, address) {
        Product memory product = products[_productId];
        return (product.name, product.origin, product.owner);
    }
}
