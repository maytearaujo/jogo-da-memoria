import { useState } from "react";
import Board from "./Board";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateCards = () => {
  const values = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const cards = values.map((value) => ({
    value,
    isFlipped: false,
  }));

  const duplicatedCards = cards
    .concat([...cards])
    .map((card, index) => ({ ...card, id: index }));

  return shuffleArray(duplicatedCards);

  //   console.log(duplicatedCards);
};

generateCards();

const Game = () => {
  const [cards, setCards] = useState(generateCards());

  const [flippedCards, setFlippedCards] = useState([]);


  const playerChances = 10;

  const [chances, setChances] = useState(10);

  const result = cards.filter((card) => card.isFlipped).length;

  const handleCardClick = (clickedCard) => {
    if (chances === 0) return;

    if (flippedCards.length === 2) return;

    const newCards = cards.map((card) => {
      return card.id === clickedCard.id ? { ...card, isFlipped: true } : card;
    });

    setCards(newCards);

    setFlippedCards([...flippedCards,clickedCard]);

    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;

        if (firstCard.value !== clickedCard.value) {
          const resetCards = cards.map((card) => {
            return card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isFlipped: false }
              : card;
          });
          setCards(resetCards);
          setChances((prev) => prev - 1);
        }
        setFlippedCards([]);
      }, 600);
    }
  };

  const resetGame = () => { 
    setChances(playerChances);
    setFlippedCards([])
    setCards(generateCards());
    setCards(generateCards());
  };

  return (
    <div className="game">
      <Board cards={cards} onCardClick={handleCardClick} />
      {chances === 0 ? (
        <p>Suas Tentativas acabaram</p>
      ) : result === cards.length ? (
        <h2>Parabéns você ganhou</h2>
      ) : (
        <h2>Você possui {chances} tentiva (s)</h2>
      )}
      <button className="btn" onClick={resetGame}>Reiniciar o jogo</button>
    </div>
  );
};

export default Game;
