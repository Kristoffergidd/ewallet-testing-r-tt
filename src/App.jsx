import { useState } from 'react';
import './App.css';

import Home from './views/Home';
import AddCard from './views/AddCard';

function App() {
  const [cards, setCards] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);

  function addCard(card) {
    // const newCards = [...cards];
    // newCards.push(card);

    // setCards(newCards);
    // Samma resultat som nedan kod

    setCards((prevState) => {
      return [...prevState, card];
    });
  }

  return (
    <div className='App'>
      {showAddCard ? (
        <AddCard addCard={addCard} setShowAddCard={setShowAddCard} />
      ) : (
        <Home cards={cards} setShowAddCard={setShowAddCard} />
      )}
    </div>
  );
}

export default App;
