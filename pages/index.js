import Head from 'next/head'
import ContactForm from '../components/contactForm.js'

export default function Home() {
  return (   
  <>

    <Head>
      <title>Form With Validations</title>
      <meta name="description" content="Form in NextJs" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ContactForm/>

  </>
  )
}
