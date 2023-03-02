import { dataclasses } from "@skalenetwork/metaport";
import { TransferParams } from "@skalenetwork/metaport/build/core/interfaces";

/**
 * ETHEREUM SETUP
 */
const ETH_ETHEREUM_EUROPA: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-legal-crazy-castor"
    ],
    tokenType: dataclasses.TokenType.eth,
    tokenKeyname: "eth"
}

const ETH_EUROPA_CALYPSO: TransferParams = {
    amount: "0.025",
    chains: [
        "staging-legal-crazy-castor",
        "staging-utter-unripe-menkar",
    ],
    tokenKeyname:`_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24`,
    tokenType: dataclasses.TokenType.erc20,
}

const ETH_ETHEREUM_EUROPA_CALYPSO: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-utter-unripe-menkar"
    ],
    tokenType: dataclasses.TokenType.eth,
    tokenKeyname: "eth",
    route: {
        hub: "staging-legal-crazy-castor",
        tokenKeyname:`_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24`,
        tokenType: dataclasses.TokenType.erc20
    }
};

/**
 * ETHEREUM SETUP
 */
const SKL_ETHEREUM_EUROPA: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-legal-crazy-castor"
    ],
    tokenType: dataclasses.TokenType.erc20,
    tokenKeyname: "_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11"
}

const SKL_EUROPA_CALYPSO: TransferParams = {
    amount: "0.025",
    chains: [
        "staging-legal-crazy-castor",
        "staging-utter-unripe-menkar",
    ],
    tokenKeyname:`_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6`,
    tokenType: dataclasses.TokenType.erc20,
}

const SKL_ETHEREUM_EUROPA_CALYPSO: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-utter-unripe-menkar"
    ],
    tokenType: dataclasses.TokenType.erc20,
    tokenKeyname: "_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11",
    route: {
        hub: "staging-legal-crazy-castor",
        tokenKeyname:`_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6`,
        tokenType: dataclasses.TokenType.erc20
    }
};

export const getParams = (env: "staging" | "mainnet", from: string, to: string, token?: "SKL") => {
    if (env === "staging") {
        if (token === "SKL") {
            if (from === "ethereum" && to === "calypso") return SKL_ETHEREUM_EUROPA_CALYPSO;
            if (from === "europa" && to === "calypso") return SKL_EUROPA_CALYPSO;
            return SKL_ETHEREUM_EUROPA; 
        } else {
            if (from === "ethereum" && to === "calypso") return ETH_ETHEREUM_EUROPA_CALYPSO;
            if (from === "europa" && to === "calypso") return ETH_EUROPA_CALYPSO;
            return ETH_ETHEREUM_EUROPA;
        }
        
    } else {
        throw new Error("Mainnet Not Setup");
    }
}