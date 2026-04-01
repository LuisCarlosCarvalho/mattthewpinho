export type ProjectCategory = "Football" | "Portraits" | "Athletics" | "Motorsport";

export interface TechSpecs {
  camera: string;
  lens: string;
  iso: string;
  shutter: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  blurDataURL: string;
  behindTheLens?: string;
  techSpecs?: TechSpecs;
  gallery?: string[];
  nextProjectSlug?: string;
}

const darkPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export const projects: Project[] = [
  {
    id: "1",
    slug: "selecao-nacional-sub19-feminino",
    title: "Seleção Nacional Sub-19 Feminino🇵🇹",
    description: "2026",
    category: "Football",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/632ed1aa-5c30-48d1-9538-7adc0075d3c5_car_202x158.jpg?h=9e6297371ff4dada20bec86a76558a3d",
    blurDataURL: darkPlaceholder,
    behindTheLens: "Shooting the national under-19 women's team required immense focus to capture their raw passion and determination. I positioned myself near the field level to ensure the dramatic depth of field would elevate the intensity of every tackle and sprint. The pouring rain added to the cinematic mood, demanding high shutter speeds to freeze the water droplets mid-air.",
    techSpecs: { camera: "Sony A1", lens: "Sony FE 400mm f/2.8 GM OSS", iso: "ISO 3200", shutter: "1/2000s" },
    gallery: [
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/4430cfba-9320-4520-a2e4-9f7bf3ee3870_car_202x158.jpg?h=a4eb2796b9a22baf24f73e838016c726",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/a9da4261-f1f5-4758-9e9d-dede6bf4b83f_car_202x158.jpeg?h=091aaefc43e8f7ff8ab7bca6f1f40be8",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/632ed1aa-5c30-48d1-9538-7adc0075d3c5_car_202x158.jpg?h=9e6297371ff4dada20bec86a76558a3d"
    ],
    nextProjectSlug: "liga-bpi-albergaria-scbraga"
  },
  {
    id: "2",
    slug: "liga-bpi-albergaria-scbraga",
    title: "Liga BPI - Albergaria vs SCBraga",
    description: "2024",
    category: "Football",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/4430cfba-9320-4520-a2e4-9f7bf3ee3870_car_202x158.jpg?h=a4eb2796b9a22baf24f73e838016c726",
    blurDataURL: darkPlaceholder,
    behindTheLens: "A highly tactical match between Albergaria and SCBraga in the Liga BPI. Capturing the tension and fast-paced exchanges on the pitch was a thrilling challenge.",
    techSpecs: { camera: "Sony A9 II", lens: "Sony FE 70-200mm f/2.8 GM II", iso: "ISO 2000", shutter: "1/1600s" },
    gallery: [
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/632ed1aa-5c30-48d1-9538-7adc0075d3c5_car_202x158.jpg?h=9e6297371ff4dada20bec86a76558a3d",
      "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/4430cfba-9320-4520-a2e4-9f7bf3ee3870_car_202x158.jpg?h=a4eb2796b9a22baf24f73e838016c726"
    ],
    nextProjectSlug: "3-liga-sanjoanense-paredes"
  },
  {
    id: "3",
    slug: "3-liga-sanjoanense-paredes",
    title: "3 Liga - AD Sanjoanense vs UC Paredes",
    description: "2026",
    category: "Football",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/a9da4261-f1f5-4758-9e9d-dede6bf4b83f_car_202x158.jpeg?h=091aaefc43e8f7ff8ab7bca6f1f40be8",
    blurDataURL: darkPlaceholder,
    behindTheLens: "Capturing the raw essence of grassroots football. The third league games have a special intimacy and grit you don't always find in stadium environments.",
    techSpecs: { camera: "Sony A1", lens: "Sony FE 135mm f/1.8 GM", iso: "ISO 400", shutter: "1/1000s" },
    gallery: [],
    nextProjectSlug: "portrait-photography-pt-ch"
  },
  {
    id: "4",
    slug: "portrait-photography-pt-ch",
    title: "PORTRAIT PHOTOGRAPHY 🇵🇹🇨🇭",
    description: "2024",
    category: "Portraits",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/ed3272df-0b1b-4061-b0dc-7c054ecec8b6_rwc_0x777x1336x1044x1336.jpg?h=2bd6a6ba863da2fdf57fb2d92e2b135b",
    blurDataURL: darkPlaceholder,
    behindTheLens: "Connecting with athletes off the field. A series focused on portraying the mental state and the silent resilience behind closed doors.",
    techSpecs: { camera: "Medium Format", lens: "80mm f/1.9", iso: "ISO 100", shutter: "1/200s" },
    gallery: [],
    nextProjectSlug: "world-athletics-continental-tour"
  },
  {
    id: "5",
    slug: "world-athletics-continental-tour",
    title: "World Athletics - Continental Tour",
    description: "2024",
    category: "Athletics",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/ddd14936-4b50-48df-a7cc-42589b0470e8_rwc_0x570x1151x899x1151.jpg?h=39766322493c32eb006daf16bc821559",
    blurDataURL: darkPlaceholder,
    behindTheLens: "Athletics is pure, explosive motion. Capturing the tension before the sprinter block launch requires pristine timing and anticipation.",
    techSpecs: { camera: "Sony A9 III", lens: "Sony FE 300mm f/2.8 GM", iso: "ISO 12800", shutter: "1/4000s" },
    gallery: [],
    nextProjectSlug: "futsal-nacional"
  },
  {
    id: "6",
    slug: "futsal-nacional",
    title: "Futsal Nacional 🇵🇹",
    description: "2024",
    category: "Football",
    imageUrl: "https://cdn.myportfolio.com/84a10115-639a-4bad-97b6-2c339c170bbc/3b92a6fc-9915-4e3f-8404-3425d54afb29_rwc_0x576x1152x900x1152.jpg?h=2ef7af1ecbf476628a503ca7ae1485d5",
    blurDataURL: darkPlaceholder,
    behindTheLens: "Indoor sports photography is an exercise in managing terrible lighting while keeping up with ridiculously fast action. Futsal is unrelenting.",
    techSpecs: { camera: "Sony A1", lens: "Sony FE 50mm f/1.2 GM", iso: "ISO 6400", shutter: "1/1250s" },
    gallery: [],
    nextProjectSlug: "selecao-nacional-sub19-feminino"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
