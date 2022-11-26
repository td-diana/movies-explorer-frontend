import "./App.css";
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import mainApi from "../../utils/MainApi";
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
import ProtectedRoute from "../../utils/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobmenuOpened, setMobmenuOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloader, setIsPreloader] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isInfoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    text: "",
    isSuccess: true,
  });

  // проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            navigate(location.pathname);
          }
        })
        .catch((err) =>
          setInfoTooltip({
            isOpen: true,
            isSuccess: false,
            text: err,
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) =>
          setInfoTooltip({
            isOpen: true,
            isSuccess: false,
            text: err,
          })
        );
    }
  }, [loggedIn]);

  function onClickMobmenu(isMobmenuOpened) {
    setMobmenuOpened(!isMobmenuOpened);
  }

  function closeMobmenu() {
    setMobmenuOpened(false);
  }

  function closeInfoTooltip() {
    setInfoTooltip(false);
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
      .catch((err) =>
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          text: err,
        })
      );
  }

  function onLogin({ email, password }) {
    mainApi
      .login(email, password)
      .then((jwt) => {
        if (jwt.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", jwt.token);
          navigate("/movies");
          setInfoTooltip({
            isOpen: true,
            isSuccess: true,
            text: "Welcome",
          });
        }
      })
      .catch((err) =>
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          text: err,
        })
      );
  }

  // выход из аккаунта
  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
    setInfoTooltip({
      isOpen: true,
      isSuccess: false,
      text: "Вы вышли из аккаунта",
    });
  }

  // редактирование данных пользователя
  function handleProfile({ name, email }) {
    mainApi
      .updateUser(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
          text: "Данные профиля сохранены",
        });
      })
      .catch((err) =>
        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          text: err,
        })
      );
  }

  // cохранение фильма
  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then((newMovie) => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch((err) => {
        if (err.status === 401) {
          setInfoTooltip({
            isOpen: true,
            isSuccess: false,
            text: err,
          });
        } else {
          handleLogOut();
        }
      });
  }

  // получение сохраненных фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          const UserMoviesList = data.filter(
            (m) => m.owner === currentUser._id
          );
          setSavedMoviesList(UserMoviesList);
        })
        .catch((err) => {
          if (err.status === 401) {
            setInfoTooltip({
              isOpen: true,
              isSuccess: false,
              text: err,
            });
          } else {
            handleLogOut();
          }
        });
    }
  }, [currentUser, loggedIn]);

  // удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) => {
        if (err.status === 401) {
          setInfoTooltip({
            isOpen: true,
            isSuccess: false,
            text: err,
          });
        } else {
          handleLogOut();
        }
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
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
            element={
              !loggedIn ? (
                <Register onRegister={onRegister} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              !loggedIn ? <Login onLogin={onLogin} /> : <Navigate to="/" />
            }
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/movies"
              element={[
                <Header
                  loggedIn={loggedIn}
                  onClickMobmenu={onClickMobmenu}
                  isMobmenuOpened={isMobmenuOpened}
                />,
                <Movies
                  loggedIn={loggedIn}
                  setIsPreloader={setIsPreloader}
                  savedMoviesList={savedMoviesList}
                  onSaveClick={handleSaveMovie}
                  onDeleteClick={handleDeleteMovie}
                  setInfoTooltip={setInfoTooltip}
                />,
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
                <SavedMovies
                  loggedIn={loggedIn}
                  savedMoviesList={savedMoviesList}
                  onDeleteClick={handleDeleteMovie}
                  setInfoTooltip={setInfoTooltip}
                />,
                <Footer />,
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
                <Profile
                  handleLogOut={handleLogOut}
                  handleProfile={handleProfile}
                />,
              ]}
            />
          </Route>
          <Route path="*" element={<NotFound goBack={goBack} />} />
        </Routes>
        <Preloader isOpen={isPreloader} />
        <MobMenu
          onClickMobmenu={onClickMobmenu}
          isMobmenuOpened={isMobmenuOpened}
          closeMobmenu={closeMobmenu}
        />
        <InfoTooltip isOpen={isInfoTooltip} onClose={closeInfoTooltip} />
      </CurrentUserContext.Provider>
    </div>
  );
}
