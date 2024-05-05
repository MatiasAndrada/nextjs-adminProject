import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/components/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-2 block">
      <ol className={clsx(lusitana.className, 'flex items-center justify-center lg:justify-start')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              'flex items-center text-xl ', // Alinear verticalmente el texto
              breadcrumb.active ? 'text-black dark:text-white' : 'text-gray-500 dark:text-slate-300',
              index === breadcrumbs.length - 1 && 'text-2xl md:text-3xl' // Agrandar la fuente del último elemento
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
