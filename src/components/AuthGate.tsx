"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const publicPage = pathname === "/login" || pathname === "/register";
    const signedIn = Boolean(localStorage.getItem("heritageway_user"));
    if (!publicPage && !signedIn) {
      router.replace("/login");
      return;
    }
    if (publicPage && signedIn) {
      router.replace("/dashboard");
      return;
    }
    setReady(true);
  }, [pathname, router]);
  if (!ready) return <main className="auth-loading"><span className="brand-mark">H</span><p>Checking your sign-in…</p></main>;
  return <>{children}</>;
}
