import Image from "next/image";
//Components
import { lusitana } from "@/components/fonts";
import ProjectAdminWithText from "@/components/project-admin-logo";
import LastVersion from "@/components/home/LastVersion";
import { LoginButton } from "@/components/buttons-auth";
import { StatusSession } from "@/components/home/StatusSession";

export default function Page() {

  return (
    <main className="flex flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-primary p-4 md:h-28">
        <ProjectAdminWithText />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-around gap-6 rounded-lg bg-gray-50 px-6 py-4 md:w-2/5 md:px-20">
          <div className="flex flex-row items-center justify-between">
            <LastVersion />
            <StatusSession />
          </div>
          <p
            className={`${lusitana.className} text-xl md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Project Admin</strong>@beta version
            of the project.{" "}
            <a
              href="https://github.com/MatiasAndrada/nextjs-adminProject"
              className="text-primary hover:text-secondary transition-colors"
            >
              Built with next14, next-auth-v5, prisma ORM, typescript
            </a>
            , brought to you by Vercel.
          </p>
          <LoginButton />

        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-24 md:py-4">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            //add priority to images that are above the fold
            priority
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
            priority
          />
        </div>
      </div>
    </main>
  );
}
