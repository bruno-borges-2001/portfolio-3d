'use client'

import { cn } from '@/utils/style';
import { useReducedMotion } from '@react-spring/three';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import { Image as ImageType } from 'sanity';
import { urlForImage } from '../../sanity/lib/image';

type Item = { icon: ImageType, label: string }

export default function SkillCarousel({ skills }: { skills: Item[] }) {
  const prefersReducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(prefersReducedMotion)
  const [cooldown, setCooldown] = useState(false)

  useEffect(() => {
    setCooldown(true)
    setTimeout(() => setCooldown(false), 1000)
  }, [expanded])

  useEffect(() => {
    if (prefersReducedMotion)
      setExpanded(prefersReducedMotion)
  }, [prefersReducedMotion])

  const CarouselItems = useCallback(
    ({ prefix }: { prefix: string }) => skills.map(el => <CarouselItem key={prefix + el.label} {...el} setLayoutId={['expanded', 'a1'].includes(prefix)} />),
    [skills]
  )

  return (
    <section className={cn("relative mb-3 py-3 carousel-container", prefersReducedMotion || cooldown ? 'pointer-events-none' : 'group')} onClick={() => setExpanded(!expanded)}>
      <div className="flex overflow-hidden justify-start w-full">
        <AnimatePresence>
          {expanded ? (
            <div className='flex flex-wrap gap-4 gap-y-2 justify-center'>
              <CarouselItems prefix='expanded' />
            </div>
          ) : (
            <>
              <TranslateWrapper>
                <CarouselItems prefix='a1' />
              </TranslateWrapper>
              <TranslateWrapper>
                <CarouselItems prefix='a2' />
              </TranslateWrapper>
              <TranslateWrapper>
                <CarouselItems prefix='a3' />
              </TranslateWrapper>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className='grid opacity-0 group-hover:opacity-100 transition-opacity place-items-center absolute inset-0 backdrop-blur-sm bg-black/50 cursor-pointer'>
        {expanded ? 'Shrink' : 'Expand'}
      </div>
    </section>
  );
};

const TranslateWrapper = ({ children, reverse }: { children: React.ReactNode, reverse?: boolean }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2 w-full min-w-fit"
    >
      {children}
    </motion.div>
  );
};

const CarouselItem = memo(({ icon, label, setLayoutId }: Item & { setLayoutId?: boolean }) => {
  const iconUrl = urlForImage(icon)
  const ImageComponent = iconUrl.includes('.svg')
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={iconUrl} alt={'Skill: ' + label} style={{ objectFit: 'contain', height: '100%', minWidth: 16 }} />
    : <Image src={iconUrl} alt={'Skill: ' + label}
      width={0}
      height={0}
      sizes="100vw"
      style={{ height: '100%', minWidth: 16, objectFit: 'contain' }} />

  return (
    <motion.article layoutId={setLayoutId ? label : undefined} className="h-8 pl-3 pr-4 py-2 flex gap-2 relative items-center whitespace-nowrap rounded-full bg-slate-600">
      {ImageComponent}
      {label}
    </motion.article>
  );
});

CarouselItem.displayName = 'Carousel Item'
