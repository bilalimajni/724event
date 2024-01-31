export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
//* BI L'index commence à 0, mais lors de l'affichage, nous ajoutons 1 à l'index pour afficher une numérotation commençant par 1.
export const getMonth = (date) => MONTHS[date.getMonth()+1];
