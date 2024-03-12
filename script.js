const cards = document.querySelectorAll('.card');

/**
 * @param {HTMLDivElement} card 
 */
function getActionSectionFromCard(card) {
    return card.querySelector('.action');
}

/**
 * @param {NodeListOf<HTMLDivElement>} cards 
 */
function removeAllActions(cards) {
    cards.forEach(card => (getActionSectionFromCard(card).innerHTML = ``));
}

for (const card of cards) { 

    card.addEventListener(`click`, () => {

        removeAllActions(cards);

        const link = card.getAttribute(`data-link`);
        const actionBtn = document.createElement(`button`);

        const actionBtnClasses = [
            'w-full',
            'p-2',
            'bg-pink-600',
            'text-white',
            'rounded-md',
            'text-center',
            'text-sm',
            'transition-all',
            'hover:brightness-110',
            'focus:brightness-110'
        ];

        actionBtn.innerHTML = `Abrir este app`
        actionBtn.classList.add(...actionBtnClasses);

        actionBtn.onclick = () => {
            window.location.href = link;
        };

        getActionSectionFromCard(card).appendChild(actionBtn);

    })
}

