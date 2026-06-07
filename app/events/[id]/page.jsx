import EventDetails from "@/components/pages/EventDetails";

export default function Page({ params }) {
  return <EventDetails id={params.id} />;
}
