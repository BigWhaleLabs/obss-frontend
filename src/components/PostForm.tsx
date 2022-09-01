import { BodyText } from 'components/Text'
import { ChangeEvent } from 'preact/compat'
import { toast } from 'react-toastify'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import ReactTextareaAutosize from 'react-textarea-autosize'
import classnames, {
  display,
  flexDirection,
  gap,
  padding,
} from 'classnames/tailwind'
import publishPost from 'helpers/publishPost'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const field = classnames(padding('p-2'))
export default function () {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  return (
    <div className={container}>
      <ReactTextareaAutosize
        className={field}
        type="text"
        maxLength={280}
        placeholder="Share your thoughts on the blockchain!"
        minRows={3}
        value={text}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          setText(event.currentTarget.value)
        }}
        spellcheck
        disabled={loading}
      />
      {message && <BodyText>{message}</BodyText>}
      <Button
        title="Post!"
        onClick={async () => {
          setLoading(true)
          setMessage('')
          try {
            const { cid, receipt } = await publishPost(text)
            setMessage(
              `Posted at IPFS ${cid} with tx ${receipt.transactionHash}!`
            )
          } catch (error) {
            toast(error instanceof Error ? error.message : error)
          } finally {
            setLoading(false)
          }
        }}
        disabled={loading}
      />
    </div>
  )
}
