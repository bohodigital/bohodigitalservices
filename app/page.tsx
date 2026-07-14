import type { Metadata } from "next";
import Homepage from "./Homepage";

export const metadata: Metadata = {
  title: {
    absolute:
      "Boho Digital Services | Digital Engineering for Visibility, Leads & Websites",
  },
  description:
    "Digital engineering for local visibility and lead systems, websites and managed hosting, provider rescue, custom tools, automation, analytics, and improvement.",
};

export default function Home() {
  return <Homepage />;
}
