import { PersistableStore } from '@big-whale-labs/stores'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import { serializeError } from 'eth-rpc-errors'
import NetworkChainIdToName from 'models/NetworkChainIdToName'
import chainForWallet from 'helpers/wallet/chainForWallet'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/wallet/handleError'
import web3Modal from 'helpers/wallet/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
  needNetworkChange = false

  disallowList = ['account', 'cachedProvider', 'provider', 'walletLoading']
  replacer = (key: string, value: unknown) => {
    return this.disallowList.includes(key) ? undefined : value
  }

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      await this.checkNetwork(provider, userNetwork)
      if (this.needNetworkChange)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      this.account = (await provider.listAccounts())[0]
      this.subscribeProvider(instance)
    } catch (error) {
      if (error === 'Modal closed by user') return
      handleError(error)
      this.clearData()
    } finally {
      this.walletLoading = false
    }
  }

  private async checkNetwork(provider: Web3Provider, userNetwork: string) {
    const network = env.VITE_ETH_NETWORK
    if (userNetwork === network) return (this.needNetworkChange = false)

    this.needNetworkChange = true
    await this.requestChangeNetwork(provider)
  }

  private async requestChangeNetwork(provider: Web3Provider) {
    const index = Object.values(NetworkChainIdToName).findIndex(
      (name) => name === env.VITE_ETH_NETWORK
    )
    const chainId = Object.keys(NetworkChainIdToName)[index]

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId }])
      this.needNetworkChange = false
    } catch (error) {
      const code = serializeError(error).code
      if (code !== 4902) return

      await provider.send('wallet_addEthereumChain', [chainForWallet()])
      this.needNetworkChange = false
    }
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    this.walletLoading = false
  }

  get provider() {
    return provider
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) this.clearData()

      this.account = undefined
      void this.handleAccountChanged()
    })
    provider.on('disconnect', (error: unknown) => {
      if (provider) provider.removeAllListeners()
      handleError(error)
      this.clearData()
    })
    provider.on('chainChanged', async () => {
      this.account = undefined
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
