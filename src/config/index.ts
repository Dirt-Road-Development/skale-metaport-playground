import { getStagingParms, getStagingTransfers } from "./staging";

export const getParams = (env: "staging" | "mainnet", from: string, to: string, token?: string) => {
    if (env === "staging") return getStagingParms(from, to, token);

    throw new Error("Mainnet Not Yet SUpported");
}

export const getTransfers = (env: "staging" | "mainnet", token?: string) => {
    if (env === "staging") return getStagingTransfers(token);

    throw new Error("Mainnet Not Yet Supported");
}