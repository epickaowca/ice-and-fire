import '../styles/globals.css'
import App from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store'
import { myTheme } from '../styles/styles'
import Head from 'next/head'

class MyApp extends App {
  render(){
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="iceandfire-app"
          />    
          <meta name="author" content="MP" />
          <meta name="keywords" content="ice and fire" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
        </Head>
        <ThemeProvider theme={myTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

const makestore = ()=>store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)