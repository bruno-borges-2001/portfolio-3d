import { useEffect, useState } from 'react'

// xs => @media (min-width: 500px) { ... }
// sm => @media (min-width: 640px) { ... }
// md => @media (min-width: 768px) { ... }
// lg => @media (min-width: 1024px) { ... }
// xl => @media (min-width: 1280px) { ... }
// 2xl => @media (min-width: 1536px) { ... }

function getBreakpoint() {
  const width = window.innerWidth
  if (width < 500) return 'xs'
  if (width < 640) return 'sm'
  if (width < 768) return 'md'
  if (width < 1024) return 'lg'
  if (width < 1280) return 'xl'
  if (width < 1536) return '2xl'
  return '3xl'
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint())

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

export default useBreakpoint
