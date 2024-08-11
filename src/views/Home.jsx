import { useState } from 'react';

import Top from '../components/Top/Top';
import Card from '../components/Card/Card';
import CardStack from '../components/CardStack/CardStack';

function Home(props) {
  const { cards, setShowAddCard } = props;
  const [activeCard, setActiveCard] = useState({
    number: 'XXXX XXXX XXXX XXXX',
    name: '',
    expire: 'XX / XX',
    ccv: '',
    vendor: 'blank',
  });

  return (
    <main>
      <Top title='E-wallet' />
      <Card cardInfo={activeCard} />
      <CardStack
        cards={cards}
        setActiveCard={setActiveCard}
        activeCard={activeCard}
      />
      <button
        className='button invert'
        onClick={() => {
          setShowAddCard((prevState) => {
            return !prevState; // Om true så returerna false och vice versa
          });
        }}
      >
        Add a new card
      </button>
    </main>
  );
}

export default Home;
