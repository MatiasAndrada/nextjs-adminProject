
export { default } from "next-auth/middleware";



/**
 * Configuration object for the middleware.
 * 
 * @typedef {object} MiddlewareConfig
 * @property {string} matcher - Este es el path que se va a usar para el middleware. (osea el path que se va a usar para proteger)
 */
export const config = {
    // matcher: ["/profile"],
    matcher: ["/((?!register|api|login).*)"], //? Cualquier ruta distinta a register, api y login se va a proteger con el middleware.
};