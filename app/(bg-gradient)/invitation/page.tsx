import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { fetch_invitation_by_token } from "@/data/invitations";
import { getUserByEmail } from "@/data/user";

export default async function Page({ searchParams: { token } }: { searchParams: { token: string } }) {
  const invitation = await fetch_invitation_by_token(token);
  console.log("🦇  Page  invitation:", invitation)
  if (!invitation) {
    throw new Error("Invitation not found.");
  }
  const user = await getUserByEmail(invitation.email);
  if (!user) {
    throw new Error("User not found.")
    /*     return {
          redirect: {
            destination: "/auth/register",
            permanent: false,
          },
        }; */
  }


  /*
  ?Comportamiento de la pagina 
  El searchParam que recibe es el token de la invitación
  Con este token buscarlo en la base de datos 
  * Si no existe el token mostrar un error
  Verificar si el email enlazado al token tiene un usuario
  * Si existe mostrar las opciones de aceptar o rechazar la invitación
  En caso de no existir redirigir a la pagina de registro 
  * Una vex creado el usuario o al estar logueado redigir a la pagina de invitación
  
   */
  return (
    <Suspense fallback={<Loader1 />}>
      <NewVerificationForm />
    </Suspense>
  );
}
