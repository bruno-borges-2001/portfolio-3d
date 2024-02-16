'use client'

import { ILink } from '@/types/components'
import { ArrowSquareOut } from '@phosphor-icons/react'
import Link from 'next/link'
import { urlForImage } from '../../sanity/lib/image'

function LinkPill({ label, href, iconAlignment, iconLink, showDefaultIcon, icon }: ILink) {
  const Icon = showDefaultIcon
    ? <ArrowSquareOut size={14} />
    : icon
      // eslint-disable-next-line @next/next/no-img-element
      ? <img src={urlForImage(icon)} className={iconLink ? 'h-4 w-4' : 'h-3.5 w-3.5'} alt='label' />
      : undefined

  return (
    <Link href={href} target="_blank" className='px-3 py-2 bg-red-600 text-white cursor-pointer hover:brightness-110 rounded-full text-xs flex gap-2 no-underline'>
      {(iconLink || iconAlignment === 'left') && Icon}
      {label}
      {!iconLink && iconAlignment === 'right' && Icon}
    </Link>
  )
}

export default LinkPill
