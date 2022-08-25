import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str(),
  VITE_ETH_RPC: str(),
  VITE_IPFS_UPLOADER: str(),
})
