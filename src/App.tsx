import './App.css';
import { interfaces, dataclasses, Metaport } from '@skalenetwork/metaport';
import { handleEvent} from './events';

function App() {

    const metaport = new Metaport({
        openOnLoad: true, // Open Metaport on load (optional, default = false)
        openButton: false, // Show open/close action button (optional, default = true)
        autoLookup: false, // Automatic token lookup for M2S tokens (default = true)
        skaleNetwork: 'staging3', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)  
        chains: [
            'mainnet', // List of SKALE Chains that will be available in the Metaport UI (default = [])
            'staging-legal-crazy-castor',
            'staging-utter-unripe-menkar'
        ],
        chainsMetadata: { // Chain name aliases that will be displayed in the UI (optional, defualt = {})
            
            'staging-legal-crazy-castor': {
                alias: 'Europa SKALE Chain', // optional
                minSfuelWei: '27000000000000', // optional
                faucetUrl: 'https://sfuel.dirtroad.dev', // optional
            },
            'staging-utter-unripe-menkar': {
                alias: 'Calypso SKALE Chain',
                minSfuelWei: '27000000000000', // optional
                faucetUrl: 'https://sfuel.dirtroad.dev' // optional
            }
        },
        tokens: {
            'mainnet': {
                'eth': {
                    'chains': [
                        'staging-legal-crazy-castor'
                    ]
                }
            },
            'staging-legal-crazy-castor': {
                'erc20': { 
                    'wETH': { // wrapper token
                        'address': '0xa270484784f043e159f74C03B691F80B6F6e3c24', // wrapper token address
                        'name': 'ETH', // wrapper token display name
                        'symbol': 'ETH',
                        'wraps': { // token that needs to be wrapped
                            'address': '0xD2Aaa00700000000000000000000000000000000', // unwrapped token address
                            'symbol': 'ETH', // unwrapped token symbol
                        }
                    },
                    "wSKL": {
                        "name": "SKL",
                        "symbol": "SKL",
                        "address": "0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6",
                        "iconUrl": 'https://ruby.exchange/images/tokens/skl-square.jpg',
                        'wraps': { // token that needs to be wrapped
                            'address': '0xbA1E9BA7CDd4815Da6a51586bE56e8643d1bEAb6', // unwrapped token address
                            'symbol': 'SKL' // unwrapped token symbol
                          }
                    },
                    "wUSDC": {
                        "name": "USDC",
                        "symbol": "USDC",
                        "address": "0x4f250cCE5b8B39caA96D1144b9A32E1c6a9f97b0",
                        "iconUrl": 'https://ruby.exchange/images/tokens/usdc-square.jpg',
                        'wraps': { // token that needs to be wrapped
                            'address': '0x5d42495D417fcd9ECf42F3EA8a55FcEf44eD9B33', // unwrapped token address
                            'symbol': 'USDC' // unwrapped token symbol
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
                "staging-legal-crazy-castor"
            ],
            tokenType: dataclasses.TokenType.eth,
            lockValue: false,
            tokenKeyname: "eth"
        };
        
        
        metaport.transfer({
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
        })
        
        
        const l1ToEuropaResult = await handleEvent("transfer");
        // console.log("Result: ", l1ToEuropaResult);
        
        // Transfer from Europa -> Calypso
        // const wrapAndSendParams: interfaces.TransferParams = {
        //     amount: "0.00005",
        //     chains: [
        //         "fancy-rasalhague",
        //         "actual-secret-cebalrai"
        //     ],
        //     tokenType:  dataclasses.TokenType.erc20,
        //     lockValue: true,
            // tokenKeyname: `_ETHC_0x201f24e897B0711dCBb21073a6A75F570a73fde4`
        // };
        
        // metaport.transfer(wrapAndSendParams);
        // metaport.transfer(wrapAndSendParams);
        // const l2TransferResult = await handleEvent("transfer");
        // console.log("Result2: ", l2TransferResult);
        
        
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
