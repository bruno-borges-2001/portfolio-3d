import { useEffect, useState } from 'react';

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      setPrefersReducedMotion(mediaQuery.matches)
    });
  }, [])

  return prefersReducedMotion
}

export default useReducedMotion
