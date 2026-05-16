/**
 * Lumen vanilla portfolio — TypeScript source.
 * Compile with: tsc app.ts --target es2020 --module none --outFile app.js
 * (A pre-built app.js sits next to this file for zero-build use.)
 */

export type Experience = { id: string; role: string; company: string; period: string; description: string };
export type Education = { id: string; degree: string; school: string; period: string };
export type Project = { id: string; title: string; tag: string; description: string; image: string; link: string };
export type Social = { id: string; label: string; url: string };

export type PortfolioData = {
  name: string;
  title: string;
  tagline: string;
  about: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  stats: { years: string; projects: string; clients: string };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  socials: Social[];
  theme: "light" | "dark";
};

// Default content mirrors src/lib/portfolio-data.ts
export const defaultData: PortfolioData = {
  name: "Ada Lumen",
  title: "Product Designer & Creative Developer",
  tagline: "I craft playful, bright interfaces with a touch of motion.",
  about:
    "Multidisciplinary designer-developer building joyful digital products. I blend bold color, considered typography and just-enough motion to make interfaces feel alive.",
  avatar: "",
  email: "hello@example.com",
  phone: "+1 555 010 1234",
  location: "Lisbon, Portugal",
  stats: { years: "6+", projects: "80+", clients: "30+" },
  experience: [
    { id: "e1", role: "Senior Product Designer", company: "Lumen Studio", period: "2023 — Now", description: "Leading design for consumer apps used by 200k+ people." },
    { id: "e2", role: "Frontend Developer", company: "Bright Labs", period: "2020 — 2023", description: "Shipped design systems and animated marketing sites." },
  ],
  education: [
    { id: "ed1", degree: "BSc Interaction Design", school: "Lisbon School of Arts", period: "2016 — 2020" },
  ],
  skills: ["Figma", "React", "Three.js", "Motion", "TypeScript", "Brand", "Illustration"],
  projects: [
    { id: "p1", title: "Sunny Banking", tag: "Fintech", description: "A bright, friendly mobile banking experience.", image: "", link: "#" },
    { id: "p2", title: "Bloom CMS", tag: "SaaS", description: "Editorial CMS with delightful micro-interactions.", image: "", link: "#" },
  ],
  socials: [
    { id: "s1", label: "Twitter", url: "https://twitter.com" },
    { id: "s2", label: "GitHub", url: "https://github.com" },
    { id: "s3", label: "Dribbble", url: "https://dribbble.com" },
  ],
  theme: "light",
};

/* The runtime implementation lives in app.js so the page works
   without a build step. Keep this .ts file as the typed source-of-truth
   when you compile or import the data shape into other tooling. */
