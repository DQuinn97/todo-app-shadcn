import { ModeToggle } from "@/components/ui/mode-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <h1>Todo App</h1>
        <ModeToggle />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
export default Layout;
