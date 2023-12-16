import type { NextAuthConfig } from 'next-auth';

/**
 * Configuración de autenticación para NextAuth.js
 */
export const authConfig = {
    /**
     * Páginas personalizadas para la autenticación
     */
    pages: {
        signIn: '/login' // Página de inicio de sesión personalizada
    },
    /**
     * Funciones de devolución de llamada para la autenticación
     */
    callbacks: {
        /**
         * Función que se llama cuando un usuario está autorizado
         * @param auth - Información de autenticación
         * @param request - Información de la solicitud
         * @returns Si el usuario está autorizado o no
         */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user; // Comprueba si el usuario está autenticado
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Comprueba si la página actual es el dashboard
            if (isOnDashboard) {
                if (isLoggedIn) return true; // Si el usuario está autenticado, permite el acceso al dashboard
                return false; // Si el usuario no está autenticado, redirige a la página de inicio de sesión
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl)); // Si el usuario está autenticado y no está en el dashboard, redirige al dashboard
            }
            return true; // Si el usuario no está autenticado y no está en el dashboard, permite el acceso a la página actual
        },
    },
    providers: [], // Agrega proveedores con una matriz vacía por ahora
} satisfies NextAuthConfig;
