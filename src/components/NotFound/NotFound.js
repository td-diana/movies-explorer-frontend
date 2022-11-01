import "./NotFound.css";

function NotFound({ goBack }) {
  return (
    <main className="not-found">
      <p className="not-found__container">
        <span className="not-found__title">404</span>
        <span className="not-found__text">Страница не найдена</span>
      </p>
      <button type="button" className="not-found__button" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
