import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
      <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__nav">
          <p className="footer__copyright">&copy; 2022</p>
          <ul className="footer__list">
            <li>
              <a
                href="https://practicum.yandex.ru/"                
                className="footer__link"
                target="blank"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/td-diana"                
                className="footer__link"
                target="blank"
              >
                Github
              </a>
            </li>
            </ul>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
