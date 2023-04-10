class Hotel {
  constructor(id, nome, endereco, telefone) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
  }

  salvarLocalStorage() {
    localStorage.setItem('nomeDoHotel', this.nome);
    localStorage.setItem('enderecoDoHotel', this.endereco);
    localStorage.setItem('telefoneDoHotel', this.telefone);
  }
}

const hotels = [
  new Hotel(
    'hotel-1',
    'Pullman Paris Tour Eiffel',
    '18 Avenue De Suffren, 22 Rue Jean Rey Entrée Au, 75015, Paris, França',
    '+33 1 44 38 56 00'
  ),
  new Hotel(
    'hotel-2',
    'Hôtel Rosalie',
    '8 Bis Av. de la Soeur Rosalie, 75013 Paris, França',
    '+33 1 43 36 62 00'
  ),
  new Hotel(
    'hotel-3',
    "L'Empire Paris",
    "48 Rue de l'Arbre Sec, 75001 Paris, França",
    '+33 1 40 15 06 06'
  ),
  new Hotel(
    'hotel-4',
    'Pavillon Monceau Hotel',
    "43 Rue Jouffroy d'Abbans, 75017 Paris, França",
    '+33 1 56 79 25 00'
  ),
  new Hotel(
    'hotel-5',
    'Hôtel Château Frontenac',
    '54 Rue Pierre Charron, 75008 Paris, França',
    '+33 1 53 23 13 00'
  ),
];

document.addEventListener('DOMContentLoaded', () => {
  const nomeDoHotel = document.querySelector('#hotel-name');
  const enderecoDoHotel = document.querySelector('#hotel-address');
  const telefoneDoHotel = document.querySelector('#hotel-phone');

  nomeDoHotel.innerHTML = localStorage.getItem('nomeDoHotel');
  enderecoDoHotel.innerHTML = localStorage.getItem('enderecoDoHotel');
  telefoneDoHotel.innerHTML = localStorage.getItem('telefoneDoHotel');
});

hotels.forEach((hotel) => {
  const hotelElement = document.querySelector(`#${hotel.id}`);
  hotelElement.addEventListener('click', () => {
    hotel.salvarLocalStorage();
    window.location.href = 'hospedagem.html';
  });
});
