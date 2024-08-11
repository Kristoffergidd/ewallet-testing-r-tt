import { render, screen, fireEvent } from '@testing-library/react';
import AddCard from './AddCard';
import '@testing-library/jest-dom';

describe('AddCard Component', () => {
  test('Visar förhandsgranskning av kortet när data matas in', () => {
    render(<AddCard addCard={() => {}} setShowAddCard={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('XXXX XXXX XXXX XXXX'), { target: { value: '1234 5678 1234 5678' } });
    fireEvent.change(screen.getByPlaceholderText('Firstname Lastname'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('XX / XX'), { target: { value: '12/25' } });

    expect(screen.getByText('1234 5678 1234 5678')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('12/25')).toBeInTheDocument();
  });
});