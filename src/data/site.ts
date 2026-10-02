import about from "../assets/images/about.webp";
import about1 from "../assets/images/about1.webp";
import about2 from "../assets/images/about2.webp";
import hero from "../assets/images/hero.webp";
import proj1 from "../assets/images/proj1.png";
import proj2 from "../assets/images/proj2.png";
import proj3 from "../assets/images/proj3.png";

export const site = {
  name: "Archovia",
  url: "https://www.archovia.com",
  email: "info@archovia.com",
  tagline: "Hayal ettiğiniz yaşam alanları arasında duygusal bir bağ kuruyoruz.",
  description:
    "Archovia — mimarlık, iç mimarlık ve ürün tasarımında yenilikçi, sürdürülebilir ve zamansız mekânlar.",
  founded: "2024",
  // Set to a form backend (Formspree, Basin, etc.) to receive submissions.
  // Left empty, the contact form falls back to opening the visitor's email client.
  formEndpoint: "",
};

export const nav = [
  { href: "/about.html", label: "Hakkımızda", index: "01" },
  { href: "/services.html", label: "Hizmetler", index: "02" },
  { href: "/portfolio.html", label: "Projeler", index: "03" },
  { href: "/contact.html", label: "İletişim", index: "04" },
];

export const images = { about, about1, about2, hero };

export const services = [
  {
    no: "01",
    title: "Mimari Tasarım",
    body: "Konut ve ticari yapılar için konseptten uygulama projesine kadar bütüncül mimari tasarım.",
  },
  {
    no: "02",
    title: "İç Mimarlık",
    body: "Işık, malzeme ve dolaşımı birlikte düşünen; estetik ile işlevi aynı yöne çeken iç mekânlar.",
  },
  {
    no: "03",
    title: "Danışmanlık",
    body: "Arazi analizinden ruhsat sürecine kadar, her kararı gerekçesiyle anlatan şeffaf danışmanlık.",
  },
  {
    no: "04",
    title: "Sürdürülebilir Çözümler",
    body: "Enerji verimliliği ve yerel malzemeyle uzun ömürlü, bakımı kolay yaşam alanları.",
  },
];

export const projects = [
  { no: "01", title: "Kırık Çatı Evi", type: "Konut", year: "2024", image: proj1 },
  { no: "02", title: "Avlu Pavyonu", type: "Kamusal", year: "2024", image: proj2 },
  { no: "03", title: "Beton Kabuk", type: "Ticari", year: "2025", image: proj3 },
];

export const products = [
  { title: "Bungalovlar", video: "/videos/bungalow.mp4" },
  { title: "Masa & Sandalye", video: "/videos/chairntable.mp4" },
  { title: "Duvar Sanatı", video: "/videos/walldecor.mp4" },
];
