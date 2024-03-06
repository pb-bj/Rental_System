import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Layout = () => {
  return (
    <div>
        <Navbar />
          <main className="container">
            <Outlet/>
          </main>
        <Footer />
    </div>
  )
}

export default Layout