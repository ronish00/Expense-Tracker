import Navbar from "@/components/shared/Navbar";
import { UserProvider } from "@/context/UserContext";
import { checkUser } from "@/lib/actions/user.action";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await checkUser();

  return (
    <main>
      <UserProvider user={user}>
        <Navbar />
        {children}
      </UserProvider>
    </main>
  );
};

export default Layout;
