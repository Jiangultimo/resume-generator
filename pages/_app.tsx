import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        #__next{
          height: 100%;
        }
      `}</style>
    </>
  )

}

export default App
