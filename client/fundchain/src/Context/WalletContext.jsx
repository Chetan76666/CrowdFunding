
import React, { useEffect, useState } from "react";
import { ethers } from "ethers"

export const WalletContext = React.createContext();

const { ethereum } = window;

const getWallet = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    console.log(provider);
    console.log(signer);
}


export const WalletProvider = ({ children }) => {

    const [connectedAccount, setconnectedAccount] = useState("");

    const CheckifWalletisConnected = async () => {

        try {
            if (!ethereum) alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setconnectedAccount(accounts[0]);
            }
            else {
                console.log("No accounts Found")
            }
            console.log(accounts)
        }
        catch (error) {
            console.error(error);
        }
    }

    const ConnectWallet = async () => {
        try {
            if (!ethereum) alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setconnectedAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }

    }

    useEffect(() => {
        CheckifWalletisConnected();
    }, [])

    return (
        <WalletContext.Provider value={{ ConnectWallet, connectedAccount }}>
            {children}
        </WalletContext.Provider>
    )
}
