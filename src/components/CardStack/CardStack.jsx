import './CardStack.css';

import Card from '../Card/Card';

function CardStack(props) {
  const { cards, setActiveCard, activeCard } = props;

  const cardItems = cards.map((card, index) => {
    return (
      <Card
        cardInfo={card}
        setActiveCard={setActiveCard}
        activeCard={activeCard}
        key={index}
      />
    );
  });

  return <section className='card-stack'>{cardItems}</section>;
}

export default CardStack;
