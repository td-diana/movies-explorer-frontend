import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://github.com/td-diana/how-to-learn"
              className="portfolio__link"
              target="blank"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/td-diana/russian-travel"
              className="portfolio__link"
              target="blank"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/td-diana/react-mesto-api-full"
              className="portfolio__link"
              target="blank"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
