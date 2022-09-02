import { BodyText } from 'components/Text'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'preact/compat'
import Loading from 'components/Loading'
import obssContract from 'helpers/obssContract'

function PostsList({ cids }: { cids: string[] }) {
  return !cids.length ? (
    <BodyText>No posts yet</BodyText>
  ) : (
    <>
      {cids.map((cid) => (
        <BodyText key={cid}>{cid}</BodyText>
      ))}
    </>
  )
}

export default function ({ account }: { account: string }) {
  const [loading, setLoading] = useState(true)
  const [cids, setCids] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const lastProfileId = (
          await obssContract.lastProfilePostIds(account)
        ).toNumber()
        if (!lastProfileId) return
        const cids = await obssContract.getProfilePosts(
          account,
          0,
          lastProfileId
        )
        setCids(cids.map((struct) => JSON.stringify(struct)))
      } catch (error) {
        toast(error instanceof Error ? error.message : error)
      } finally {
        setLoading(false)
      }
    }
    void fetchData()
  })

  return (
    <div>
      <BodyText>Posts for account {account}</BodyText>
      {loading ? (
        <Loading title={`posts for account ${account}`} />
      ) : (
        <PostsList cids={cids} />
      )}
    </div>
  )
}
