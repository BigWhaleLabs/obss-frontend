import classnames, {
  backgroundColor,
  borderRadius,
  fontWeight,
  padding,
  textColor,
} from 'classnames/tailwind'

const button = classnames(
  backgroundColor('bg-blue-500', 'hover:bg-blue-700'),
  textColor('text-white'),
  fontWeight('font-bold'),
  padding('px-4', 'py-2'),
  borderRadius('rounded')
)
export default function ({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) {
  return (
    <button className={button} onClick={onClick}>
      {title}
    </button>
  )
}
