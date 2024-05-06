import { Suspense } from "react";
import Link from "next/link";
/* import { FaUser } from "react-icons/fa"; */
/* import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuPortal,
} from "../../../components/ui/dropdown-menu" */
import { currentUser } from "@/hooks/use-current-user";
import CardWrapper from "@/components/projects/cards";
import { Button } from "@/components/ui/button";
import {
    /*     RevenueChartSkeleton,
          LatestInvoicesSkeleton, */
    CardsSkeleton,
} from "@/components/skeletons";
import { lusitana } from "@/components/fonts";

export default async function Page() {
    const user = await currentUser();
    /*     const initialLetters = user?.name?.split(" ").map((n) => n[0]) ?? ""; */
    return (
        <main>
            <div className="flex flex-row items-center justify-between">
                <h1 className={`${lusitana.className} text-4xl `}>Projects page</h1>
                <div className="flex flex-row items-center justify-between md:space-x-4">
                    {/*                     <h2
                        className="text-lg font-medium 
                    md:text-xl
                "
                    >
                        Hi!
                        {user && ` ${user.name}`}
                    </h2> */}
                    {/*                     <DropdownMenu >
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
                            <DropdownMenuContent className="mr-4">
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
                    </DropdownMenu> */}
                </div>
            </div>
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-medium ">Your projects</h2>
                <Link href="/projects/create">
                    <Button variant="create">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        Create a new project
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<CardsSkeleton />}>
                <CardWrapper />
            </Suspense>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium ">Projects with you</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/*                 <Suspense fallback={<RevenueChartSkeleton />}>

                </Suspense>
                <Suspense />
                <Suspense fallback={<LatestInvoicesSkeleton />}>

                </Suspense> */}
            </div>
        </main >
    );
}
