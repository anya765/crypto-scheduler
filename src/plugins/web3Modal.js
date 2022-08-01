import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
// import { ChainId } from '@sushiswap/sdk'
// import Torus from '@toruslabs/torus-embed'
// import Authereum from 'authereum'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default function (
  { $config: { networkData, DEPLOYED_NET_ENV, INFURA_ID } },
  inject
) {
  // const RPC = {
  // [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  // [ChainId.ROPSTEN]: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  // [ChainId.RINKEBY]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  // [ChainId.KOVAN]: 'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
  // [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  // [ChainId.MATIC]:
  //     'https://apis.ankr.com/e22bfa5f5a124b9aa1f911b742f6adfe/c06bb163c3c2a10a4028959f4d82836d/polygon/full/main',
  //   [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  // }
  const getProviderOptions = () => ({
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: { [Number(networkData[0].chainId)]: networkData[0].rpcUrls[0] },
        network: DEPLOYED_NET_ENV === 'mainnet' ? 'matic' : 'mumbai',
        chainId: Number(networkData[0].chainId),
        // infuraId: INFURA_ID,
      },
    },
  })

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    disableInjectedProvider: false, // optional
    providerOptions: getProviderOptions(),
  })

  inject('web3Modal', web3Modal)
}
