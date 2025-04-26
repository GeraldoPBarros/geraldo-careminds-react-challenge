import { LogoutButton } from "@/components/portfolio/logout-button";
import { UserPortfolio } from "@/components/portfolio/user-portfolio";

export default async function Portfolio() {
  const response = await fetch(
    "https://v0nr8pvsvgywhlm4.public.blob.vercel-storage.com/careminds/portfolio-j6Xaknu4XzSzazvXTjaNiYgFDx8yv8.json"
  );
  const portfolio = await response.json();

  if (!response.ok) {
    return <>Error fetching data!</>;
  }

  return (
    <div className="flex flex-col justify-items-center w-full min-h-screen font-[family-name:var(--font-geist-sans)] bg-white relative">
      <div className="flex text-white min-w-full text-center h-16 items-center justify-center bg-gray-900">
        <div className="w-[1260px] flex justify-between">
          <label className="flex text-left text-3xl font-bold ml-32">
            Investment Portfolio
          </label>
          <LogoutButton />
        </div>
      </div>
      <UserPortfolio userPortfolio={portfolio} />
    </div>
  );
}
