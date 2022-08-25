import NetworkChainIdToName from 'models/NetworkChainIdToName'
import env from 'helpers/env'

export default function () {
  const index = Object.values(NetworkChainIdToName).findIndex(
    (name) => name === env.VITE_ETH_NETWORK
  )
  const chainId = Object.keys(NetworkChainIdToName)[index]

  const name = Object.values(NetworkChainIdToName)[index]
  const firstCapitalName = name.charAt(0).toUpperCase() + name.slice(1)
  const blockExplorerUrl =
    name === 'mainnet'
      ? 'https://etherscan.io/'
      : `https://${name}.etherscan.io/`

  const currency = `${firstCapitalName}ETH`

  return {
    chainId,
    rpcUrls: [`https://${name}.infura.io/v3/`],
    chainName: `${firstCapitalName} Test Network`,
    nativeCurrency: {
      name: currency,
      symbol: currency,
    },
    blockExplorerUrls: [blockExplorerUrl],
  }
}
