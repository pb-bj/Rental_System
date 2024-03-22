import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Layout = () => {
  return (
    <div>
        <Navbar />
          <main className="mt-1">
            <Outlet/>
          </main>
        {/* <Footer /> */}
    </div>
  )
}

export default Layout