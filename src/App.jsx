import { useState } from "react";
import ApiService from "./services/ApiServices";
import Nav from "./components/Nav";
import SearchQuery from "./components/SearchQuery";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Nav />

      <div>
        <Cards />
      </div>
      <Footer />
    </>
  );
}

export default App;
