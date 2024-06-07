import { signIn, signOut, useSession } from "next-auth/react";
import CreateNewRepertoire from "@/components/RepertoireManager";

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
          <CreateNewRepertoire />
        </>
      )}
    </div>
  );
}
