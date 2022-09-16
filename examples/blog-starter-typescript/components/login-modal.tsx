import { useRouter } from 'next/router'
import React from 'react'
import ReactModal from 'react-modal'

export const LoginModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  onClose: () => void
  isOpen: boolean
  onSubmit: (email: string, password: string) => void
}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  const handleClose = () => {
    onClose()
    router.replace('/')
  }

  const handleSubmit = () => {
    console.log('submitting', email, password)
    onSubmit(email, password)
  }

  return (
    <ReactModal isOpen={isOpen}>
      <div className="container">
        <button
          className="font-bold py-2 px-4 rounded border mx-auto"
          onClick={handleClose}
        >
          x
        </button>
        <form
          className="bg-blue text-center w-1/3 px-3 py-4 mx-auto rounded"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mx-auto text-sm py-2 px-3 rounded"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
          />
          <button className="font-bold py-2 px-4 rounded border block mx-auto w-full">
            Login
          </button>
        </form>
      </div>
    </ReactModal>
  )
}
