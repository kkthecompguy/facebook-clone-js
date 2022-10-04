import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
}

export default Home;
