import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)
  return account ? (
    <BodyText>Connected: {account}</BodyText>
  ) : (
    <Button title="Connect Wallet" onClick={() => WalletStore.connect()} />
  )
}
