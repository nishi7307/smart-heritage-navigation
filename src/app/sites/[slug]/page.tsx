"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { sites, routeScore } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import { ArrowLeft, ArrowRight, Clock3, MapPin, Route as RouteIcon, ShieldCheck, Users, Heart, Info, Camera, Accessibility, Bell, Landmark } from "lucide-react";

const HeritageMap = dynamic(() => import("@/components/HeritageMap"), { ssr: false, loading: () => <div className="map-loading">Loading map…</div> });
const details: Record<string, Record<string,string>> = {
  "golden-temple": {
    "Main Clock Tower Entrance":"A prominent visitor entrance to the Sri Harmandir Sahib complex. Follow the site's entry instructions and security checks.",
    "Darbar Sahib":"The central sacred shrine, known for its gold-plated upper structure and spiritual significance.",
    "Amrit Sarovar":"The sacred pool surrounding the shrine. Visitors should respect the site's customs and keep the area clean.",
    "Akal Takht":"One of the important institutions within the complex, located opposite the main shrine."
  },
  "jallianwala-bagh": {
    "Main Entrance":"The entrance to the memorial garden commemorating the 1919 tragedy.",
    "Martyrs' Well":"A preserved memorial feature associated with the events of 13 April 1919.",
    "Memorial Flame":"A memorial flame honouring those who lost their lives.",
    "Gallery":"Exhibitions and displays that provide historical context about the Jallianwala Bagh massacre."
  },
  "taj-mahal": {
    "Main Gate":"The principal visitor approach to the Taj Mahal complex. Entry rules and security checks apply.",
    "Charbagh Garden":"The formal Mughal garden layout with water channels and pathways leading toward the mausoleum.",
    "Main Mausoleum":"The iconic white-marble mausoleum built by Shah Jahan in memory of Mumtaz Mahal.",
    "Mosque":"A red sandstone mosque on the western side of the Taj Mahal complex."
  },
  "red-fort": {
    "Lahori Gate":"The principal ceremonial entrance to the Red Fort complex.",
    "Chhatta Chowk":"A historic covered bazaar area inside the fort.",
    "Diwan-i-Aam":"The Hall of Public Audience, where the Mughal emperor received visitors.",
    "Diwan-i-Khas":"The Hall of Private Audience, associated with royal ceremonies."
  },
  "qutub-minar": {
    "Qutub Minar":"A celebrated victory tower and one of the best-known monuments in the Qutub complex.",
    "Iron Pillar":"A historic iron pillar noted for its metallurgy and long-standing preservation.",
    "Quwwat-ul-Islam Mosque":"An early mosque within the archaeological complex.",
    "Alai Darwaza":"A monumental gateway known for its Indo-Islamic architecture."
  },
  "india-gate": {"India Gate Arch":"The 42-metre-high triumphal arch is a major national war memorial in New Delhi.", "Amar Jawan Jyoti Area":"A memorial area associated with remembrance of fallen soldiers; observe current site arrangements.", "Kartavya Path":"The ceremonial avenue leading toward the Rashtrapati Bhavan precinct.", "Central Lawns":"Open landscaped public spaces around the memorial."},
  "amer-fort": {"Suraj Pol":"One of the fort's principal gateways, leading visitors into the palace complex.", "Jaleb Chowk":"A large courtyard historically used for ceremonial gatherings.", "Diwan-i-Aam":"The Hall of Public Audience, where the ruler received visitors.", "Sheesh Mahal":"The celebrated mirror palace with intricate decorative work."},
  "mysore-palace": {"Main Palace Gate":"A visitor entrance to the royal palace complex; follow ticketing and security instructions.", "Durbar Hall":"A richly decorated ceremonial hall used for royal assemblies.", "Kalyana Mantapa":"An ornate pavilion known for its decorative glass and colourful design.", "Palace Courtyard":"The inner open space connecting palace sections."},
  "konark-sun-temple": {"Main Temple Platform":"The monumental platform of the Sun Temple, designed as the chariot of Surya.", "Natya Mandapa":"The dance hall associated with temple performances.", "Jagamohana":"The assembly hall, noted for its scale and stone architecture.", "Carved Stone Wheels":"Elaborately carved wheels that form part of the temple's chariot symbolism."},
  "ajanta-caves": {"Cave 1":"A Buddhist vihara cave famous for murals and painted depictions.", "Cave 2":"A cave with decorated pillars, paintings and shrine features.", "Cave 16":"A major cave with narrative paintings and sculptural elements.", "Cave 26":"A chaitya hall containing a large reclining Buddha sculpture."},
  "ellora-caves": {"Kailasa Temple":"A monumental rock-cut temple carved from a single rock mass.", "Cave 10":"A Buddhist chaitya cave also known as the Carpenter's Cave.", "Cave 16 Courtyard":"The vast courtyard surrounding the Kailasa temple complex.", "Jain Caves":"A group of caves with detailed Jain sculptures and architectural features."},
  "khajuraho": {"Kandariya Mahadeva Temple":"A major temple celebrated for its elaborate sculptural programme.", "Lakshmana Temple":"A prominent temple dedicated to Vaikuntha Vishnu.", "Devi Jagadambi Temple":"A temple in the western group with richly carved exterior walls.", "Eastern Group":"A collection of temples and Jain monuments in the eastern area."},
  "charminar": {"Charminar Plaza":"The open area around Hyderabad's iconic four-minaret monument.", "Mecca Masjid":"A historic mosque located near Charminar; respect worshippers and access rules.", "Laad Bazaar":"A traditional market street known for bangles and local shopping.", "Chowmahalla Palace":"A historic palace complex associated with the Nizams of Hyderabad."},
  "victoria-memorial": {"Main Memorial":"The central marble monument and museum building.", "Museum Galleries":"Exhibition galleries presenting collections related to the region's history.", "North Gate":"One of the entrances to the memorial grounds.", "Garden Promenade":"Landscaped paths around the memorial; follow park access rules."},
  "sanchi-stupa": {"Great Stupa":"A major Buddhist monument with a hemispherical dome and carved gateways.", "Northern Gateway":"A richly carved torana gateway depicting Buddhist themes.", "Ashoka Pillar":"The remains of a pillar associated with Emperor Ashoka.", "Monastery Ruins":"Archaeological remains of monastic buildings at the site."},
  "hampi": {
    "Virupaksha Temple":"A major temple in Hampi, still an important place of worship.",
    "Hampi Bazaar":"A historic market street near the Virupaksha Temple.",
    "Stone Chariot":"An iconic stone chariot structure at the Vittala Temple complex.",
    "Lotus Mahal":"An elegant palace structure in the Zenana Enclosure."
  }
};

export default function SiteDetailPage() {
  const params = useParams<{slug:string}>();
  const site = sites.find(s => s.id === params.slug);
  const [saved, setSaved] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState("");
  const ranked = useMemo(() => site ? [...site.routes].sort((a,b)=>routeScore(a)-routeScore(b)) : [], [site]);
  if (!site) return <main className="app-shell"><SiteHeader/><div className="empty-state detail-not-found">Heritage site not found. <Link href="/explore">Explore destinations</Link></div></main>;
  const crowdLabel = (v:number) => v < 35 ? "Low crowd" : v < 65 ? "Moderate crowd" : "High crowd";
  const crowdClass = (v:number) => v < 35 ? "low" : v < 65 ? "medium" : "high";

  return <main className="app-shell">
    <SiteHeader/>
    <div className="detail-breadcrumb"><Link href="/explore"><ArrowLeft size={14}/> All destinations</Link><span>/</span>{site.name}</div>
    <section className="detail-hero">
      <div className="detail-cover" style={{backgroundImage:`url(${site.image})`}}><span>{site.category}</span></div>
      <div className="detail-intro"><span className="eyebrow">DESTINATION GUIDE</span><h1>{site.name}</h1><p className="detail-location"><MapPin size={16}/>{site.city}, {site.state}, India</p><p>{site.description} Explore key visitor points, compare sample routes and plan your visit.</p>
        <div className="detail-actions"><Link className="primary-button" href={`/planner?site=${site.id}`}>Plan my route <ArrowRight size={16}/></Link><button className={`save-button ${saved?"saved":""}`} onClick={()=>setSaved(!saved)}><Heart size={16} fill={saved?"currentColor":"none"}/>{saved?"Saved":"Save place"}</button></div>
        {saved && <span className="saved-hint">Saved for this browser session.</span>}
      </div>
    </section>
    <section className="detail-stats">
      <div><span className="stat-icon"><Landmark size={17}/></span><strong>{site.locations.length}</strong><span>Visitor points</span></div>
      <div><span className="stat-icon"><RouteIcon size={17}/></span><strong>{site.routes.length}</strong><span>Sample route options</span></div>
      <div><span className="stat-icon"><Clock3 size={17}/></span><strong>{Math.min(...site.routes.map(r=>r.minutes))} min</strong><span>Shortest sample walk</span></div>
      <div><Users/><strong>{crowdLabel(Math.min(...site.routes.map(r=>r.crowd)))}</strong><span>Lowest sample crowd</span></div>
    </section>
    <section className="section detail-section">
      <div className="section-heading"><div><span className="eyebrow">DISCOVER THE PLACE</span><h2>Visitor points & landmarks</h2><p>Click any place to open its information.</p></div></div>
      <div className="landmark-grid">{site.locations.map((point,i)=><button key={point} className={`landmark-card ${selectedPoint===point?"active":""}`} onClick={()=>setSelectedPoint(selectedPoint===point?"":point)}><span className="landmark-index">{String(i+1).padStart(2,"0")}</span><span className="landmark-card-icon"><MapPin/></span><strong>{point}</strong><small>View information <ArrowRight size={13}/></small></button>)}</div>
      {selectedPoint && <div className="landmark-info"><div className="landmark-info-title"><Info/><div><span className="eyebrow">PLACE INFORMATION</span><h3>{selectedPoint}</h3></div></div><p>{details[site.id]?.[selectedPoint] || `Explore ${selectedPoint} as part of your visit to ${site.name}. Follow official visitor signs and staff instructions.`}</p><div className="info-tags"><span><Camera size={13}/> Photo opportunity may be available</span><span><Accessibility size={13}/> Check accessibility on site</span></div></div>}
    </section>
    <section className="section detail-section">
      <div className="section-heading"><div><span className="eyebrow">FIND YOUR WAY</span><h2>Destination map</h2><p>Map marker shows the approximate destination centre, not surveyed internal paths.</p></div></div>
      <div className="detail-map"><HeritageMap sites={[site]} selectedId={site.id} onSelect={()=>{}}/></div>
    </section>
    <section className="section detail-section">
      <div className="section-heading"><div><span className="eyebrow">CROWD-AWARE ROUTES</span><h2>Suggested walking routes</h2><p>Compare the sample routes for distance, time, crowd and safety score.</p></div></div>
      <div className="detail-route-grid">{ranked.map((route,i)=><article className="route-card" key={route.id}><div className="route-card-top"><div><span className="route-kicker">{i===0?"RECOMMENDED OPTION":`OPTION ${i+1}`}</span><h3>{route.name}</h3></div><span className={`crowd-pill ${crowdClass(route.crowd)}`}>{crowdLabel(route.crowd)}</span></div><div className="route-metrics"><span><RouteIcon size={15}/>{route.distance} m</span><span><Clock3 size={15}/>{route.minutes} min</span><span><ShieldCheck size={15}/>{route.safetyRisk<10?"Lower risk":"Review safety"}</span></div><div className="crowd-bar"><span className={crowdClass(route.crowd)} style={{width:`${route.crowd}%`}}/></div><div className="route-bottom"><span>Illustrative crowd index: {route.crowd}/100</span>{i===0&&<b className="recommended-label">BEST SCORE</b>}</div></article>)}</div>
    </section>
    <div className="demo-disclaimer"><Bell size={14}/> Crowd levels, walking distances and times are sample project data. They are not live readings or verified directions. Confirm access and safety information with site authorities.</div>
    <footer><Link className="brand footer-brand" href="/"><span className="brand-mark"><Landmark size={18}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link><span>Educational prototype</span></footer>
  </main>;
}
