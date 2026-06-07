import NewsDetails from "@/components/pages/NewsDetails";
import { newsItems } from "@/lib/news-data";

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: String(item.id),
  }));
}

export default function Page({ params }) {
  return <NewsDetails id={Number(params.id)} />;
}
