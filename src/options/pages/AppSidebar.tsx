import { cn } from "@/lib/utils";
import "app/utils/style-utils/components.scss";
import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();
  const getUrlobject = (path: `/${string}`, title: string) => {
    return {
      path,
      hash: `#${path}`,
      title,
    };
  };

  const urls = [
    getUrlobject("/", "Options"),
    getUrlobject("/history", "Stats and history"),
  ];

  return (
    <nav className="fixed z-10 top-0 left-0 w-64 h-screen bg-slate-800 shadow-2xl">
      <div className="w-full h-full p-4 overflow-hidden">
        <h2 className="text-3xl text-gradient-blue font-bold overflow-visible tracking-tighter">
          Daily Todos
        </h2>
        <ul className="mt-8 space-y-2">
          {urls.map((url) => (
            <Link
              to={url.path}
              key={url.path}
              className={cn(
                "block rounded-full bg-slate-500 p-2 text-white relative left-8 shadow-lg text-base font-light tracking-wider uppercase transition-colors duration-300",
                "hover:bg-slate-300 hover:text-slate-700",
                location.pathname === url.path &&
                  "bg-slate-300 text-slate-700 font-semibold tracking-tight"
              )}
            >
              {url.title}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AppSidebar;
