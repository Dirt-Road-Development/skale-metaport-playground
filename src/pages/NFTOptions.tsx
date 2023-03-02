import "./TransferOptions.css";
import { Metaport } from "@skalenetwork/metaport";
import { Dispatch, SetStateAction, useState } from "react";
import Transfer from "../components/Transfer";
import { getParams } from "../config";

type TransferConfig = {
    from: string;
    to: string;
    chainOrder: string[];
}

type Props = {
    environment: "staging" | "mainnet";
    token?: string;
    transferring: [boolean, Dispatch<SetStateAction<boolean>>];
    transfers: TransferConfig[];
    metaport: Metaport;
}

export default function NFTOptions({ environment, metaport, token, transferring, transfers }: Props) {

    const [tokenId, setTokenId] = useState<string>("9");

    return (
        <div className="buttons">
            {transferring[0] 
                ? <h2>Transfer In Progress...</h2>
                : (<>
                    <input onChange={(e) => {
                        e.preventDefault();
                        setTokenId(e.target.value);
                    }} type="number" name="tokenId" />
                    {transfers.map((transfer: TransferConfig, index: number) => {
                        return <Transfer
                                    setIsTransferring={transferring[1]}
                                    metaport={metaport}
                                    key={index}
                                    transferConfig={{...getParams(environment, transfer.from, transfer.to, token), tokenId: Number(tokenId)}}
                                    chainOrder={transfer.chainOrder}

                                />
                    })}
                </>)
                }
        </div>
    );
}