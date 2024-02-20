// const whatsAppApiUrl = 'https://wa.me//';
const whatsAppApiUrl = 'https://api.whatsapp.com/send/';
const contact = {
    phoneNumber: '5541996912437',
    message: 'Meu amigo, irrecusável! A barbie aqui com certeza aceita o convite para um café com esse gatinho 🩷',
};

const acceptBtn = document.getElementById('accept-btn');

acceptBtn.onclick = () => {

    alert(`Ihulllll! Agora, apenas prossiga com a mensagem de confirmação e seu café estará garatido!`);

    const url = whatsAppApiUrl
        .concat(`?phone=`)
        .concat(contact.phoneNumber)
        .concat(`&text=`)
        .concat(contact.message);

    window.open(url, '_blank');
};