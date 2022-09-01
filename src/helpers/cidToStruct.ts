import { utils } from 'ethers'
import base58 from 'bs58'

export default function (cid: string) {
  const decoded = base58.decode(cid)
  return {
    digest: utils.hexlify(decoded.slice(2)),
    hashFunction: decoded[0],
    size: decoded[1],
  }
}
