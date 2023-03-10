import './App.css';
import {Metaport } from '@skalenetwork/metaport';
import { useEffect, useState } from 'react';
import buildMetaport from './build_metaport';
import TokenOptions from './pages/TokenOptions';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TransferOptions from './pages/TransferOptions';
import { getTransfers } from './config';
import NFTOptions from './pages/NFTOptions';

function App() {

    const [isTransferring, setIsTransferring] = useState<boolean>(false);
    const [environment, setEnvironment] = useState<"staging" | "mainnet">(window.location.pathname.includes("staging") ? "staging": "mainnet");
    const [token, setToken] = useState<string>("");
    const [nft, setNFT] = useState<"erc721" | "erc1155">("erc721");
    const [metaport, setMetaport] = useState<Metaport>(buildMetaport(environment === "staging"));

    return (
        <div className="App">
            <Navigation {...{environment, setEnvironment}} />
            <div className="activePage">
                {token.length === 0 && <TokenOptions {...{setToken, setNFT}} />}
                {token.length > 0 && (
                    <>
                    {["SKL", "ETH", "USDC"].includes(token) ? <TransferOptions 
                        {...{environment, metaport, token}}
                        transferring={[isTransferring, setIsTransferring]}
                        transfers={getTransfers(environment, token)}
                    /> : <NFTOptions
                            {...{environment, metaport, token}}
                            transferring={[isTransferring, setIsTransferring]}
                            transfers={getTransfers(environment, token)}
                            // type={nft}
                        />}
                    </>
                )}
            </div>
            <Footer />
            {/* {isTransferring ? <TransferInProgress /> : (
                <div className='buttons'>
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "ethereum", "calypso")}
                        chainOrder={["Ethereum", "Europa", "Calypso"]}
                    />
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "ethereum", "europa")}
                        chainOrder={["Ethereum", "Europa"]}
                    />
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "europa", "calypso")}
                        chainOrder={["Europa", "Calypso"]}
                    />
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "ethereum", "calypso", "SKL")}
                        chainOrder={["Ethereum", "Europa", "Calypso"]}
                    />
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "ethereum", "europa", "SKL")}
                        chainOrder={["Ethereum", "Europa"]}
                    />
                    <Transfer
                        {...{metaport, setIsTransferring}}
                        transferConfig={getParams(environment, "europa", "calypso", "SKL")}
                        chainOrder={["Europa", "Calypso"]}
                    />
                </div>)
            } */}
        </div>
    );
}

export default App;
