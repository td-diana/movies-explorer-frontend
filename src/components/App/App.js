import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={[<Header LoggeIn={false} />, <Main LoggeIn={false} />]}
        />

        <Route
          path="/movies"
          element={[<Header LoggeIn={true} />, <Movies LoggeIn={true} />]}
        />
      </Routes>
      {/* <Main /> */}
      <Footer />
    </div>
  );
}

export default App;
