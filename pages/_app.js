// Order is important between bootstrap and your css or sass file
import 'bootstrap/dist/css/bootstrap.min.css' 
import Layout from '../components/layout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
		
}

export default MyApp