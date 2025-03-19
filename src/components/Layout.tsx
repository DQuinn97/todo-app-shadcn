import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="mb-5 flex w-full items-center justify-between">
        <h1 className="mr-auto text-2xl font-bold">Todo App</h1>
        <ModeToggle />
      </header>
      <main>
        {children}
        <Toaster />
      </main>
    </>
  );
};
export default Layout;
