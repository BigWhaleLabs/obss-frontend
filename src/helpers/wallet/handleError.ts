import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import parseRevertReason from 'helpers/wallet/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  noProvider: 'No provider found',
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  unknown: 'An unknown error occurred, please, contact us',
  failedPost: 'Failed to create post',
}

export function parseError(error: unknown, defaultMessage = ErrorList.unknown) {
  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error) displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    const revertMessage = parseRevertReason(message)
    displayedError = revertMessage || message
  }

  return displayedError ?? defaultMessage
}

export default function (error: unknown) {
  console.error(error)

  toast.error(parseError(error))
}
