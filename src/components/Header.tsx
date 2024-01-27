import { Script } from 'gatsby';
import React from 'react'
import SEO from './SEO';
import { PostFrontmatter } from "../types";

type HeaderProps = {
  pathname: string;
  post?: PostFrontmatter;
};

export const Header = ({ pathname, post }: HeaderProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Script
        defer
        data-domain="akmetiuk.com"
        src="https://plausible.akmetiuk.com/js/script.js"
      />
      <SEO pathname={pathname} post={post} />
    </>
  );
};

export default Header