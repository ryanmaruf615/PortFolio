import React from 'react';
import ServicePage from "./pages/ServicePage";
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./rauter/AppRoute";


function App() {
  return (
     <BrowserRouter>
       <AppRoute>
       </AppRoute>
     </BrowserRouter>
  );
}

export default App;
