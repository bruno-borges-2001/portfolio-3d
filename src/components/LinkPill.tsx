import { ArrowSquareOut } from '@phosphor-icons/react'
import Link, { LinkProps } from 'next/link'

interface LinkPillProps extends LinkProps {
  children: React.ReactNode

  hideExternalIcon?: boolean
}

function LinkPill({ children, hideExternalIcon = false, ...props }: LinkPillProps) {
  return (
    <Link {...props} target="_blank" className='px-3 py-2 bg-red-600 text-white cursor-pointer hover:brightness-110 rounded-full text-xs flex gap-2'>
      {!hideExternalIcon && <ArrowSquareOut size={14} />}{children}
    </Link>
  )
}

export default LinkPill
