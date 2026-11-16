import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.alert.deleteMany();
  await prisma.crowdReport.deleteMany();
  await prisma.route.deleteMany();
  await prisma.location.deleteMany();
  await prisma.heritageSite.deleteMany();

  const sites = [
    {
      name: "Golden Temple", city: "Amritsar", state: "Punjab",
      category: "Religious heritage",
      description: "The Harmandir Sahib, widely known as the Golden Temple, is a major Sikh place of worship.",
      latitude: 31.6200, longitude: 74.8765,
      locations: ["Main Clock Tower Entrance", "Darbar Sahib", "Amrit Sarovar", "Akal Takht"],
      routes: [
        ["Main Complex Walk", 500, 20, 78, 10],
        ["Sarovar Side Path", 700, 15, 22, 5],
        ["Central Parikrama", 600, 18, 48, 5]
      ]
    },
    {
      name: "Jallianwala Bagh", city: "Amritsar", state: "Punjab",
      category: "Memorial",
      description: "A public garden and memorial commemorating the 1919 massacre.",
      latitude: 31.6206, longitude: 74.8803,
      locations: ["Main Entrance", "Martyrs' Well", "Memorial Flame", "Gallery"],
      routes: [
        ["Memorial Loop", 350, 12, 35, 5],
        ["Garden Walk", 450, 15, 18, 5]
      ]
    },
    {
      name: "Taj Mahal", city: "Agra", state: "Uttar Pradesh",
      category: "Monument",
      description: "A UNESCO World Heritage mausoleum commissioned by Mughal emperor Shah Jahan.",
      latitude: 27.1751, longitude: 78.0421,
      locations: ["Main Gate", "Charbagh Garden", "Main Mausoleum", "Mosque"],
      routes: [
        ["Main Garden Axis", 650, 22, 72, 5],
        ["Garden Side Walk", 800, 20, 28, 5],
        ["Outer Complex Path", 900, 26, 42, 8]
      ]
    },
    {
      name: "Red Fort", city: "Delhi", state: "Delhi",
      category: "Fort",
      description: "A historic Mughal fort complex in Old Delhi.",
      latitude: 28.6562, longitude: 77.2410,
      locations: ["Lahori Gate", "Chhatta Chowk", "Diwan-i-Aam", "Diwan-i-Khas"],
      routes: [
        ["Main Visitor Path", 750, 25, 68, 8],
        ["Palace Courtyard Route", 900, 27, 30, 5],
        ["Outer Rampart Walk", 1100, 32, 45, 12]
      ]
    },
    {
      name: "Qutub Minar", city: "Delhi", state: "Delhi",
      category: "Monument",
      description: "A medieval minaret and surrounding archaeological complex.",
      latitude: 28.5245, longitude: 77.1855,
      locations: ["Qutub Minar", "Iron Pillar", "Quwwat-ul-Islam Mosque", "Alai Darwaza"],
      routes: [
        ["Central Monument Loop", 500, 18, 62, 5],
        ["Garden Perimeter Path", 700, 20, 25, 5]
      ]
    },
    {
      name: "Hampi", city: "Vijayanagara", state: "Karnataka",
      category: "Archaeological landscape",
      description: "A historic landscape of temples, royal structures and the Vijayanagara-era ruins.",
      latitude: 15.3350, longitude: 76.4600,
      locations: ["Virupaksha Temple", "Hampi Bazaar", "Stone Chariot", "Lotus Mahal"],
      routes: [
        ["Temple Bazaar Walk", 900, 28, 55, 8],
        ["Riverside Heritage Path", 1200, 30, 25, 5],
        ["Royal Enclosure Route", 1500, 42, 38, 10]
      ]
    }
  ]

  for (const site of sites) {
    const created = await prisma.heritageSite.create({
      data: {
        name: site.name, city: site.city, state: site.state,
        category: site.category, description: site.description,
        latitude: site.latitude, longitude: site.longitude,
        locations: { create: site.locations.map((name) => ({
          name, description: `Visitor point at ${site.name}`,
          latitude: site.latitude, longitude: site.longitude
        })) },
        routes: { create: site.routes.map(([name, distanceMetres, estimatedMins, crowdLevel, safetyRisk]) => ({
          name: String(name), distanceMetres: Number(distanceMetres),
          estimatedMins: Number(estimatedMins), crowdLevel: Number(crowdLevel),
          safetyRisk: Number(safetyRisk)
        })) }
      }
    });
    const firstLocation = await prisma.location.findFirst({ where: { siteId: created.id } });
    if (firstLocation) {
      await prisma.crowdReport.create({
        data: { locationId: firstLocation.id, level: 35, source: "DEMO_SEED" }
      });
    }
  }
}

main().catch((error) => { console.error(error); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
