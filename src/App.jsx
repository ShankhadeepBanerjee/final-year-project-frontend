import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShowQr from "./pages/ShowQr";
import AddCandidate from "./pages/AddCandidate";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VerifyCandidate from "./pages/VerifyCandidate";


import { useEffect } from "react";
import * as faceapi from "face-api.js" ;

function App() {
  useEffect(() => {
    (async ()=> {
      const net = new faceapi.SsdMobilenetv1()
      await net.loadFromUri("./model");
      console.log(faceapi.nets.tinyFaceDetector);
    })()
  }, [])
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/verify-candidate" element={<VerifyCandidate />} />
          <Route path="/show-qr/:id" element={<ShowQr />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
