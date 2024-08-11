import { describe, test, expect, vi } from 'vitest'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CardForm from './CardForm';

describe('CardForm Component', () => {
  test('Visar felmeddelande om obligatoriska fält inte är ifyllda', () => {
    const addCard = vi.fn(); 
    render(<CardForm addCard={addCard} setCard={() => {}} setShowAddCard={() => {}} />);

    const addButton = screen.getByText('Add a new card');

    fireEvent.click(addButton);

    expect(screen.getByText('Vänligen fyll i alla fält.')).toBeInTheDocument();
  });

  test('Lägger till kort korrekt när alla fält är ifyllda', () => {
    const addCard = vi.fn();
    render(<CardForm addCard={addCard} setCard={() => {}} setShowAddCard={() => {}} />);

    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '1234 5678 9012 3456' } });
    fireEvent.change(screen.getByLabelText('Cardholder Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Valid'), { target: { value: '12/34' } });
    fireEvent.change(screen.getByLabelText('CCV'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Vendor'), { target: { value: 'bitcoin' } });

    const addButton = screen.getByText('Add a new card');
    fireEvent.click(addButton);

    expect(addCard).toHaveBeenCalled(); 
  });

  test('Uppdaterar förhandsgranskningen när inputfälten ändras', () => {
    render(<CardForm addCard={() => {}} setCard={() => {}} setShowAddCard={() => {}} />);

    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '1234 5678 9012 3456' } });

    expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument(); 
  });
});