"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    //useDebouncedCallback. Debounce es una técnica que limita la frecuencia con la que se ejecuta una función. Para no hacer una petición a la base de datos cada vez que el usuario escribe una letra, se usa esta técnica.
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);
  /*
  URLSearchParams es una API web que proporciona métodos de utilidad para manipular los parámetros de consulta de URL. 
  En lugar de crear una cadena literal compleja, puede usarla para obtener la cadena de parámetros como ?page=1&query=a.
  
  ?Aquí hay un desglose de lo que está sucediendo:
  ${pathname}es la ruta actual, en su caso "/dashboard/invoices",.
  A medida que el usuario escribe en la barra de búsqueda, params.toString()traduce esta entrada a un formato compatible con URL.
  replace(${pathname}?${params.toString()})actualiza la URL con los datos de búsqueda del usuario. Por ejemplo, /dashboard/invoices?query=lee si el usuario busca "Lee".
  La URL se actualiza sin recargar la página, gracias a la navegación del lado del cliente de Next.js
   */

  return (
    <div className="relative flex flex-1 flex-shrink-0 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border bg-white text-white dark:text-black placeholder:text-gray-500 placeholder:hover:text-black border-gray-200 py-[9px] pl-10 text-sm outline-2  shadow-lg "
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams?.get("query")?.toString()} //defaultValue. la entrada nativa gestionará su propio estado. Esto está bien ya que está guardando la consulta de búsqueda en la URL en lugar del estado.
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  text-gray-500 peer-focus:text-black" />
    </div>
  );
}
