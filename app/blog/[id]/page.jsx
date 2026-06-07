import BlogDetails from "@/components/pages/BlogDetails";

export default function Page({ params }) {
  return <BlogDetails id={params.id} />;
}
