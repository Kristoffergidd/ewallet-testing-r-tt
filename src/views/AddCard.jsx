import { useState } from 'react';

import Top from '../components/Top/Top';
import Card from '../components/Card/Card';
import CardForm from '../components/CardForm/CardForm';

function AddCard(props) {
  const { addCard, setShowAddCard } = props;
  const [card, setCard] = useState({
    number: 'XXXX XXXX XXXX XXXX',
    name: '',
    expire: 'XX / XX',
    ccv: '',
    vendor: 'blank',
  });

  return (
    <main className='App'>
      <Top title='Add a new bank card' />
      <Card cardInfo={card} />
      <CardForm
        addCard={addCard}
        setCard={setCard}
        setShowAddCard={setShowAddCard}
      />
    </main>
  );
}

export default AddCard;
