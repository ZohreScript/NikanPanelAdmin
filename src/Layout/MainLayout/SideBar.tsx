import { useAppContext } from "../../context/app/App-context";
import { NavLink } from "react-router-dom";
import logo from "../../../public/imgs/logo-white.png";
import { useUserMenu } from "../../hooks/useUserMenu";

// Define the types for menu items and sub-menus
interface SubMenu {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url?: string;
  subMenus?: SubMenu[];
}

const SideBar = () => {
  const { showSidebar } = useAppContext();

  const { data: menuItems, isLoading, error } = useUserMenu<MenuItem[]>();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading menu.</p>;

  return (
    <div
      className={`flex flex-col h-full bg-[#293042] text-white transition-all duration-300 ${
        showSidebar ? "w-full" : "w-0"
      } overflow-hidden`}
    >
      {showSidebar && (
        <>
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-4">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" className="h-16 mb-2" />
            </div>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            {/* Menu */}
            <ul className="space-y-4 menu w-full" dir="rtl">
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center w-full px-2 py-2 rounded hover:text-blue-400"
                >
                  خانه
                </NavLink>
              </li>
              {menuItems &&
                menuItems.map((item) => (
                  <li key={item.title} className="w-full justify-between">
                    {item.subMenus && item.subMenus.length > 0 ? (
                      <details>
                        <summary className="flex items-center w-full cursor-pointer px-2 py-2 rounded justify-between hover:text-blue-400">
                          <span>{item.title}</span>
                        </summary>
                        <ul className="pl-4 space-y-3 text-xs">
                          {item.subMenus.map((subMenu) => (
                            <li key={subMenu.title}>
                              <NavLink
                                to={subMenu.url}
                                className="block hover:text-blue-400"
                              >
                                {subMenu.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <NavLink
                        to={item.url || "#"}
                        className="flex items-center w-full px-2 py-2 rounded hover:text-blue-400"
                      >
                        {item.title}
                      </NavLink>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default SideBar;
