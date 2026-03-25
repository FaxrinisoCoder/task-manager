import { FaMoon, FaSun, FaLayerGroup } from "react-icons/fa";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900">
            <FaLayerGroup className="text-lg" />
          </div>

          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl md:text-2xl lg:text-3xl">
              Task Manager Board
            </h1>
            <p className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
              Mini Trello Clone with TypeScript
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-1 sm:gap-2 rounded-xl border px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
