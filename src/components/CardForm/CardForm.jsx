import { useEffect, useState } from 'react';
import './CardForm.css';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

function CardForm(props) {
  const { addCard, setCard, setShowAddCard } = props;

  const [cardNumber, setCardNumber] = useState();
  const [cardName, setCardName] = useState();
  const [expireDate, setExpireDate] = useState();
  const [ccv, setCCV] = useState();
  const [vendor, setVendor] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  function onClick(event) {
    event.preventDefault();

    try {
      validateFieldsFilled();
      validate(
        /[0-9]{4}[\s]{1}[0-9]{4}[\s]{1}[0-9]{4}[\s]{1}[0-9]{4}/g,
        'Fyll i kortnummer enligt korrekt format XXXX XXXX XXXX XXXX.',
        cardNumber
      );
      validate(
        /[0-9]{2}[\/]{1}[0-9]{2}/g,
        'Fyll i datum enligt korrekt format XX/XX.',
        expireDate
      );

      const card = {
        number: cardNumber,
        name: cardName,
        expire: expireDate,
        ccv: ccv,
        vendor: vendor,
      };

      addCard(card);
      setShowAddCard((prevState) => {
        return !prevState;
      });
    } catch ({ message }) {
      setErrorMessage(message);
    }
  }

  function updateCard() {
    const card = {
      number: cardNumber ? cardNumber : 'XXXX XXXX  XXXX XXXX',
      name: cardName,
      expire: expireDate ? expireDate : 'XX / XX',
      ccv: ccv,
      vendor: vendor ? vendor : 'blank',
    };

    setCard(card);
  }

  useEffect(() => {
    updateCard();
  }, [cardNumber, cardName, expireDate, ccv, vendor]);

  function validate(regexPattern, error, input) {
    try {
      const regex = regexPattern;
      const valid = input.match(regex);

      if (!valid) throw Error(error);

      return true;
    } catch (error) {
      throw Error(error);
    }
  }

  function validateFieldsFilled() {
    try {
      if (cardNumber && cardName && expireDate && ccv && vendor) return true;

      throw Error('Vänligen fyll i alla fält.');
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <form className='card-form'>
      <label htmlFor='number' className='col-2'>
        Card Number
      </label>
      <input
        type='text'
        id='number'
        className='col-2'
        maxLength='19'
        placeholder='XXXX XXXX XXXX XXXX'
        onKeyUp={(event) => {
          setCardNumber(event.target.value);
        }}
      />
      <label htmlFor='cardholder' className='col-2'>
        Cardholder Name
      </label>
      <input
        type='text'
        id='cardholder'
        className='col-2'
        maxLength='24'
        placeholder='Firstname Lastname'
        onKeyUp={(event) => {
          setCardName(event.target.value);
        }}
      />
      <label htmlFor='expireDate' className='col-1'>
        Valid
      </label>
      <label htmlFor='ccv' className='col-1'>
        CCV
      </label>
      <input
        type='text'
        id='expireDate'
        className='col-1'
        placeholder='XX / XX'
        onKeyUp={(event) => {
          setExpireDate(event.target.value);
        }}
      />
      <input
        type='text'
        id='ccv'
        className='col-1'
        maxLength={3}
        placeholder='XXX'
        onKeyUp={(event) => {
          setCCV(event.target.value);
        }}
      />
      <label htmlFor='vendor' className='col-2'>
        Vendor
      </label>
      <select
        id='vendor'
        className='col-2'
        onChange={(event) => {
          setVendor(event.target.value);
        }}
      >
        <option value=''>--Select vendor--</option>
        <option value='bitcoin'>Bitcoin Inc</option>
        <option value='blockchain'>Blockchain Inc</option>
        <option value='evil'>Evil Corp</option>
        <option value='ninja'>Ninja Bank</option>
      </select>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : ''}
      <button className='button col-2' onClick={onClick}>
        Add a new card{' '}
      </button>
    </form>
  );
}

export default CardForm;
