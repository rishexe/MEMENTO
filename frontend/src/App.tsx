import Quests from "./pages/quests/Quests";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./sidebar";
import Profile from "./profile/profile";
import DistrictMap from "./districts/map/districtMap";
import Home from "./pages/Home";

function Districts() {
  return (
    <div className="page">
      <h1>Districts</h1>
    </div>
  );
}



function App() {
  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/districts" element={<Districts />} />

          <Route path="/map" element={<DistrictMap />} />

          <Route path="/quests" element={<Quests />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;