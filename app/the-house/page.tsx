import TheHouseClient from "../component/TheHouseClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The House | Noir Essence",
  description: "A bridge between the stone-carved courtyards of Jaipur and the rain-slicked boulevards of Paris.",
};

export default function Page() {
  return <TheHouseClient />;
}
