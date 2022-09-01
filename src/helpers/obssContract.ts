import { OBSSStorage__factory } from '@big-whale-labs/obss-storage-contract'
import env from 'helpers/env'
import provider from 'helpers/provider'

export default OBSSStorage__factory.connect(env.VITE_OBSS_STORAGE, provider)
