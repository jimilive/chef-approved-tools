'use client'
import ExitIntentModal, { useExitIntent } from './ExitIntentModal'

export default function ExitIntentWrapper() {
  const { showModal, closeModal } = useExitIntent()

  return (
    <ExitIntentModal
      isOpen={showModal}
      onClose={closeModal}
    />
  )
}