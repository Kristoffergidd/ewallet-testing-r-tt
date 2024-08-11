import { render, screen, fireEvent } from '@testing-library/react';
import CardStack from './CardStack';
import '@testing-library/jest-dom';

describe('CardStack Component', () => {
  const cards = [
    { number: '1234 5678 1234 5678', name: 'John Doe', expire: '12/25', ccv: '123', vendor: 'bitcoin' },
    { number: '8765 4321 8765 4321', name: 'Jane Doe', expire: '11/24', ccv: '321', vendor: 'blockchain' }
  ];

  test('Visar listan med alla kort', () => {
    render(<CardStack cards={cards} setActiveCard={() => {}} activeCard={null} />);

    expect(screen.getByText('1234 5678 1234 5678')).toBeInTheDocument();
    expect(screen.getByText('8765 4321 8765 4321')).toBeInTheDocument();
  });

  test('Markerar ett kort som aktivt när man klickar på det', () => {
    const setActiveCard = jest.fn();
    render(<CardStack cards={cards} setActiveCard={setActiveCard} activeCard={null} />);

    const card = screen.getByText('1234 5678 1234 5678');
    fireEvent.click(card);

    expect(setActiveCard).toHaveBeenCalledWith(cards[0]);
  });
});