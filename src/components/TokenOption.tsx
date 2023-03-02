import "./TokenOption.css";
import { Dispatch, SetStateAction } from "react";
import { TokenInfo } from "../types";

type Props = {
    token: TokenInfo;
    setToken: Dispatch<SetStateAction<string>>;
    setNFT?: Dispatch<SetStateAction<"erc721" | "erc1155">>;
}

export default function TokenOption(props: Props) {
    return (
        <div onClick={(e) => {
            e.preventDefault();
            props.setToken(props.token.symbol);
            if (props.token.nft && props.setNFT) props.setNFT(props.token.nft);
        }} className="tokenOption">
            <div>
                <img src={props.token.image} alt="Something here..." />
            </div>
            <div>
                <p>{props.token.symbol} {props.token.nft?.toUpperCase()}</p>
            </div>
            
        </div>
    );
}