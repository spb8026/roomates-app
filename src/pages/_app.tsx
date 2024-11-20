import Nav from "@/components/nav";
import "@/styles/globals.css";
import { UserContextProvider } from "@/UserContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <UserContextProvider>
              <Component {...pageProps} />;
              <Nav></Nav>
  </UserContextProvider>
  )
}
