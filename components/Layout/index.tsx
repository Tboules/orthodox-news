import React from "react";
import ClientOnly from "../ClientOnly";
import NavBar from "./NavBar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ClientOnly>
        <NavBar />
      </ClientOnly>
      <main>{children}</main>
    </>
  );
};

export default Layout;
