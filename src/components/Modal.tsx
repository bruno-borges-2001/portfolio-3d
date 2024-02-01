import { forwardRef } from 'react'
import useStateContext from '../hooks/useStateContext'
import { cn } from '../utils/style'

interface ModalProps extends React.HTMLProps<HTMLButtonElement & HTMLDivElement> {
  height: string | number
  width: string | number
}

const Modal = forwardRef<HTMLButtonElement, ModalProps>(({ children, height, width, className, ...rest }, ref) => {
  return (
    <button ref={ref} onClick={rest.onClick} style={{ height, width }} className={cn('absolute flex p-4 box-content z-[999]', className)}>
      <div className={`p-4 bg-black/70 border border-red-600 annotation-enter ${rest.onClick ? 'cursor-pointer' : ''}`}>
        <div className='annotation-content-enter h-full relative select-none'>
          {children}
        </div>
      </div>
    </button>
  )
})

Modal.displayName = "Modal"

export function ModalReturnButton() {
  const { setState } = useStateContext()

  return (
    <button
      onClick={() => setState(null)}
      aria-label='go back'
      className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 text-gray-500 opacity-70 whitespace-nowrap"
    >
      click here to go back
    </button>
  )
}

export default Modal
