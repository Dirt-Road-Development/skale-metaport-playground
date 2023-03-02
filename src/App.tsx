import './App.css';
import { interfaces, dataclasses, Metaport } from '@skalenetwork/metaport';
import { handleEvent} from './events';
import { useEffect, useState } from 'react';
import TransferInProgress from './TransferInProgress';
import Transfer from './Transfer';
import { getParams } from './staging_config';
import buildMetaport from './build_metaport';

function App() {

    const [isTransferring, setIsTransferring] = useState<boolean>(false);
    const [environment, setEnvironment] = useState<"staging" | "mainnet">("staging");
    const [metaport, setMetaport] = useState<Metaport>(buildMetaport());

    useEffect(() => {
        if (!isTransferring) {
            setMetaport(buildMetaport(environment === "staging"));
        }
    }, [environment])

    return (
        <div className="App">
            <nav>
                <h1>Metaport Staging Playground</h1>
            </nav>
            {isTransferring ? <TransferInProgress /> : (
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
            }
        </div>
    );
}

export default App;
