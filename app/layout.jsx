import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "Pexels Galleria",
  description:
    "A project where it display the images, and can download the images also.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-[14px] bg-ctm-secondary text-ctm-primary">
        {children}
        <Footer />
      </body>
    </html>
  );
}
