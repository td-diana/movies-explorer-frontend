import "./AboutMe.css";
import foto from "../../images/foto.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__author">
          <div className="about-me__about-author">
            <h3 className="about-me__name">Евгений</h3>
            <p className="about-me__age">Фронтенд-разработчик, 40 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__links">
              <li>
                <a
                  href="https://github.com/td-diana"
                  className="about-me__link"
                  target="blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img className="about-me__foto" src={foto} alt="фото автора" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
