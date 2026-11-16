"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, MapPin, ArrowRight, Landmark } from "lucide-react";
import { sites } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
export default function ExplorePage(){
 const [q,setQ]=useState("");
 const filtered=useMemo(()=>sites.filter(s=>`${s.name} ${s.city} ${s.state} ${s.category}`.toLowerCase().includes(q.toLowerCase())),[q]);
 return <main className="app-shell"><SiteHeader/><section className="page-heading"><span className="eyebrow">DISCOVER INDIA</span><h1>Explore heritage destinations</h1><p>Choose a destination to see its landmarks, visitor guide, sample crowd indicators and suggested walking routes.</p><div className="search-box explore-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by monument, city or category"/></div></section><div className="site-grid explore-grid">{filtered.map(site=><Link href={`/sites/${site.id}`} className="site-card" key={site.id}><span className="site-thumb" style={{backgroundImage:`url(${site.image})`}}><span>{site.category}</span></span><span className="site-card-content"><strong>{site.name}</strong><small><MapPin size={13}/>{site.city}, {site.state}</small><span className="site-card-footer">Open destination guide <ArrowRight size={15}/></span></span></Link>)}</div>{!filtered.length&&<div className="empty-state">No destinations found.</div>}<footer><Link className="brand footer-brand" href="/"><span className="brand-mark"><Landmark size={18}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link><span>Educational prototype</span></footer></main>
}
