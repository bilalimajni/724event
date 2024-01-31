import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
 // BI: Trie les données par date décroissante
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

 // BI: Fonction permettant de passer à la carte suivante dans le slider
const nextCard = () => {
  // BI: Incrémente l'index tout en veillant à revenir à la première carte si on atteint la dernière
  setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
};

// BI: Effet de côté utilisant useEffect pour orchestrer le défilement automatique des cartes toutes les 5000 ms
useEffect(() => {
  // BI: Initialise un intervalle qui invoque la fonction nextCard toutes les 5000 ms
  const intervalId = setInterval(nextCard, 5000);

  // BI: Assure le nettoyage de l'intervalle lorsqu'un composant est démonté ou en cas de changement d'index ou de données (byDateDesc)
  return () => {
    clearInterval(intervalId);
  };
}, [index, byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
        {byDateDesc?.map((event, radioIdx) => (
  <input
    key={`${event.title}`}
    type="radio"
    name="radio-button"
    checked={index === radioIdx}
    onChange={() => setIndex(radioIdx)} // BI Gérer l'événement de changement si nécessaire
  />
))}

        </div>
      </div>
    </div>
  );
};

export default Slider;