"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Landmark, Menu, X, UserCircle } from "lucide-react";

export default function SiteHeader() {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => { setUser(localStorage.getItem("heritageway_user") || ""); }, []);
  return <header className="topbar inner-topbar">
    <Link className="brand" href="/"><span className="brand-mark"><Landmark size={20}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? "nav-open" : ""}>
      <Link href="/explore">Explore</Link><Link href="/planner">Route planner</Link><Link href="/alerts">Alerts</Link><Link href="/about">About</Link>
      {user ? <Link href="/dashboard" className="nav-user"><UserCircle size={15}/>{user}</Link> : <Link href="/login">Sign in</Link>}
    </nav>
    <Link className="admin-button desktop-account" href={user ? "/dashboard" : "/login"}>{user ? "My dashboard" : "Sign in"}</Link>
  </header>;
}
