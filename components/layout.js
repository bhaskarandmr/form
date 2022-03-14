import Footer from './footer.js'

const Layout = ({ children }) => {
	  return (
    <>
      <div className="w-100 h-100 p-3">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
		
export default Layout