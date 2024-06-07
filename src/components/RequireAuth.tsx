import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google"); // Or redirect to a custom login page
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>; // or a spinner
  }

  return session ? children : null;
};

export default RequireAuth;
