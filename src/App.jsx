import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";



function App() {
  return (
    <Router>
      <Routes>
          <Route path="/">
            <Route index  element={<Home />} />
            <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
