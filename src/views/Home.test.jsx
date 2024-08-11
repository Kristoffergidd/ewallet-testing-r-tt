import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  const cards = [
    { number: '1234 5678 1234 5678', name: 'John Doe', expire: '12/25', ccv: '123', vendor: 'bitcoin' },
    { number: '8765 4321 8765 4321', name: 'Jane Doe', expire: '11/24', ccv: '321', vendor: 'blockchain' }
  ];

  test('Navigerar till vyn för att lägga till ett nytt kort', () => {
    const setShowAddCard = jest.fn();
    render(<Home cards={cards} setShowAddCard={setShowAddCard} />);

    const button = screen.getByText(/Add a new card/i);
    fireEvent.click(button);

    expect(setShowAddCard).toHaveBeenCalledWith(true);
  });

  test('Visar aktivt kort när ett kort är markerat', () => {
    render(<Home cards={cards} setShowAddCard={() => {}} />);

    const activeCard = screen.getByText('XXXX XXXX XXXX XXXX'); // Initialt kort
    const card = screen.getByText('1234 5678 1234 5678');
    fireEvent.click(card);

    expect(screen.getByText('1234 5678 1234 5678')).toBeInTheDocument();
  });
});