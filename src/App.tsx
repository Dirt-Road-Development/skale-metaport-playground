import './App.css';
import { interfaces, dataclasses, Metaport } from '@skalenetwork/metaport';
import { handleEvent} from './events';

function App() {

    const metaport = new Metaport({
        openOnLoad: true, // Open Metaport on load (optional, default = false)
        openButton: false, // Show open/close action button (optional, default = true)
        autoLookup: false, // Automatic token lookup for M2S tokens (default = true)
        skaleNetwork: 'staging', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)  
        chains: [
            'mainnet', // List of SKALE Chains that will be available in the Metaport UI (default = [])
            'fancy-rasalhague',
            'actual-secret-cebalrai'
        ],
        chainsMetadata: { // Chain name aliases that will be displayed in the UI (optional, defualt = {})
            
            'fancy-rasalhague': {
                alias: 'Europa SKALE Chain', // optional
                minSfuelWei: '27000000000000', // optional
                faucetUrl: 'https://sfuel.dirtroad.dev', // optional
            },
            'actual-secret-cebalrai': {
                alias: 'Calypso SKALE Chain',
                minSfuelWei: '27000000000000', // optional
                faucetUrl: 'https://sfuel.dirtroad.dev' // optional
            }
        },
        tokens: {
            'mainnet': {
                'eth': {
                    'chains': [
                        'fancy-rasalhague'
                    ]
                }
            },
            'fancy-rasalhague': {
                'erc20': { 
                    'ETHC': { // wrapper token
                        'address': '0x201f24e897B0711dCBb21073a6A75F570a73fde4', // wrapper token address
                        'name': 'ETHC', // wrapper token display name
                        'symbol': 'ETHC',
                        'wraps': { // token that needs to be wrapped
                            'address': '0xD2Aaa00700000000000000000000000000000000', // unwrapped token address
                            'symbol': 'wETHC', // unwrapped token symbol
                            'iconUrl': '' // optional, icon URL for the origin token
                        }
                    }
                }
            }
        },
        theme: { // custom widget theme (default = dark SKALE theme)
            primary: '#00d4ff', // primary accent color for action buttons
            background: '#0a2540', // background color
            mode: 'dark' // theme type - dark or light
        }
    });
    
    
    const runProcess = async() => {
        // Transfer from ETH -> Europa 
        const l1ToEuropaParams: interfaces.TransferParams = {
            amount: "0.00005",
            chains: [
                "mainnet", 
                "fancy-rasalhague"
            ],
            tokenType: dataclasses.TokenType.eth,
            lockValue: false,
            tokenKeyname: "eth"
        };
        
        metaport.transfer(l1ToEuropaParams);
        
        
        const l1ToEuropaResult = await handleEvent("transfer");
        console.log("Result: ", l1ToEuropaResult);
        
        // Transfer from Europa -> Calypso
        const wrapAndSendParams: interfaces.TransferParams = {
            amount: "0.00005",
            chains: [
                "fancy-rasalhague",
                "actual-secret-cebalrai"
            ],
            tokenType:  dataclasses.TokenType.erc20,
            lockValue: true,
            tokenKeyname: `_ETHC_0x201f24e897B0711dCBb21073a6A75F570a73fde4`
        };
        
        metaport.transfer(wrapAndSendParams);
        metaport.transfer(wrapAndSendParams);
        const l2TransferResult = await handleEvent("transfer");
        console.log("Result2: ", l2TransferResult);
        
        
    }
    
  return (
    <div className="App">
        <h1>Metaport Demo CRA</h1>
        <button onClick={async(e) => {
            await runProcess();
        }}>Button</button>
    </div>
  );
}

export default App;
