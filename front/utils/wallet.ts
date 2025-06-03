import { ethers } from 'ethers';
import {useWeb3Store} from "../src/stores/web3.ts";

export function connectWallet(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof (window as any).ethereum !== "undefined") {
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts:string[]) => {
          if (accounts.length > 0) {
            resolve(accounts[0]);
          } else {
            reject(new Error("No accounts found"));
          }
        })
        .catch((error:any) => {
          reject(error);
        });
    } else {
      reject(new Error("MetaMask is not installed"));
    }
  });
}

export async function switchChain(chainId: string) {
  try {
    if (typeof (window as any).ethereum === "undefined") {
      return;
    }
    const wallet = (window as any).ethereum;
    await wallet.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    console.error("Failed to switch chain:", error);

    if (
      (error as any).code &&
      (error as any).code + "" === "4902"
    ) {
      (window as any).alert("Please add the chain to your wallet");
    } else {
      console.log("Chain switch failed, trying to add the chain");
    }
  }
}

export async function callContract(
  abi: any[],
  methodName: string,
  params: any[] = [],
  isWriteOperation: boolean = false,
  requiresSigner: boolean = false // New parameter
): Promise<any> {
  try {
    if (typeof (window as any).ethereum === "undefined") {
      throw new Error("MetaMask is not installed");
    }
    const store = useWeb3Store();
    const contractAddress = store.contractAddress;

    // Create provider
    const provider = new ethers.BrowserProvider((window as any).ethereum);

    if (isWriteOperation || requiresSigner) {
      // For write operations or methods that require signer
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      if (isWriteOperation) {
        // Execute transaction
        const tx = await contract[methodName](...params);
        console.log('Transaction hash:', tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);

        return receipt;
      } else {
        // Read call with signer
        const result = await contract[methodName](...params);
        return result;
      }
    } else {
      // For simple read operations, provider is enough
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const result = await contract[methodName](...params);
      return result;
    }
  } catch (error) {
    console.error('Contract call failed:', error);
    throw error;
  }
}

// Specialized method for read operations
export async function readContract(
  abi: any[],
  methodName: string,
  params: any[] = [],
  requiresSigner: boolean = false // New optional parameter
): Promise<any> {
  return callContract(abi, methodName, params, false, requiresSigner);
}

// Specialized method for write operations
export async function writeContract(
  abi: any[],
  methodName: string,
  params: any[] = []
): Promise<any> {
  return callContract(abi, methodName, params, true, false);
}

export async function disconnectWallet(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof (window as any).ethereum !== "undefined") {
      (window as any).ethereum
        .request({ method: "wallet_revokePermissions", params: [{ eth_accounts: {} }] })
        .then(() => {
          resolve();
        })
        .catch((error:any) => {
          reject(error);
        });
    } else {
      reject(new Error("MetaMask is not installed"));
    }
  });
}
