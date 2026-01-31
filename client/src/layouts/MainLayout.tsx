// import MinimalSocialsFooter from "@/components/ui/footer";
// import NavbarComponent from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
      <div className="flex flex-col min-h-screen w-full">
        {/* <header>
          <NavbarComponent />
        </header>
   */}
        {/* This makes the main content take up available space and push the footer down */}
        <main className="flex-grow">
          <Outlet />
        </main>
  
        {/* <footer>
          <MinimalSocialsFooter />
        </footer> */}
      </div>
    );
  }
  
