import { signIn, signOut, useSession } from "next-auth/react";
import CreateNewRepertoire from "@/components/RepertoireManager";
import Head from "next/head";
import type { NextPage } from "next";
import ChessBoard from "@/components/chessBoard";
import styles from "@/styles/ChessBoard.module.css"

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto">
      {!session ? (
        <>
          <h1 className="text-2xl font-bold">Welcome to Opening Insight</h1>
          <button onClick={() => signIn("google")} className="btn btn-primary">
            Sign in with Google
          </button>
          <br />
          <button onClick={() => signIn("github")} className="btn btn-primary">
            Sign in with GitHub
          </button>
        </>
      ) : (
        <>

          <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
          <img src={session.user?.image ?? ''} alt="User Image" className="rounded-full w-16 h-16" />
          <button onClick={() => signOut()} className="btn btn-secondary">
            Sign Out
          </button>



          <div className={styles.container}>
            <Head>
              <title>Opening Insight</title>
              <meta name="description" content="Create and manage your chess opening repertoire" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
              <h1>Welcome to Opening Insight</h1>
              <ChessBoard />
            </main>
          </div>
        </>
      )}
    </div>
  );
}
