import { ReactNode } from "react";

const Layout = ({children}: {children:ReactNode}) => {
    return (
        <main className="flex items-center justify-center h-screen w-screen">
            {children}
        </main>
    );
}
 
export default Layout;