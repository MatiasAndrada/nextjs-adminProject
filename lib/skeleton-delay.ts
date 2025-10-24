/**
 * Skeleton Delay Utility
 * 
 * Proporciona un delay configurable para testing de skeletons.
 * El delay se controla mediante la variable de entorno NEXT_PUBLIC_ENABLE_SKELETON_DELAY.
 * 
 * @example
 * // En tu componente async:
 * await skeletonDelay();
 * 
 * @example
 * // Para habilitar el delay, agrega a tu .env.local:
 * NEXT_PUBLIC_ENABLE_SKELETON_DELAY=true
 */

/**
 * Tiempo de delay en milisegundos cuando está habilitado
 * @default 5000 (5 segundos)
 */
const SKELETON_DELAY_MS = 5000;

/**
 * Función que aplica un delay si está habilitado mediante variable de entorno.
 * 
 * El delay solo se ejecuta si:
 * - La variable NEXT_PUBLIC_ENABLE_SKELETON_DELAY está definida
 * - Su valor es 'true' (case-insensitive)
 * 
 * Por defecto, el delay está DESHABILITADO.
 * 
 * @returns Promise<void> que se resuelve después del delay o inmediatamente
 */
export async function skeletonDelay(): Promise<void> {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_SKELETON_DELAY?.toLowerCase() === 'true';
  
  if (isEnabled) {
    await new Promise(resolve => setTimeout(resolve, SKELETON_DELAY_MS));
  }
  
  // Si está deshabilitado, retorna inmediatamente
  return Promise.resolve();
}

/**
 * Verifica si el delay de skeleton está habilitado
 * @returns boolean indicando si el delay está activo
 */
export function isSkeletonDelayEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_SKELETON_DELAY?.toLowerCase() === 'true';
}

/**
 * Obtiene el tiempo de delay configurado en milisegundos
 * @returns número de milisegundos del delay
 */
export function getSkeletonDelayMs(): number {
  return SKELETON_DELAY_MS;
}
