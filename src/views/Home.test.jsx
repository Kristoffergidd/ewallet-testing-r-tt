import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';

  describe('Home Component', () => {
    it('Navigates to the view to add a new card', () => {
      const setShowAddCard = vi.fn();
  
      // Provide mock data for cards
      const mockCards = [
        { id: 1, number: '1234 5678 1234 5678', name: 'Card 1' },
        { id: 2, number: '9876 5432 9876 5432', name: 'Card 2' },
      ];
  
      // Render the Home component with mock data
      render(<Home setShowAddCard={setShowAddCard} cards={mockCards} />);
  
      // Simulate a click on the "Add a new card" button
      const addCardButton = screen.getByText('Add a new card');
      fireEvent.click(addCardButton);
  
      // Ensure the function was called once
      expect(setShowAddCard).toHaveBeenCalledTimes(1);
  
      // Ensure the function was called with a function (toggle function)
      expect(typeof setShowAddCard.mock.calls[0][0]).toBe('function');
  
      // Simulate the toggle by manually calling the function with initial state as false
      const toggleFunction = setShowAddCard.mock.calls[0][0];
      const newState = toggleFunction(false); // Assuming initial state is false
      expect(newState).toBe(true); // The state should toggle to true
    });
  
    it('Sets card as active when clicked', () => {
        const mockCards = [
          { id: 1, number: '1234 5678 1234 5678', name: 'Card 1' },
          { id: 2, number: '9876 5432 9876 5432', name: 'Card 2' },
        ];
      
        const { container } = render(<Home cards={mockCards} />);
      
        // Simulate clicking on the first card
        const card = screen.getByText('1234 5678 1234 5678');
        fireEvent.click(card);
      
        // Check the clicked card is the active card
        // by checking if the first article element under the main element has the expect values
        const activeCard = container.querySelector('main > article');
        expect(activeCard).not.toBeNull();
        expect(activeCard).toHaveTextContent('1234 5678 1234 5678'); // Ensure this is the right card
      });

      it('Ensures only one card is active at a time', () => {
        const mockCards = [
          { id: 1, number: '1234 5678 1234 5678', name: 'Card 1' },
          { id: 2, number: '9876 5432 9876 5432', name: 'Card 2' },
        ];
      
        const { container } = render(<Home cards={mockCards} />);
      
        // Click the first card to make it active
        const cardStack = container.querySelector('section.card-stack');
        const firstCardArticle = cardStack.firstChild;
        fireEvent.click(firstCardArticle);
      
        let activeCard = container.querySelector('main > article');
        expect(activeCard).not.toBeNull();
        // Expect the active card article to have the text content of the first card
        expect(activeCard).toHaveTextContent('1234 5678 1234 5678'); 
        expect(firstCardArticle).toHaveClass('hidden');
      
        // Click the second card to make it active
        const secondCardArticle = cardStack.lastChild;
        fireEvent.click(secondCardArticle);
      
        //Refresh the active card after clicking the second card
        activeCard = container.querySelector('main > article');
        expect(activeCard).not.toBeNull();
        // Expect the active card article to have the text content of the second card
        expect(activeCard).toHaveTextContent('9876 5432 9876 5432'); 
        expect(secondCardArticle).toHaveClass('hidden');

        // Ensure the first card is not active
        expect(firstCardArticle).not.toHaveClass('hidden');

      });
  });