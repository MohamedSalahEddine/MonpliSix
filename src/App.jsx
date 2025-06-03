import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewGame from "./pages/NewGame";
import PlayerHistory from "./pages/PlayerHistory";
import Spitting from "./pages/Spitting";
import Home from "./pages/Home";
import SpittingItemDetails from "./pages/SpittingItemDetails";
import Rating from "./pages/Rating";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rating" element={<Rating/>}/>
        <Route path="/newGame" element={<NewGame/>}/>
        <Route path="/spitting" element={<Spitting/>}/>
        <Route path="/spittingItemDetails/:id" element={<SpittingItemDetails/>}/>
        <Route path="/history" element={<PlayerHistory/>}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
