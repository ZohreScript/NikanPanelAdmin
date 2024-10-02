import DetailsParts from "../../components/Dashboard/DeailsParts";
import LastRecord from "../../components/Dashboard/LastRecord";
import SimpleCalandar from "../../components/Dashboard/SimpleCalandar";
import Analysis from "../../components/Dashboard/Analysis"

const Dashboard = () => {

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
