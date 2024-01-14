import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PostFrontmatter } from "../types";


type SEOProps = {
  pathname: string;
  post?: PostFrontmatter;
};

const SEO = ({
  pathname,
  post,
}: SEOProps) => {
  const { site } = useStaticQuery<Queries.SEOQuery>(query);
  const article = !!post;

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitter,
  } = site!.siteMetadata!;

  const seo = {
    title: post?.title || defaultTitle!,
    description: post?.description || defaultDescription!,
    image: `${siteUrl}${post?.image || defaultImage!}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <>
      <title>{titleTemplate?.replace(/%s/g, seo.title)}</title>
      <meta name="description" content={seo.description!} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:creator" content={twitter} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </>
  );
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitter
      }
    }
  }
`;

export default SEO;
