import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewGame from "./pages/NewGame";
import PlayerHistory from "./pages/PlayerHistory";
import Spitting from "./pages/Spitting";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/newGame" element={<NewGame/>}/>
        <Route path="/spitting" element={<Spitting/>}/>
        <Route path="/history" element={<PlayerHistory/>}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
