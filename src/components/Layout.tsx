import React from "react"

import Sidebar from "./Sidebar"


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="has-background-light">
        <div className="columns is-gapless">
          <div className="column is-one-quarter is-hidden-mobile">
            <div className="box m-2">
              <Sidebar />
            </div>
          </div>
          <div className="column is-three-quarters">
            <div className="box m-2">{children}</div>
          </div>
        </div>
      </main>
      <footer className="footer content has-text-centered">
        <p>© Anatolii Kmetiuk, 2016 - 2024</p>
      </footer>
    </>
  );
}

export default Layout