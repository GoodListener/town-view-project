import { useEffect, useState } from 'react'

export const usePointerClick = (eventhandler: (event: any) => void) => {
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false)
  const [isDrag, setIsDrag] = useState<boolean>(false)

  const handlePointerUp = (event: any) => {
    if (isDrag) return

    setIsDrag(false)
    setIsPointerDown(false)

    eventhandler(event)
  }

  const handlePointerMove = () => {
    if (isPointerDown) {
      setIsDrag(true)
    }
  }

  const handlePointerDown = () => {
    setIsDrag(false)
    setIsPointerDown(true)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerDown, handlePointerMove, handlePointerUp])
}
