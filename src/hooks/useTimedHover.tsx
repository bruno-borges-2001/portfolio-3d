import { useCallback, useEffect, useRef, useState } from "react";

export default function useTimedRoll<T>(
  items: T[],
  delay = 4000,
  identifierFunction?: (el: T, index: number, array: T[]) => boolean
) {

  const [currentItem, setCurrentItem] = useState<T | null>(null)
  const [rolling, setRolling] = useState(true)

  const lastIndex = useRef<number>(-1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const roll = () => {
    const nextIndex = (lastIndex.current + 1) % items.length
    lastIndex.current = nextIndex
    setCurrentItem(items[nextIndex])
    timeoutRef.current = setTimeout(roll, delay)
  }

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (!rolling) return

    timeoutRef.current = setTimeout(roll, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolling])

  const setValue = useCallback((value: T | null) => {
    setCurrentItem(value)

    if (value === null) {
      setRolling(true)
      return
    }

    setRolling(false)
    lastIndex.current = items.findIndex(identifierFunction ?? ((el) => el === currentItem)) ?? 0
  }, [identifierFunction, currentItem, items])

  const toggleRoll = useCallback((value: boolean) => {
    setRolling(value)
    console.log(value, timeoutRef.current)

    if (!value) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setCurrentItem(null)
    }
  }, [])

  return [currentItem, setValue, toggleRoll] as [T, (value: T | null) => void, (value: boolean) => void]
}