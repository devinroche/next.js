import { useEffect } from 'react'
import { useModal } from 'react-modal-hook'
import { LoginModal } from './login-modal'
import { useAuthentication } from '../context/Authentication'

export const Premium = () => {
  const { user, login } = useAuthentication()

  const [showModal, closeModal] = useModal(() => (
    <LoginModal
      isOpen
      onClose={closeModal}
      onSubmit={(email: string, password: string) => login(email, password)}
    />
  ))

  useEffect(() => {
    return () => closeModal()
  }, [closeModal])

  return (
    <button disabled={user !== null} onClick={showModal}>
      Premium
    </button>
  )
}
