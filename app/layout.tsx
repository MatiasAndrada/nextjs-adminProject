import { SpeedInsights } from "@vercel/speed-insights/next"; //metricas para ver en vercel
import "@/components/global.css";
import NextAuthProvider from "@/context/SessionAuthProvider";
//import { inter } from "@/components/fonts";
import { Metadata } from "next";

//export const runtime = "edge";

export const metadata: Metadata = {
  /*Next.js agregará automáticamente el título y los metadatos a su aplicación.
. Los metadatos de las páginas anidadas anularán los metadatos de la página principal. */
  title: {
    template: "%s | Project Admin", // El %s se reemplazara con el título de la página especifica
    default: "Project Admin",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-slate-200 dark:bg-slate-950 text-black dark:text-white`}
        id="main_layout"
      >
        <NextAuthProvider>
          {children}
          <SpeedInsights />
        </NextAuthProvider>
      </body>
    </html>
  );
}
