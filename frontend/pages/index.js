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
        <h1 className="title">Online Code Compiler</h1>
        <CodeEditor />
      </main>

      <footer>
        <p>© 2024 Online Code Compiler. All rights reserved.</p>
      </footer>
    </div>
  );
}
