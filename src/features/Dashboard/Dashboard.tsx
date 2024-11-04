import DetailsParts from "../../components/Dashboard/DeailsParts";
import LastRecord from "../../components/Dashboard/LastRecord";
import SimpleCalandar from "../../components/Dashboard/SimpleCalandar";
import Analysis from "../../components/Dashboard/Analysis"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  useAuth(navigate); // Pass navigate to useAuth

  return (
    <div className="flex flex-col container mx-auto w-full  ">
      <Analysis/>
      <DetailsParts />
      <LastRecord />
      <SimpleCalandar/>
    </div>
  );
};

export default Dashboard;
