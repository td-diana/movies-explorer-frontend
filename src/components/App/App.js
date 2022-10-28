import { Route, Routes } from "react-router-dom";
// import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={[
            <Header LoggeIn={false} theme={false} />,
            <Main LoggeIn={false} />,
            <Footer />,
          ]}
        />
        <Route
          path="/movies"
          element={[
            <Header LoggeIn={true} theme={true} />,
            <Movies />,
            <Footer />,
          ]}
        />
        <Route
          path="/saved-movies"
          element={[
            <Header LoggeIn={true} theme={true} />,
            <SavedMovies />,
            <Footer />,
          ]}
        />
        <Route
          path="/profile"
          element={[
            <Header LoggeIn={true} theme={true} />,
            <Profile />,
          ]}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
