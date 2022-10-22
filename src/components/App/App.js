import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Navigation from "../Navigation/Navigation";

function App() {
  return (
    <div className="app">
      <Navigation /> {/* убрать после логики */}
      <Header />
      <Main />
    </div>
  );
}

export default App;
