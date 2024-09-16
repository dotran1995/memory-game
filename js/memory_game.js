document.addEventListener('DOMContentLoaded', () => {
    const cards = ['🐶', '🐱', '🦊', '🐸', '🐻', '🐼', '🐵', '🦁'];
    const deck = [...cards, ...cards];
    const gameBoard = document.getElementById('game-board');
    let shuffledDeck = deck.sort(() => 0.5 - Math.random());
    let selectedCards = [];
    let matchedPairs = 0;

    shuffledDeck.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.innerHTML = '❓';  // Hidden state of the card
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', () => {
            if (selectedCards.length < 2 && !cardElement.classList.contains('flipped')) {
                cardElement.innerHTML = card;
                cardElement.classList.add('flipped');
                selectedCards.push({ card, index });

                if (selectedCards.length === 2) {
                    setTimeout(checkMatch, 1000);
                }
            }
        });
    });

    function checkMatch() {
        const [first, second] = selectedCards;
        if (first.card === second.card && first.index !== second.index) {
            matchedPairs += 1;
            document.querySelectorAll('.flipped').forEach(card => {
                card.classList.add('matched');
            });
        } else {
            document.querySelectorAll('.flipped').forEach(card => {
                card.innerHTML = '❓';
            });
        }
        selectedCards = [];
        document.querySelectorAll('.flipped').forEach(card => card.classList.remove('flipped'));

        if (matchedPairs === cards.length) {
            setTimeout(() => alert('You Win!'), 500);
        }
    }
});
