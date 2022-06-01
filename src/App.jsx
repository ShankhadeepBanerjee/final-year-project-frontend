import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ShowQr from "./pages/ShowQr";
import AddCandidate from "./pages/AddCandidate";
import Error from "./pages/Error";
import Home from "./pages/Home";
import VerifyCandidate from "./pages/VerifyCandidate";

import { createContext, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

export const faceAPIContext = createContext();

function App() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);
      setModelsLoaded(true);
      console.log("Models loaded");
    })();
  }, []);

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
