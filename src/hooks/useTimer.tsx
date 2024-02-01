import { useCallback, useRef, useState } from "react";

interface TimerParams {
  cb: TimerHandler
  timeout?: number
  debounce?: boolean
  args?: unknown[],
  label?: string | null
}

export default function useTimeout() {
  const timeoutRef = useRef(0)

  const [timeoutLabel, setTimeoutLabel] = useState<string | null>(null)

  const timer = useCallback(({ cb, timeout = 0, debounce = false, label = null, args = [] }: TimerParams) => {
    if (timeoutRef.current) {
      if (!debounce) return

      clearTimeout(timeoutRef.current)
    }

    const timeoutID = setTimeout(cb, timeout, ...args)

    timeoutRef.current = timeoutID

    setTimeoutLabel(label)
  }, [])

  const stopTimer = useCallback((originLabel?: string) => {
    if (originLabel && originLabel === timeoutLabel) return

    clearTimeout(timeoutRef.current)
    timeoutRef.current = 0
  }, [timeoutLabel])

  return { timer, stopTimer }
}