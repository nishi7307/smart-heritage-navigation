"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { sites, routeScore } from "@/lib/data";
import { Clock3, MapPin, Route, ShieldCheck, ArrowRight } from "lucide-react";
export default function PlannerPage(){
 const [siteId,setSiteId]=useState(sites[0].id);
 useEffect(()=>{ const requested=new URLSearchParams(window.location.search).get("site"); if(requested && sites.some(s=>s.id===requested)) setSiteId(requested); },[]);
 const [priority,setPriority]=useState("balanced");
 const site=sites.find(s=>s.id===siteId)||sites[0];
 const routes=useMemo(()=>[...site.routes].sort((a,b)=>{
   const score=(r:typeof a)=> priority==="least-crowded" ? r.crowd*0.65+r.distance/20*0.2+r.safetyRisk*0.15 : priority==="shortest" ? r.distance*0.55+r.minutes*0.3+r.crowd*0.1+r.safetyRisk*0.05 : routeScore(r);
   return score(a)-score(b);
 }),[site,priority]);
 const best=routes[0];
 const crowd=(v:number)=>v<35?"Low crowd":v<65?"Moderate crowd":"High crowd";
 const cls=(v:number)=>v<35?"low":v<65?"medium":"high";
 return <main className="app-shell"><SiteHeader/><section className="page-heading"><span className="eyebrow">PERSONALIZED ROUTE PLANNER</span><h1>Find a smarter way around</h1><p>Choose a heritage site and tell us what matters most. The demo planner ranks sample route options.</p></section><section className="planner-controls"><label>Heritage site<select value={siteId} onChange={e=>setSiteId(e.target.value)}>{sites.map(s=><option value={s.id} key={s.id}>{s.name} — {s.city}</option>)}</select></label><label>Route preference<select value={priority} onChange={e=>setPriority(e.target.value)}><option value="balanced">Balanced: distance + crowd + safety</option><option value="least-crowded">Avoid crowded areas</option><option value="shortest">Prefer shorter route</option></select></label><Link className="admin-button" href={`/sites/${site.id}`}>View destination <ArrowRight size={14}/></Link></section><section className="section"><div className="section-heading"><div><span className="eyebrow">ROUTE RESULTS</span><h2>{site.name}</h2><p>Best-ranked route appears first based on your selected preference.</p></div></div><div className="detail-route-grid">{routes.map((r,i)=><article className={`route-card ${i===0?"recommended":""}`} key={r.id}><div className="route-card-top"><div><span className="route-kicker">{i===0?"BEST MATCH":`OPTION ${i+1}`}</span><h3>{r.name}</h3></div><span className={`crowd-pill ${cls(r.crowd)}`}>{crowd(r.crowd)}</span></div><div className="route-metrics"><span><Route size={15}/>{r.distance} m</span><span><Clock3 size={15}/>{r.minutes} min</span><span><ShieldCheck size={15}/>{r.safetyRisk<10?"Lower risk":"Review safety"}</span></div><div className="crowd-bar"><span className={cls(r.crowd)} style={{width:`${r.crowd}%`}}/></div><div className="route-bottom"><span>Sample crowd index: {r.crowd}/100</span>{i===0&&<b className="recommended-label">RECOMMENDED</b>}</div></article>)}</div><div className="planner-tip"><ShieldCheck/><div><strong>Your recommended option: {best.name}</strong><p>Always follow official signs, staff instructions and current site restrictions. Sample routes are for project demonstration only.</p></div></div></section><footer><Link className="brand footer-brand" href="/"><span className="brand-mark">H</span><span>Heritage<span className="brand-accent">Way</span></span></Link><span>Educational prototype</span></footer></main>
}
