import React from "react";
import { useStaticQuery, graphql } from "gatsby";

type SEOProps = {
  pathname: string;
  article?: boolean | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

const SEO = ({
  pathname,
  title,
  description,
  image,
  article = false,
}: SEOProps) => {
  const { site } = useStaticQuery<Queries.SEOQuery>(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitter,
  } = site!.siteMetadata!;

  const seo = {
    title: title || defaultTitle!,
    description: description || defaultDescription!,
    image: `${siteUrl}${image || defaultImage!}`,
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
