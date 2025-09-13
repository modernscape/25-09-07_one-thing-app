import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";
import { Trash2, BookCheck, Key } from "lucide-react";
import { defaultMission } from "../data/dummyThings";
import { useState, useEffect } from "react";

const KEYS = {
  mission: "mission",
};

const sideMenu = [
  {
    path: "/",
    label: "One Thing",
    icon: <BookCheck />,
  },
  {
    path: "/trash",
    label: "ゴミ箱",
    icon: <Trash2 />,
  },
];

const linkVariants = cva("flex items-center gap-2 rounded px-5 py-3", {
  variants: {
    active: {
      true: "bg-blue-300 text-white",
      false: "hover:bg-slate-100",
    },
  },
});

const AppLayout = ({ children }) => {
  const { pathname } = useLocation(); // pathname は決まった名前
  const [mission, setMission] = useState(() => {
    const missionStored = localStorage.getItem(KEYS.mission);
    return JSON.parse(missionStored) ?? defaultMission;
  });

  useEffect(
    () => localStorage.setItem(KEYS.mission, JSON.stringify(mission)),
    [mission],
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-64 flex-col gap-2 p-6 hidden sm:block">
        <h1 className="text-2xl">
          <p className="text-sm mb-1 text-gray-500">One Thing App</p>
          <textarea
            type="text"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
          />
        </h1>
        <nav>
          <ul className="flex flex-col gap-2">
            {sideMenu.map(({ path, label, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={linkVariants({ active: path === pathname })}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="w-full overflow-x-scroll">{children}</main>
    </div>
  );
};

export default AppLayout;
