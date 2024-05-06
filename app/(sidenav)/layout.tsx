import { currentUser } from "@/hooks/use-current-user";
/* import { redirect } from "next/navigation" */
import SideNav from "@/components/dashboard/sidenav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "../../components/ui/dropdown-menu"
import { inter } from "@/components/fonts";
import { CurrentProjectStoreProvider } from "@/context/currentProjectStore";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const initialLetters = user?.name?.split(" ").map((n) => n[0]) ?? "";
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased bg-slate-200 dark:bg-slate-950 text-black dark:text-white`}>
        <CurrentProjectStoreProvider>
          <div className="flex flex-col md:flex-row">
            <div className=" w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="h-screen relative flex-grow p-6 md:overflow-y-auto ">
              <div className="absolute top-3 right-3 flex items-center justify-end gap-2 ">
                <h2
                  className="text-lg font-medium 
                    md:text-xl
                "
                >
                  Hi!
                  {user && ` ${user.name}`}
                </h2>
                <DropdownMenu >
                  <DropdownMenuTrigger>
                    <Avatar className="h-14 w-14">
                      {user && user.image ? (
                        <AvatarImage src={user.image} alt="Icon user" />
                      ) : (
                        <AvatarFallback>{initialLetters}</AvatarFallback>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal >
                    <DropdownMenuContent className="mr-4 md:mr-10">
                      <DropdownMenuLabel className="text-green-500">Free plan</DropdownMenuLabel>
                      <DropdownMenuLabel className="text-sm font-light">{user?.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-2 bg-slate-300" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="my-4 bg-slate-300" />
                      <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </div>
              {children}
            </div>
          </div>
        </CurrentProjectStoreProvider>
      </body>
    </html>
  );
}
