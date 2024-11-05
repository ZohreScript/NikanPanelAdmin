import DetailsParts from "../../components/Dashboard/DeailsParts";
import Analysis from "../../components/Dashboard/Analysis"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SimpleList from "../../components/Dashboard/SimpleList";

const Dashboard = () => {
  const navigate = useNavigate();
  useAuth(navigate); // Pass navigate to useAuth

  return (
    <div className="flex flex-col container mx-auto w-full  ">
      <Analysis/>
      <DetailsParts />
      <SimpleList  />
    </div>
  );
};

export default Dashboard;
