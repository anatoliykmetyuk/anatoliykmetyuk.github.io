import * as React from "react"
import Helmet from "react-helmet"

import Sidebar from "./sidebar"


const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script
          defer
          data-domain="akmetiuk.com"
          src="https://plausible.cloud.akmetiuk.com/js/script.js"
        ></script>
      </Helmet>
      <main class="has-background-light">
        <div class="columns is-gapless">
          <div class="column is-one-quarter is-hidden-mobile">
            <div class="box m-2">
              <Sidebar />
            </div>
          </div>
          <div class="column is-three-quarters">
            <div class="box m-2">{children}</div>
          </div>
        </div>
      </main>
      <footer class="footer content has-text-centered">
        <p>© Anatolii Kmetiuk, 2016 - 2023</p>
      </footer>
    </>
  );
}

export default Layout