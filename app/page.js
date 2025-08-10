import Hero from "@/Components/Hero";
import SwipCreators from "./SwipCreators";
import Features from "./Features";
import { redirect } from "next/navigation";
export default async function Home({ searchParams }) {
  const params = await searchParams;
  const isLogged = params?.isLogged === "true";
  if (isLogged) {
    redirect('/dashboard');
  }
  return (
    <>
      <Hero />
      <Features />
      <SwipCreators />
    </>
  );
}
