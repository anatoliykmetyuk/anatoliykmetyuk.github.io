import ArticlePreview from "@/components/ArticlePreview"
import { BlogPostSource } from "@/lib/markdown"

type IndexProps = {
  articles: BlogPostSource[]
}

const Index = ({ articles }: IndexProps) => {
  return (
    <div className="w-full overflow-clip">
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticlePreview {...article} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index