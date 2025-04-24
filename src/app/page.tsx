import { UserPortfolio } from "@/components/portfolio/user-portfolio";

export default async function Home() {
  const response = await fetch(
    "https://v0nr8pvsvgywhlm4.public.blob.vercel-storage.com/careminds/portfolio-j6Xaknu4XzSzazvXTjaNiYgFDx8yv8.json"
  );
  const portfolio = await response.json();

  return (
    <div className="flex justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-white">
      <UserPortfolio userPortfolio={portfolio} />
    </div>
  );
}
