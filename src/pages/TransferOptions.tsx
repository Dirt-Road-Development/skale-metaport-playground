import "./TransferOptions.css";
import { Metaport } from "@skalenetwork/metaport";
import { Dispatch, SetStateAction } from "react";
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

export default function TransferOptions({ environment, metaport, token, transferring, transfers }: Props) {

    return (
        <div className="buttons">
            {transferring[0] 
                ? <h2>Transfer In Progress...</h2>
                : (<>
                    {transfers.map((transfer: TransferConfig, index: number) => {
                        return <Transfer
                                    setIsTransferring={transferring[1]}
                                    metaport={metaport}
                                    key={index}
                                    transferConfig={getParams(environment, transfer.from, transfer.to, token)}
                                    chainOrder={transfer.chainOrder}

                                />
                    })}
                </>)
                }
        </div>
    );
}