export type Route = {
  id: string; name: string; distance: number; minutes: number;
  crowd: number; safetyRisk: number;
};
export type Site = {
  id: string; name: string; city: string; state: string; category: string;
  description: string; image: string; lat: number; lng: number; locations: string[]; routes: Route[];
};

export const sites: Site[] = [
  {
    id: "golden-temple", name: "Golden Temple", city: "Amritsar", state: "Punjab",
    category: "Religious heritage",
    description: "Explore the Harmandir Sahib complex, its sacred pool and surrounding visitor areas.",
    image: "https://images.unsplash.com/photo-1588096344356-9b4b8c5f5a4e?auto=format&fit=crop&w=1200&q=85",
    lat: 31.6200, lng: 74.8765,
    locations: ["Main Clock Tower Entrance", "Darbar Sahib", "Amrit Sarovar", "Akal Takht"],
    routes: [
      { id: "gt-a", name: "Main Complex Walk", distance: 500, minutes: 20, crowd: 78, safetyRisk: 10 },
      { id: "gt-b", name: "Sarovar Side Path", distance: 700, minutes: 15, crowd: 22, safetyRisk: 5 },
      { id: "gt-c", name: "Central Parikrama", distance: 600, minutes: 18, crowd: 48, safetyRisk: 5 }
    ]
  },
  {
    id: "jallianwala-bagh", name: "Jallianwala Bagh", city: "Amritsar", state: "Punjab",
    category: "Memorial",
    description: "Visit the memorial garden and learn about an important chapter in India's history.",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85",
    lat: 31.6206, lng: 74.8803,
    locations: ["Main Entrance", "Martyrs' Well", "Memorial Flame", "Gallery"],
    routes: [
      { id: "jb-a", name: "Memorial Loop", distance: 350, minutes: 12, crowd: 35, safetyRisk: 5 },
      { id: "jb-b", name: "Garden Walk", distance: 450, minutes: 15, crowd: 18, safetyRisk: 5 }
    ]
  },
  {
    id: "taj-mahal", name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh",
    category: "Monument",
    description: "Discover the marble mausoleum, formal gardens and historic complex.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    lat: 27.1751, lng: 78.0421,
    locations: ["Main Gate", "Charbagh Garden", "Main Mausoleum", "Mosque"],
    routes: [
      { id: "taj-a", name: "Main Garden Axis", distance: 650, minutes: 22, crowd: 72, safetyRisk: 5 },
      { id: "taj-b", name: "Garden Side Walk", distance: 800, minutes: 20, crowd: 28, safetyRisk: 5 },
      { id: "taj-c", name: "Outer Complex Path", distance: 900, minutes: 26, crowd: 42, safetyRisk: 8 }
    ]
  },
  {
    id: "red-fort", name: "Red Fort", city: "Delhi", state: "Delhi",
    category: "Fort",
    description: "Explore the historic fort, ceremonial gates and Mughal-era halls.",
    image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=1200&q=85",
    lat: 28.6562, lng: 77.2410,
    locations: ["Lahori Gate", "Chhatta Chowk", "Diwan-i-Aam", "Diwan-i-Khas"],
    routes: [
      { id: "rf-a", name: "Main Visitor Path", distance: 750, minutes: 25, crowd: 68, safetyRisk: 8 },
      { id: "rf-b", name: "Palace Courtyard Route", distance: 900, minutes: 27, crowd: 30, safetyRisk: 5 },
      { id: "rf-c", name: "Outer Rampart Walk", distance: 1100, minutes: 32, crowd: 45, safetyRisk: 12 }
    ]
  },
  {
    id: "qutub-minar", name: "Qutub Minar", city: "Delhi", state: "Delhi",
    category: "Monument",
    description: "Walk through the Qutub archaeological complex and its historic monuments.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85",
    lat: 28.5245, lng: 77.1855,
    locations: ["Qutub Minar", "Iron Pillar", "Quwwat-ul-Islam Mosque", "Alai Darwaza"],
    routes: [
      { id: "qm-a", name: "Central Monument Loop", distance: 500, minutes: 18, crowd: 62, safetyRisk: 5 },
      { id: "qm-b", name: "Garden Perimeter Path", distance: 700, minutes: 20, crowd: 25, safetyRisk: 5 }
    ]
  },
  {
    id: "hampi", name: "Hampi", city: "Vijayanagara", state: "Karnataka",
    category: "Archaeological landscape",
    description: "Explore the temple district, stone monuments and royal-era remains of Hampi.",
    image: "https://images.unsplash.com/photo-1600100397608-f0107d7f3f2b?auto=format&fit=crop&w=1200&q=85",
    lat: 15.3350, lng: 76.4600,
    locations: ["Virupaksha Temple", "Hampi Bazaar", "Stone Chariot", "Lotus Mahal"],
    routes: [
      { id: "ha-a", name: "Temple Bazaar Walk", distance: 900, minutes: 28, crowd: 55, safetyRisk: 8 },
      { id: "ha-b", name: "Riverside Heritage Path", distance: 1200, minutes: 30, crowd: 25, safetyRisk: 5 },
      { id: "ha-c", name: "Royal Enclosure Route", distance: 1500, minutes: 42, crowd: 38, safetyRisk: 10 }
    ]
  }
,
  {
    id: "india-gate", name: "India Gate", city: "New Delhi", state: "Delhi",
    category: "War memorial", description: "Visit the iconic war memorial on Kartavya Path and explore the landscaped public avenue around it.",
    image: "https://images.unsplash.com/photo-1597040663341-45b6af3d91a?auto=format&fit=crop&w=1200&q=85",
    lat: 28.6129, lng: 77.2295, locations: ["India Gate Arch", "Amar Jawan Jyoti Area", "Kartavya Path", "Central Lawns"],
    routes: [{ id: "ig-a", name: "Memorial and Lawns Walk", distance: 650, minutes: 18, crowd: 48, safetyRisk: 5 }, { id: "ig-b", name: "Kartavya Path Loop", distance: 900, minutes: 24, crowd: 25, safetyRisk: 5 }]
  },
  {
    id: "amer-fort", name: "Amer Fort", city: "Amer, Jaipur", state: "Rajasthan",
    category: "Hill fort", description: "Explore the hilltop fort known for its courtyards, gateways, palaces and views over Maota Lake.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85",
    lat: 26.9855, lng: 75.8513, locations: ["Suraj Pol", "Jaleb Chowk", "Diwan-i-Aam", "Sheesh Mahal"],
    routes: [{ id: "af-a", name: "Courtyard Heritage Walk", distance: 800, minutes: 28, crowd: 60, safetyRisk: 8 }, { id: "af-b", name: "Palace Highlights Route", distance: 650, minutes: 22, crowd: 32, safetyRisk: 5 }]
  },
  {
    id: "mysore-palace", name: "Mysore Palace", city: "Mysuru", state: "Karnataka",
    category: "Royal palace", description: "Discover the grand royal residence, ornate halls and Indo-Saracenic architecture of Mysuru.",
    image: "https://images.unsplash.com/photo-1600112356915-089534e3a2e5?auto=format&fit=crop&w=1200&q=85",
    lat: 12.3052, lng: 76.6552, locations: ["Main Palace Gate", "Durbar Hall", "Kalyana Mantapa", "Palace Courtyard"],
    routes: [{ id: "mp-a", name: "Royal Hall Route", distance: 550, minutes: 20, crowd: 52, safetyRisk: 5 }, { id: "mp-b", name: "Courtyard and Gallery Walk", distance: 700, minutes: 24, crowd: 28, safetyRisk: 5 }]
  },
  {
    id: "konark-sun-temple", name: "Konark Sun Temple", city: "Konark", state: "Odisha",
    category: "Temple monument", description: "Explore the 13th-century Sun Temple, celebrated for its monumental chariot form and stone carvings.",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbbf3b?auto=format&fit=crop&w=1200&q=85",
    lat: 19.8876, lng: 86.0945, locations: ["Main Temple Platform", "Natya Mandapa", "Jagamohana", "Carved Stone Wheels"],
    routes: [{ id: "ks-a", name: "Temple Architecture Loop", distance: 500, minutes: 18, crowd: 40, safetyRisk: 5 }, { id: "ks-b", name: "Outer Sculpture Walk", distance: 750, minutes: 23, crowd: 22, safetyRisk: 5 }]
  },
  {
    id: "ajanta-caves", name: "Ajanta Caves", city: "Aurangabad region", state: "Maharashtra",
    category: "Rock-cut caves", description: "Discover Buddhist rock-cut caves renowned for their ancient murals, sculptures and monastic architecture.",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=85",
    lat: 20.5519, lng: 75.7033, locations: ["Cave 1", "Cave 2", "Cave 16", "Cave 26"],
    routes: [{ id: "ac-a", name: "Main Cave Highlights", distance: 900, minutes: 35, crowd: 55, safetyRisk: 10 }, { id: "ac-b", name: "Gallery and Cave Trail", distance: 1200, minutes: 42, crowd: 28, safetyRisk: 8 }]
  },
  {
    id: "ellora-caves", name: "Ellora Caves", city: "Verul", state: "Maharashtra",
    category: "Rock-cut caves", description: "Explore Buddhist, Hindu and Jain monuments carved into the Charanandri hills.",
    image: "https://images.unsplash.com/photo-1626014303757-1b5f2f2c6a4b?auto=format&fit=crop&w=1200&q=85",
    lat: 20.0268, lng: 75.1790, locations: ["Kailasa Temple", "Cave 10", "Cave 16 Courtyard", "Jain Caves"],
    routes: [{ id: "ec-a", name: "Kailasa Temple Circuit", distance: 700, minutes: 28, crowd: 62, safetyRisk: 8 }, { id: "ec-b", name: "Three Traditions Trail", distance: 1300, minutes: 45, crowd: 30, safetyRisk: 8 }]
  },
  {
    id: "khajuraho", name: "Khajuraho Group of Monuments", city: "Khajuraho", state: "Madhya Pradesh",
    category: "Temple complex", description: "Visit the celebrated temple group known for intricate stone carvings and Nagara-style architecture.",
    image: "https://images.unsplash.com/photo-1609948543911-7f01ff385be?auto=format&fit=crop&w=1200&q=85",
    lat: 24.8318, lng: 79.9199, locations: ["Kandariya Mahadeva Temple", "Lakshmana Temple", "Devi Jagadambi Temple", "Eastern Group"],
    routes: [{ id: "kh-a", name: "Western Group Highlights", distance: 650, minutes: 25, crowd: 45, safetyRisk: 5 }, { id: "kh-b", name: "Temple Group Explorer", distance: 1100, minutes: 38, crowd: 24, safetyRisk: 5 }]
  },
  {
    id: "charminar", name: "Charminar", city: "Hyderabad", state: "Telangana",
    category: "Historic monument", description: "Explore Hyderabad's landmark monument and the historic lanes and markets of the old city.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
    lat: 17.3616, lng: 78.4747, locations: ["Charminar Plaza", "Mecca Masjid", "Laad Bazaar", "Chowmahalla Palace"],
    routes: [{ id: "ch-a", name: "Old City Heritage Walk", distance: 850, minutes: 30, crowd: 72, safetyRisk: 10 }, { id: "ch-b", name: "Monument and Bazaar Route", distance: 700, minutes: 27, crowd: 42, safetyRisk: 8 }]
  },
  {
    id: "victoria-memorial", name: "Victoria Memorial", city: "Kolkata", state: "West Bengal",
    category: "Memorial and museum", description: "Explore the white-marble memorial, museum galleries and landscaped gardens in central Kolkata.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=85",
    lat: 22.5448, lng: 88.3426, locations: ["Main Memorial", "Museum Galleries", "North Gate", "Garden Promenade"],
    routes: [{ id: "vm-a", name: "Memorial and Gallery Walk", distance: 600, minutes: 25, crowd: 48, safetyRisk: 5 }, { id: "vm-b", name: "Garden Promenade Route", distance: 850, minutes: 28, crowd: 25, safetyRisk: 5 }]
  },
  {
    id: "sanchi-stupa", name: "Sanchi Stupa", city: "Sanchi", state: "Madhya Pradesh",
    category: "Buddhist heritage", description: "Discover the Great Stupa and its carved gateways, monasteries and Buddhist monuments.",
    image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1200&q=85",
    lat: 23.4793, lng: 77.7397, locations: ["Great Stupa", "Northern Gateway", "Ashoka Pillar", "Monastery Ruins"],
    routes: [{ id: "ss-a", name: "Great Stupa Circuit", distance: 550, minutes: 22, crowd: 35, safetyRisk: 5 }, { id: "ss-b", name: "Full Monument Trail", distance: 1000, minutes: 35, crowd: 18, safetyRisk: 5 }]
  }

];

export function routeScore(route: Route) {
  // Demo heuristic: lower score is better. Values are normalized to a 0–100 scale.
  const distanceScore = Math.min(route.distance / 15, 100);
  const timeScore = Math.min(route.minutes / 0.6, 100);
  return distanceScore * 0.25 + route.crowd * 0.35 + timeScore * 0.2 + route.safetyRisk * 0.2;
}
