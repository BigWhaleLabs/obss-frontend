import Post from 'models/Post'
import WalletStore from 'stores/WalletStore'
import cidToStruct from 'helpers/cidToStruct'
import obssContract from 'helpers/obssContract'
import uploadToIPFS from 'helpers/uploadToIPFS'

export default async function publishPost(text: string) {
  const post: Post = {
    content: [{ text }],
  }
  const { cid } = await uploadToIPFS(post)
  console.log('Posted to IPFS', cid)
  const cidStruct = cidToStruct(cid)
  const provider = WalletStore.provider
  const contract = obssContract.connect(provider.getSigner())
  const tx = await contract.addProfilePost(cidStruct)
  const receipt = await tx.wait()
  return { cid, receipt }
}
