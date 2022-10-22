import "./Main.css";
import logo from "../../images/promo-logo.svg";

function Main() {
  return (
    <main className="main">
        <h1 className="main__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
      <img src={logo} className="promo__logo" alt="" />
    </main>
  );
}

export default Main;
