import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./(components)/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compilerd",
  description: "Efficient code compiler for popular languages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
