import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
const contractABI = [
  // Replace with your contract ABI (copy from Remix or Polygonscan)
];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Function to add a new product
export const addProduct = async (name, origin) => {
  try {
    const transaction = await contract.addProduct(name, origin);
    await transaction.wait();
    alert("Product added successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Function to get product details
export const getProduct = async (productId) => {
  try {
    const product = await contract.getProduct(productId);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
