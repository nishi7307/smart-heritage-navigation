"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { Bookmark, Compass, MapPin, Route, LogOut, ArrowRight, UserCircle } from "lucide-react";
import { sites } from "@/lib/data";
export default function DashboardPage(){
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const router=useRouter();
 useEffect(()=>{const n=localStorage.getItem("heritageway_user");if(!n){router.replace("/login");return;}setName(n);setEmail(localStorage.getItem("heritageway_email")||"");},[router]);
 function logout(){localStorage.removeItem("heritageway_user");localStorage.removeItem("heritageway_email");router.push("/");}
 return <main className="app-shell"><SiteHeader/><section className="page-heading dashboard-heading"><span className="eyebrow">YOUR HERITAGEWAY</span><h1>Welcome{ name ? `, ${name}` : "" }!</h1><p>Your personal space to discover places and plan thoughtful visits.</p></section><div className="dashboard-welcome"><div className="dashboard-avatar"><UserCircle size={34}/></div><div><strong>{name || "Visitor"}</strong><span>{email}</span><small>Visitor account · Demo mode</small></div><button className="save-button" onClick={logout}><LogOut size={15}/> Sign out</button></div><div className="dashboard-quick"><Link href="/explore"><Compass/><strong>Explore destinations</strong><span>Discover heritage places <ArrowRight size={14}/></span></Link><Link href="/planner"><Route/><strong>Plan a route</strong><span>Compare crowd-aware routes <ArrowRight size={14}/></span></Link><Link href="/alerts"><Bookmark/><strong>Visitor alerts</strong><span>Read important reminders <ArrowRight size={14}/></span></Link></div><section className="section"><div className="section-heading"><div><span className="eyebrow">SUGGESTED FOR YOU</span><h2>Popular destinations</h2><p>Open a destination to view its landmarks and route options.</p></div></div><div className="site-grid">{sites.slice(0,3).map(s=><Link href={`/sites/${s.id}`} className="site-card" key={s.id}><span className="site-thumb" style={{backgroundImage:`url(${s.image})`}}><span>{s.category}</span></span><span className="site-card-content"><strong>{s.name}</strong><small><MapPin size={13}/>{s.city}, {s.state}</small><span className="site-card-footer">View details <ArrowRight size={15}/></span></span></Link>)}</div></section><footer><Link className="brand footer-brand" href="/"><span className="brand-mark">H</span><span>Heritage<span className="brand-accent">Way</span></span></Link><span>Demo visitor dashboard</span></footer></main>
}
