import { GoHomeFill } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';
import { useUserMenu } from '../hooks/useUserMenu';

// types.ts
export interface SubMenu {
    url: string; // Required property for URL
    title?: string; // Optional title for the submenu item
    description?: string; // Optional description for the submenu item
  }
  
  export interface MenuItem {
    title?: string; // Optional title for the menu item
    description?: string; // Optional description for the menu item
    subMenus?: SubMenu[]; // Optional array of SubMenus
  }
  


// Breadcrumbs.tsx
const findMenuTitles = (menuItems: MenuItem[], path: string): { mainTitle: string; subTitle: string } | null => {
  for (const item of menuItems) {
    if (item.subMenus) {
      for (const subItem of item.subMenus) {
        if (subItem.url === path) {
          return {
            mainTitle: item.title || item.description || '',
            subTitle: subItem.title || subItem.description || ''
          };
        }
      }
    }
  }
  return null;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { data: menuItems = [] } = useUserMenu(); // Fetching menu items
  const currentPath = location.pathname;  
  const menuTitles = findMenuTitles(menuItems as MenuItem[], currentPath); // Cast menuItems to MenuItem[]

  return (
    <div className="breadcrumbs text-xs bg-slate-100 text-gray-700 px-2">
      <ul className="flex flex-row items-center space-x-reverse space-x-1">
        <li className="flex items-center">
          <Link to="/">
            <GoHomeFill className="inline-block mx-2" />
            خانه
          </Link>
        </li>
        {menuTitles && (
          <>
            <li className="flex items-center">
              {menuTitles.mainTitle}
            </li>
            <li className="flex items-center">
              {menuTitles.subTitle}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
