
import { UserPortfolio } from "@/components/portfolio/user-portfolio";

export default async function Home() {

  const response = await fetch("https://v0nr8pvsvgywhlm4.public.blob.vercel-storage.com/careminds/portfolio-j6Xaknu4XzSzazvXTjaNiYgFDx8yv8.json");
  const portfolio = await response.json();

  console.log(portfolio);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main >
        <UserPortfolio />
      </main>
    </div>
  );
}
