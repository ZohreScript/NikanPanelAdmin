import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import SideBar from './SideBar';
import { useAppContext } from '../../context/app/App-context';
import Breadcrumbs from '../../components/Breadcrumbs';

// Define types for the app context if needed
interface AppContextType {
  showSidebar: boolean;
}

const MainLayout: React.FC = () => {
  // Type the context using the defined type
  const { showSidebar } = useAppContext<AppContextType>();

  return (
    <div className="flex h-screen">
      <div
        className={`w-64 fixed z-20 top-0 right-0 h-full transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <SideBar />
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${showSidebar ? 'mr-64' : 'mr-0'} transition-all duration-300`}
      >
        <div className="flex-shrink-0 shadow-md">
          <TopNav />
        </div>
        <div className="flex-shrink-0" dir="rtl">
          <Breadcrumbs />
        </div>
        <main className="flex-1 p-4 bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
