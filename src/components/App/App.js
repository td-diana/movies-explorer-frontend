import { useState, useEffect } from "react";
import mainApi from "../../utils/MainApi";
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
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function App() {
  const [isMobmenuOpened, setMobmenuOpened] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function onClickMobmenu(isMobmenuOpened) {
    setMobmenuOpened(!isMobmenuOpened);
  }

  function closeMobmenu() {
    setMobmenuOpened(false);
  }

  function goBack() {
    navigate(-1);
  }

  function onRegister({ name, email, password }) {
    mainApi
      .createUser(name, email, password)
      .then((data) => {
        if (data._id) {
          onLogin({ email, password });
        }
      })
      .catch((err) => console.log(err));
  }

  function onLogin({ email, password }) {
    mainApi
      .login(email, password)
      .then((jwt) => {
        if (jwt.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", jwt.token);
          navigate("/movies");
        }
      })
      .catch((err) => console.log(err));
  }

  // выход из аккаунта
  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/");
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {/* <Header
        loggedIn={loggedIn}
        onClickMobmenu={onClickMobmenu}
        isMobmenuOpened={isMobmenuOpened}
      />           */}

        <Routes>
          <Route
            path="/"
            element={[
              <Header
                loggedIn={loggedIn}
                onClickMobmenu={onClickMobmenu}
                isMobmenuOpened={isMobmenuOpened}
              />,
              <Main />,
              <Footer />,
            ]}
          />
          <Route
            path="/signup"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={onLogin} />} />

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/movies"
              element={[
                <Header
                  loggedIn={loggedIn}
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
                  loggedIn={loggedIn}
                  onClickMobmenu={onClickMobmenu}
                  isMobmenuOpened={isMobmenuOpened}
                />,
                <SavedMovies />,
              ]}
            />
            <Route
              path="/profile"
              element={[
                <Header
                  loggedIn={loggedIn}
                  onClickMobmenu={onClickMobmenu}
                  isMobmenuOpened={isMobmenuOpened}
                />,
                <Profile handleLogOut={handleLogOut} />,
              ]}
            />
            <Route path="*" element={<NotFound goBack={goBack} />} />
          </Route>
        </Routes>

        {/* <Footer /> */}
        {/* <Preloader /> */}
        <MobMenu
          onClickMobmenu={onClickMobmenu}
          isMobmenuOpened={isMobmenuOpened}
          closeMobmenu={closeMobmenu}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
