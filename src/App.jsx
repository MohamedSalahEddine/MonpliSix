import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewGame from "./pages/NewGame";
import PlayerHistory from "./pages/PlayerHistory";
import Spitting from "./pages/Spitting";
import Home from "./pages/Home";
import SpittingItemDetails from "./pages/SpittingItemDetails";
import Rating from "./pages/Rating";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound"
import Statistics from "./pages/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rating" element={<Rating/>}/>
        <Route path="/newGame" element={ <ProtectedRoute> <NewGame/> </ProtectedRoute>}/>
        <Route path="/spitting" element={ <Spitting/>}/>
        <Route path="/spittingItemDetails/:id" element={<ProtectedRoute><SpittingItemDetails/></ProtectedRoute>}/>
        <Route path="/history/:id" element={<PlayerHistory/>}/>
        <Route path="/statistics" element={<Statistics />}/>
        <Route path="/" element={<Auth />}/>
        {/* <Route path="*" element={<NotFound />}/> */}
        <Route path="*" element={<Navigate to={"/"} replace/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
