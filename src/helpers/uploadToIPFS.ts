import Post from 'models/Post'
import env from 'helpers/env'

const base = env.VITE_IPFS_UPLOADER

export default function (object: Post) {
  return fetch(`${base}/file`, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json() as Promise<{ cid: string }>)
}
