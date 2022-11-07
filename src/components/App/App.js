import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import MobMenu from "../MobMenu/MobMenu";
// import Preloader from "../Preloader/Preloader";

export default function App() {
  const [isMobmenuOpened, setMobmenuOpened] = useState(false);
  const navigate = useNavigate();

  function onClickMobmenu(isMobmenuOpened) {
    setMobmenuOpened(!isMobmenuOpened);
  }

  function closeMobmenu() {
    setMobmenuOpened(false);
  }

  function goBack() {
    navigate(-1)
  }

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={[
            <Header
              LoggedIn={false}
              theme={false}
              onClickMobmenu={onClickMobmenu}
              isMobmenuOpened={isMobmenuOpened}
            />,
            <Main />,
            <Footer />,
          ]}
        />
        <Route
          path="/movies"
          element={[
            <Header
              LoggedIn={true}
              theme={true}
              onClickMobmenu={onClickMobmenu}
              isMobmenuOpened={isMobmenuOpened}
            />,
            <Movies />,
            <Footer />,
          ]}
        />
        <Route
          path="/saved-movies"
          element={[
            <Header
              LoggedIn={true}
              theme={true}
              onClickMobmenu={onClickMobmenu}
              isMobmenuOpened={isMobmenuOpened}
            />,
            <SavedMovies />,
            <Footer />,
          ]}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/profile"
          element={[
            <Header
              LoggedIn={true}
              theme={true}
              onClickMobmenu={onClickMobmenu}
              isMobmenuOpened={isMobmenuOpened}
            />,
            <Profile />,
          ]}
        />
        <Route path="*" element={<NotFound goBack={goBack} />}   />
      </Routes>
      {/* <Main /> */}
      {/* <Footer /> */}
      {/* <Preloader /> */}
      <MobMenu
        onClickMobmenu={onClickMobmenu}
        isMobmenuOpened={isMobmenuOpened}
        closeMobmenu={closeMobmenu}
      />
    </div>
  );
}
