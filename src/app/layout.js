import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Suchana",
  description: "Notice Management System for College",
};

export default function RootLayout({ children }) {
  const data  = {
    email : "ritik_11202584@mmumullana.org"
  }

  // fetch(`https://e-suchana-backend.cyclic.app/api/fetchnotice/ritik_11202584@mmumullana.org`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))


  return (
    <html lang="en">
      <head>
     
      </head>
      <body className={inter.className}>
      <CookiesProvider>
        {children}
      </CookiesProvider>
      
      {/* <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script> */}
      {/* <script src='/flow.js'></script> */}
      </body>
    </html>
  );
}
