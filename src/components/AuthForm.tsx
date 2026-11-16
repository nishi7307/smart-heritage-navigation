"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Eye, EyeOff, Landmark, Mail, Lock, User } from "lucide-react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const isRegister = mode === "register";

  function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 6 || (isRegister && name.trim().length < 2)) {
      setError("Enter a valid email, a password with at least 6 characters" + (isRegister ? ", and your name." : "."));
      return;
    }
    const displayName = isRegister ? name.trim() : (email.split("@")[0] || "Visitor");
    localStorage.setItem("heritageway_user", displayName);
    localStorage.setItem("heritageway_email", email);
    router.push("/dashboard");
  }

  return <main className="auth-page">
    <div className="auth-visual">
      <Link href="/" className="brand auth-brand"><span className="brand-mark"><Landmark size={20}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link>
      <div className="auth-visual-copy"><span className="eyebrow">YOUR JOURNEY STARTS HERE</span><h1>Explore history, one thoughtful journey at a time.</h1><p>Plan your visit, discover remarkable places and find a route that works for you.</p></div>
      <div className="auth-visual-bottom"><Compass size={18}/> Discover India’s heritage with confidence.</div>
    </div>
    <div className="auth-form-side">
      <Link href="/" className="back-link">← Back to home</Link>
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">{isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</span>
        <h2>{isRegister ? "Join HeritageWay" : "Sign in to HeritageWay"}</h2>
        <p>{isRegister ? "Create an account to save destinations and plan visits." : "Enter your details to continue your journey."}</p>
        {isRegister && <label>Full name<div className="input-with-icon"><User size={17}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></div></label>}
        <label>Email address<div className="input-with-icon"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></div></label>
        <label>Password<div className="input-with-icon"><Lock size={17}/><input type={show ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required/><button type="button" className="show-password" onClick={()=>setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
        {error && <div className="form-error">{error}</div>}
        <button className="primary-button auth-submit" type="submit">{isRegister ? "Create account" : "Sign in"} <span>→</span></button>
        <div className="auth-switch">{isRegister ? "Already have an account?" : "New to HeritageWay?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create account"}</Link></div>
        <div className="demo-note">Demo authentication: this prototype stores a display name in your browser. Connect a secure authentication provider before real deployment.</div>
      </form>
    </div>
  </main>;
}
