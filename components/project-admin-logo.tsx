import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/fonts';

export default function ProjectAdminWithText() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <div className="flex items-center">
        <RectangleGroupIcon className="h-12 w-12" />
        <p className="text-[30px]">Project Admin</p>
      </div>
    </div>
  );
}
