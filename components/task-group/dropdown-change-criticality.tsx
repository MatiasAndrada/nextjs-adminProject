import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { CriticalityIndicator } from "@/components/ui/indicators";
import { SetTaskGroupCriticality } from "./buttons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Criticality } from "@prisma/client";

interface Props {
  id: string;
  criticality: Criticality;
}
export default function DropdownChangeCriticality({ id, criticality }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full flex rounded-lg bg-slate-400 dark:bg-slate-800 px-4 py-3 text-sm outline-2 placeholder:text-gray-500 ">
          <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-2" />
          <CriticalityIndicator criticality={criticality}>
            {criticality}
          </CriticalityIndicator>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="mr-4 md:mr-10 border-slate-300 dark:border-slate-800 bg-slate-400 dark:bg-slate-900">
          {Object.keys(Criticality).map((key) => {
            const value = Criticality[key as keyof typeof Criticality];
            return (
              <DropdownMenuItem key={value}>
                <SetTaskGroupCriticality id={id} criticality={value}>
                  <CriticalityIndicator criticality={value}>
                    {value}
                  </CriticalityIndicator>
                </SetTaskGroupCriticality>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
