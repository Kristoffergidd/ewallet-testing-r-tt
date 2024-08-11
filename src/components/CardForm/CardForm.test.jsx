import { describe, test, expect, vi } from 'vitest'; 
import { render, screen, fireEvent } from '@testing-library/react' ;
/*
import '@testing-library/jest-dom'; */
import CardForm from './CardForm';

describe('CardForm Component', () => {


  it('Visar felmeddelande om obligatoriska fält inte är ifyllda', async () => {
    const addCard = vi.fn(); 
    render(<CardForm addCard={addCard} setCard={() => {}} setShowAddCard={() => {}} />);

    const addButton = screen.getByText('Add a new card');

    fireEvent.click(addButton);

    expect(screen.getByText('Vänligen fyll i alla fält.')).toBeInTheDocument();
  });

  it('should add a new card to the list when all fields are filled and the button is clicked', () => {
    const addCard = vi.fn();
    const setCard = vi.fn();
    const setShowAddCard = vi.fn();

    render(<CardForm addCard={addCard} setCard={setCard} setShowAddCard={setShowAddCard} />);
    const cardNumberInput = screen.getByPlaceholderText('XXXX XXXX XXXX XXXX');
    const cardHolderInput = screen.getByPlaceholderText('Firstname Lastname');
    const expireInput = screen.getByPlaceholderText('XX / XX');
    const ccvInput = screen.getByPlaceholderText('XXX');
    const vendorSelect = screen.getByLabelText('Vendor');
    const addButton = screen.getByText('Add a new card');


    // Fill out the form
    fireEvent.keyUp(cardNumberInput, { target: { value: '1234 5678 1234 5678' } });
    fireEvent.keyUp(cardHolderInput, { target: { value: 'John Doe' } });
    fireEvent.keyUp(expireInput, { target: { value: '12/34' } });
    fireEvent.keyUp(ccvInput, { target: { value: '123' } });
    fireEvent.change(vendorSelect, { target: { value: 'bitcoin' } });

    // Click the button
    fireEvent.click(addButton);

    expect(addCard).toHaveBeenCalledWith({
      number: '1234 5678 1234 5678',
      name: 'John Doe',
      expire: '12/34',
      ccv: '123',
      vendor: 'bitcoin',
    });

    expect(setShowAddCard).toHaveBeenCalled();
  });

  it('Uppdaterar förhandsgranskningen när inputfälten ändras', () => {
    render(<CardForm addCard={() => {}} setCard={() => {}} setShowAddCard={() => {}} />);

    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '1234 5678 9012 3456' } });

    expect(screen.getByLabelText('Card Number').value).toBe('1234 5678 9012 3456');
});
}); 

