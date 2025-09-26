"use client";

interface UnreadBadgeProps {
  count: number;
  className?: string;
}

export function UnreadBadge({ count, className = "" }: UnreadBadgeProps) {
  if (count === 0) return null;

  return (
    <div
      className={`
        absolute -top-2 -right-2 
        min-w-[1.25rem] h-5 
        bg-red-500 text-white 
        rounded-full 
        flex items-center justify-center 
        text-xs font-bold 
        shadow-lg
        animate-pulse
        ${className}
      `}
    >
      {count > 99 ? "99+" : count}
    </div>
  );
}