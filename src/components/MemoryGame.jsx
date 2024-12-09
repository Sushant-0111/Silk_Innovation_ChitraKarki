import { useState, useEffect } from 'react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [firstFlippedCard, setFirstFlippedCard] = useState(null);
  const [secondFlippedCard, setSecondFlippedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const generateCards = () => {
      const values = [1, 2, 3, 4, 5, 6];
      const generatedCards = [];

      for (let i = 0; i < values.length; i++) {
        generatedCards.push({ id: i * 2, value: values[i], flipped: false, matched: false });
        generatedCards.push({ id: i * 2 + 1, value: values[i], flipped: false, matched: false });
      }

      for (let i = generatedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
      }

      setCards(generatedCards);
    };

    generateCards();
  }, []);

  const handleFlipCard = (card) => {
    if (gameOver || card.matched || card.flipped) return;

    if (!firstFlippedCard) {
      setFirstFlippedCard(card);
      setCards((prevCards) =>
        prevCards.map((prevCard) =>
          prevCard.id === card.id ? { ...prevCard, flipped: true } : prevCard
        )
      );
    } else if (!secondFlippedCard) {
      setSecondFlippedCard(card);
      setCards((prevCards) =>
        prevCards.map((prevCard) =>
          prevCard.id === card.id ? { ...prevCard, flipped: true } : prevCard
        )
      );
    }
  };

  useEffect(() => {
    if (firstFlippedCard && secondFlippedCard) {
      const checkMatch = () => {
        if (firstFlippedCard.value === secondFlippedCard.value) {
          setCards((prevCards) =>
            prevCards.map((prevCard) =>
              prevCard.id === firstFlippedCard.id || prevCard.id === secondFlippedCard.id
                ? { ...prevCard, matched: true }
                : prevCard
            )
          );
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((prevCard) =>
                prevCard.id === firstFlippedCard.id || prevCard.id === secondFlippedCard.id
                  ? { ...prevCard, flipped: false }
                  : prevCard
              )
            );
          }, 1000);
        }

        setFirstFlippedCard(null);
        setSecondFlippedCard(null);
      };

      checkMatch();
    }
  }, [firstFlippedCard, secondFlippedCard]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Memory Game</h1>
      {gameOver ? (
        <p className="text-2xl font-bold mb-4">Congratulations, you won!</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center cursor-pointer"
              onClick={() => handleFlipCard(card)}
            >
              {card.flipped ? (
                <p className="text-2xl font-bold">{card.value}</p>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
