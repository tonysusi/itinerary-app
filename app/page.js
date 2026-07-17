import HoldingPage from "@/components/HoldingPage";
import ItineraryApp from "@/components/ItineraryApp";

export default function Home() {
  if (process.env.PLANNING_TRIP === "true") {
    return <HoldingPage />;
  }
  return <ItineraryApp />;
}
