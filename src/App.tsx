import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import Recommendation from "./pages/Recommendation";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import { EventProvider } from "./context/EventContext";
import Quotation from "./pages/Quotation";

function App() {
  return (
    <BrowserRouter>
    <EventProvider>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/crear-evento"
          element={<CreateEvent />}
        />

        <Route
          path="/recomendacion"
          element={<Recommendation />}
        />

        <Route
          path="/cotizacion"
          element={<Quotation />}
        />

      </Routes>
    </MainLayout>
    </EventProvider>
    
    </BrowserRouter>
  );
}

export default App;