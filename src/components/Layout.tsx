
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-theme-cream">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-6">
        <div className="container text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DocCollab. All rights reserved.</p>
          <p className="mt-1">A real-time collaborative document editor.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
