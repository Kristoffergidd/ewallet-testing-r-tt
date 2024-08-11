import './Card.css';

import chipDark from '../../assets/chip-dark.svg';
import vendorEvil from '../../assets/vendor-evil.svg';
import vendorBlockchain from '../../assets/vendor-blockchain.svg';
import vendorNinja from '../../assets/vendor-ninja.svg';
import vendorBitcoin from '../../assets/vendor-bitcoin.svg';

function Card(props) {
  const { cardInfo, setActiveCard, activeCard } = props;

  return (
    <article
      className={`card ${cardInfo.vendor} ${
        cardInfo && activeCard && cardInfo.number === activeCard.number
          ? 'hidden'
          : ''
      }`}
      onClick={() => {
        if (setActiveCard) setActiveCard(cardInfo);
      }}
    >
      <header>
        {cardInfo.vendor === 'blank' ? <img src={chipDark} alt='chip' /> : ''}
        {cardInfo.vendor === 'evil' ? (
          <img src={vendorEvil} alt='Evil Corp' />
        ) : (
          ''
        )}
        {cardInfo.vendor === 'blockchain' ? (
          <img src={vendorBlockchain} alt='Blockchain Inc' />
        ) : (
          ''
        )}
        {cardInfo.vendor === 'ninja' ? (
          <img src={vendorNinja} alt='Ninja Bank' />
        ) : (
          ''
        )}
        {cardInfo.vendor === 'bitcoin' ? (
          <img src={vendorBitcoin} alt='Bitcoin Inc' />
        ) : (
          ''
        )}
      </header>
      <section className='number'>{cardInfo.number}</section>
      <section className='info'>
        <aside className='holder'>
          <span>Cardholder Name</span>
          <p>{cardInfo.name}</p>
        </aside>
        <aside className='valid'>
          <span>Valid until</span>
          <p>{cardInfo.expire}</p>
        </aside>
      </section>
    </article>
  );
}

export default Card;
