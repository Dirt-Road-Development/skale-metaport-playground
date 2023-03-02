import { Dispatch, SetStateAction } from "react";
import TokenOption from "../components/TokenOption";

type Props = {
    setToken: Dispatch<SetStateAction<string>>;
    setNFT: Dispatch<SetStateAction<"erc721" | "erc1155">>;
}

export default function TokenOptions({ setNFT, setToken } : Props) {
    return (
        <>
            <h2>Select Token</h2>
                <TokenOption token={{image: "https://ruby.exchange/images/tokens/eth-square.jpg", symbol: "ETH"   }} {...{setToken}} />
                <TokenOption token={{image: "https://ruby.exchange/images/tokens/skl-square.jpg", symbol: "SKL"   }} {...{setToken}} />
                <TokenOption token={{image: "https://ruby.exchange/images/tokens/usdc-square.jpg", symbol: "USDC" }} {...{setToken}} />
                <TokenOption token={{image: "https://tank-dev-bridge-nft.fiberbox.net/tank_icon.png", symbol: "TANK", nft: "erc721" }} {...{setToken, setNFT}} />
            </>
    );
}