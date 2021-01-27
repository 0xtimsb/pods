import Kanban from "../components/kanban/Kanban";

// Store
import { AppProvider } from "../store/context";

function Home() {
  return (
    <div className="bg-cream-50 h-screen">
      <AppProvider>
        <Kanban />
      </AppProvider>
    </div>
  );
}

export default Home;
