import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  fontWeight,
  padding,
  textColor,
} from 'classnames/tailwind'

const button = (disabled?: boolean) =>
  classnames(
    backgroundColor('bg-blue-500', {
      'hover:bg-blue-700': !disabled,
      'bg-gray-500': disabled,
    }),
    textColor('text-white'),
    fontWeight('font-bold'),
    padding('px-4', 'py-2'),
    borderRadius('rounded'),
    cursor({ 'cursor-not-allowed': disabled })
  )
export default function ({
  title,
  onClick,
  disabled,
}: {
  title: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      className={button(disabled)}
      onClick={() => {
        if (disabled) return
        onClick?.()
      }}
    >
      {title}
    </button>
  )
}
