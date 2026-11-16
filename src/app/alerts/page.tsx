import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { AlertTriangle, Bell, Info, ShieldCheck } from "lucide-react";
const items=[
 {type:"Safety reminder",kind:"warning",text:"Follow official signs and instructions from heritage-site staff. Some areas may be restricted or temporarily closed."},
 {type:"Crowd information",kind:"info",text:"Crowd indicators in this student prototype are sample values. They are not connected to live sensors or ticket scans."},
 {type:"Route planning",kind:"success",text:"Compare route distance, estimated time and crowd indicators before choosing a route."},
 {type:"Visitor etiquette",kind:"info",text:"Help preserve heritage locations: avoid touching protected structures, dispose of waste responsibly and respect local customs."}
];
export default function AlertsPage(){return <main className="app-shell"><SiteHeader/><section className="page-heading"><span className="eyebrow">VISITOR INFORMATION</span><h1>Alerts & important reminders</h1><p>Helpful notices for a safer and more respectful heritage visit.</p></section><div className="notice-list">{items.map((a,i)=><article className="notice-card" key={a.type}><span className={`notice-icon ${a.kind}`}>{a.kind==="warning"?<AlertTriangle/>:a.kind==="success"?<ShieldCheck/>:<Info/>}</span><div><span className="notice-type">{a.type}</span><p>{a.text}</p></div></article>)}</div><div className="planner-tip"><Bell/><div><strong>Important</strong><p>These are general prototype notices, not official emergency alerts. For urgent help, contact on-site authorities or local emergency services.</p></div></div><footer><Link className="brand footer-brand" href="/"><span className="brand-mark">H</span><span>Heritage<span className="brand-accent">Way</span></span></Link><span>Educational prototype</span></footer></main>}
