import { BodyText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import PostForm from 'components/PostForm'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-stretch'),
  space('space-y-2')
)
export default function () {
  const { account } = useSnapshot(WalletStore)
  return (
    <div className={container}>
      <HeaderText>New TJ</HeaderText>
      <BodyText>No censorship. Fully decentralized. Nice.</BodyText>
      <Wallet />
      {account && <PostForm />}
    </div>
  )
}
