import { Dispatch, SetStateAction } from "react";

type Props = {
    environment: "staging" | "mainnet";
    setEnvironment: Dispatch<SetStateAction<"staging" | "mainnet">>;
}

export default function Navigation(props: Props) {

    const {
        environment,
        setEnvironment
    } = props;

    return (
        <nav>
            <h1>Metaport Playground</h1>
            <button onClick={(e) => {
                e.preventDefault();
                w
            }}className="network-toggle">
                {environment === "staging"
                    ? "Toggle to Mainnet" 
                    : "Toggle to Staging"
            }
            </button>
        </nav>
    )
}