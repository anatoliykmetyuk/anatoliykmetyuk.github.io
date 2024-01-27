import ArticlePreview from "@/components/ArticlePreview"
import { BlogPostSource, getBlogPostSources } from "@/lib/markdown"
import React from "react";


const Index: React.FC<{}> = () => {
  let articles: BlogPostSource[] = getBlogPostSources();
  // Sort articles by date
  articles.sort((a, b) => {
    if (a.date > b.date) return -1;
    else if (a.date < b.date) return 1;
    else return 0;
  });

  return (
    <div className="w-full overflow-clip">
      <div className="h-full overflow-y-auto overflow-x-clip">
        <ul className="flex flex-col gap-2">
          {articles.map((article) => (
            <li key={article.slug}>
              foobar
              <ArticlePreview {...article} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Index