import Link from 'next/link';
//fonts
import { inter, lusitana } from '@/components/fonts';
//icons
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

export function Icon() {
  return (
    <RectangleGroupIcon className="text-white h-8 w-8 " />
  );
}

export function Text() {
  return (
    <h2 className={`text-white  ${lusitana.className} text-[15px] md:text-[26px] leading-none select-none `}>Project Admin</h2>
  );
}

interface IconWithTextProps {
  redirect?: string;
}
export function IconWithText({ redirect }: IconWithTextProps) {
  if (redirect) {
    return (
      <Link
        href={redirect}
        className='flex flex-row items-center gap-1'
      >
        <Icon />
        <Text />
      </Link>
    );
  } else return (
    <div className="flex flex-row items-center gap-1">
      <Icon />
      <Text />
    </div>
  );
}



