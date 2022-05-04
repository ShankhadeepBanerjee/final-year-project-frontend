import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCandidate from "./pages/AddCandidate";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VerifyCandidate from "./pages/VerifyCandidate";



function App() {
  return (
    <Router>
      <Routes>
          <Route path="/">
            <Route index  element={<Home />} />
            <Route path="/add-candidate"  element={<AddCandidate />} />
            <Route path="/verify-candidate"  element={<VerifyCandidate />} />
            <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
