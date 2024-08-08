//Components
import { IconWithText } from "@/components/logo";
import ThemeToggle from "@/components/ThemeToggle";
import { lusitana } from "@/components/fonts";
import LastVersion from "@/components/home/LastVersion";
import { LoginButton } from "@/components/buttons-auth";
import { StatusSession } from "@/components/home/StatusSession";
import FadeImages from "@/components/home/Carousel";

export default function Page() {
  return (
    <main className="h-screen flex flex-col  p-6">
      <div className="flex h-20 shrink-0 items-end justify-between rounded-lg bg-primary p-4 md:h-28">
        <IconWithText />
        <ThemeToggle />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:gap-12 md:flex-row">
        <div className="flex flex-col justify-around gap-6 rounded-lg bg-gray-50 dark:bg-slate-800 px-6 py-4 md:w-2/5 md:px-20">
          <div className="flex flex-row items-center justify-between">
            <LastVersion />
            <StatusSession />
          </div>
          <p
            className={`${lusitana.className} text-xl md:text-3xl md:leading-noral `}
          >
            <strong>Welcome to Project Admin</strong>@beta version of the
            project.{" "}
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
        <div className="flex items-center justify-center md:w-3/5 md:px-20 md:py-4 relative">
          <div className="absolute w-full	h-full top-0 right-4 bg-gradient-to-r from-blue-500/75 dark:from-blue-900/75 via-transparent to-sky-500/75  dark:to-sky-900/75 blur-xl"></div>
          <img
            src="/gradients/gradient (1).png"
            alt="background"
            className="rounded-lg p-16 absolute w-full h-full top-0 left-0 object-cover blur-xl"
          />
          <FadeImages />
        </div>
      </div>
    </main>
  );
}
