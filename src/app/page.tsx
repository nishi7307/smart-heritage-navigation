"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Compass, MapPin, Search, ShieldCheck, Users, Landmark, Route as RouteIcon, Clock3, LogIn } from "lucide-react";
import { sites, routeScore } from "@/lib/data";

export default function Home() {
  const [search, setSearch] = useState("");
  const visibleSites = useMemo(() => sites.filter((site) =>
    `${site.name} ${site.city} ${site.state}`.toLowerCase().includes(search.toLowerCase())
  ), [search]);
  const totalPoints = sites.reduce((sum, site) => sum + site.locations.length, 0);

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/"><span className="brand-mark"><Landmark size={20}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link>
        <nav>
          <Link href="/explore">Explore</Link><Link href="/planner">Route planner</Link><Link href="/alerts">Alerts</Link><Link href="/about">About</Link>
        </nav>
        <div className="nav-actions"><Link className="admin-button" href="/login"><LogIn size={15}/> Sign in</Link><Link className="primary-button nav-join" href="/register">Create account</Link></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot"/> DISCOVER INDIA, WITHOUT THE CROWD</div>
          <h1>Every journey has a <em>smarter path.</em></h1>
          <p>Explore India's remarkable heritage sites with interactive maps, visitor information and crowd-aware route suggestions.</p>
          <Link className="primary-button" href="/explore">Explore heritage sites <ArrowRight size={17}/></Link>
          <div className="hero-stats"><div><strong>{String(sites.length).padStart(2,"0")}</strong><span>Heritage sites</span></div><div><strong>{totalPoints}+</strong><span>Visitor points</span></div><div><strong>Smart</strong><span>Route suggestions</span></div></div>
        </div>
        <div className="hero-art">
          <div className="hero-image" role="img" aria-label="Taj Mahal at sunrise"/>
          <div className="floating-card"><span className="floating-icon"><Compass size={18}/></span><div><strong>Find your path</strong><small>Explore at your own pace</small></div><ArrowRight size={17}/></div>
          <div className="image-caption">INDIA · A LAND OF LIVING HISTORY</div>
        </div>
      </section>

      <section className="section" id="explore">
        <div className="section-heading"><div><span className="eyebrow">CURATED DESTINATIONS</span><h2>Explore heritage sites</h2><p>Select a place to open its full visitor guide, landmarks, crowd status and suggested routes.</p></div><div className="search-box"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sites or cities"/></div></div>
        <div className="site-grid">
          {visibleSites.map((site) => {
            const best = [...site.routes].sort((a,b) => routeScore(a)-routeScore(b))[0];
            return <Link key={site.id} href={`/sites/${site.id}`} className="site-card">
              <span className="site-thumb" style={{backgroundImage:`url(${site.image})`}}><span>{site.category}</span></span>
              <span className="site-card-content"><strong>{site.name}</strong><small><MapPin size={13}/>{site.city}, {site.state}</small><span className="site-card-footer">{site.locations.length} visitor points <ArrowRight size={15}/></span><span className="site-card-extra"><ShieldCheck size={13}/> Suggested route: {best.minutes} min · {best.crowd < 35 ? "Low" : best.crowd < 65 ? "Moderate" : "High"} crowd</span></span>
            </Link>;
          })}
        </div>
        {visibleSites.length === 0 && <div className="empty-state">No heritage sites match that search. Try another name or city.</div>}
      </section>

      <section className="feature-strip">
        <div><span className="feature-icon"><RouteIcon/></span><strong>Smart route planning</strong><p>Compare routes by distance, walking time and sample crowd level.</p></div>
        <div><span className="feature-icon"><Compass/></span><strong>Interactive maps</strong><p>Explore destination markers and visitor points on a map.</p></div>
        <div><span className="feature-icon"><Users/></span><strong>Visitor-friendly tools</strong><p>Save places, view alerts and prepare a simple itinerary.</p></div>
      </section>

      <section className="cta-band" id="about"><div><span className="eyebrow">TRAVEL THOUGHTFULLY</span><h2>Discover more. Queue less. Explore safely.</h2><p>Plan a visit with useful destination details and crowd-aware route suggestions.</p></div><Link href="/register" className="light-button">Join HeritageWay <ArrowRight size={16}/></Link></section>
      <footer><Link className="brand footer-brand" href="/"><span className="brand-mark"><Landmark size={18}/></span><span>Heritage<span className="brand-accent">Way</span><small>SMART HERITAGE NAVIGATION</small></span></Link><span>Educational prototype · Verify local conditions before travel</span></footer>
    </main>
  );
}
