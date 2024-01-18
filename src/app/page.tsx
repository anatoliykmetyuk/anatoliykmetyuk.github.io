import ArticlePreview from "@/components/ArticlePreview"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BlogPostSource } from "@/lib/markdown"

type IndexProps = {
  articles: BlogPostSource[]
}

const Index = ({ articles }: IndexProps) => {
  return (
    <div className="w-full overflow-clip">
      <ScrollArea className='h-full'>
        <ul className="flex flex-col gap-2">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticlePreview {...article} />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}

export default Index