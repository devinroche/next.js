import { AppProps } from 'next/app'
import '../styles/index.css'
import { CookiesProvider } from 'react-cookie'
import { AuthenticationProvider } from '../context/Authentication'
import { ModalProvider } from 'react-modal-hook'

export default function MyApp({ Component, pageProps }: AppProps) {
  // This is super hacky, but there was a types bug with Component from versions.
  const AnyComponent = Component as any

  return (
    <CookiesProvider>
      <ModalProvider>
        <AuthenticationProvider pageProps={pageProps}>
          <AnyComponent {...pageProps} />
        </AuthenticationProvider>
      </ModalProvider>
    </CookiesProvider>
  )
}
