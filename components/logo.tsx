import Link from 'next/link';
//fonts
import { lusitana } from '@/components/fonts';
//icons
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

export function Icon() {
  return (
    <RectangleGroupIcon className="text-white h-8 w-8 md:h-12 md:w-12" />
  );
}

export function Text() {
  return (
    <h2 className={`text-white  ${lusitana.className} text-[15px] md:text-[30px] leading-none select-none `}>Project Admin</h2>
  );
}

export function IconWithText() {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon />
      <Text />
    </div>
  );
}



