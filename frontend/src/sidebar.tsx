import {
  House,
  Map,
  MapPinned,
  ScrollText,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const menu = [
  { name: "Home", icon: House, path: "/" },
  { name: "Districts", icon: Map, path: "/districts" },
  { name: "Map", icon: MapPinned, path: "/map" },
  { name: "Quests", icon: ScrollText, path: "/quests" },
  { name: "Profile", icon: User, path: "/profile" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-top">

        <div className="sidebar-header">
          {!collapsed && (
            <h1 className="sidebar-logo">
              MEMENTO
            </h1>
          )}

          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen size={21} />
            ) : (
              <PanelLeftClose size={21} />
            )}
          </button>
        </div>

        <nav className="sidebar-nav">

          {menu.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={21} />

              {!collapsed && (
                <span>{name}</span>
              )}
            </NavLink>
          ))}

        </nav>

      </div>

      {!collapsed && (
        <div className="sidebar-footer">
          <p>Explore Sikkim</p>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;