import Head from "next/head";
import CodeEditor from "../components/CodeEditor";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Online Code Compiler</title>
        <meta
          name="description"
          content="A professional online code compiler"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <span className="text-[#852bf4]">Online </span>
          <span className="">Code </span>
          <span className="text-[#852bf4]">Compiler</span>
        </h1>
        <CodeEditor />
      </main>

      <footer>
        <p>© 2024 Online Code Compiler. All rights reserved.</p>
      </footer>
    </div>
  );
}
