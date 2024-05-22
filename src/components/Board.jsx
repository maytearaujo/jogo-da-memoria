import React from "react";
import Card from "./Card";

const Board = ({cards, onCardClick }) => {
  return (
    <div className="bord">
        {cards.map((card) => (
            <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
    </div>
  );
};

export default Board;
