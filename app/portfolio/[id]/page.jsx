import PortfolioDetails from "@/components/pages/PortfolioDetails";

export default function Page({ params }) {
  return <PortfolioDetails id={params.id} />;
}
