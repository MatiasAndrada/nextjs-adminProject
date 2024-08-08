import { Toaster } from "sonner";
const InvitationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Toaster richColors />
      {children}
    </section>
  );
};

export default InvitationLayout;
