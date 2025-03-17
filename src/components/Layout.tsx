import { ModeToggle } from "@/components/ui/mode-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex w-full items-center justify-between">
        <h1 className="mr-auto text-2xl font-bold">Todo App</h1>
        <ModeToggle />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
export default Layout;
