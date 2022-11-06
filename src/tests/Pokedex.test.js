// import { screen } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
// import userEvent from '@testing-library/user-event';

describe('#Pokedex', () => {
  test.todo('Teste se a página contém um heading h2 com o texto Encountered pokémons');
  describe('Testes para a exibição dos pokémons da lista quando o botão "Próximo pokémon" é clicado', () => {
    test.todo('o botão deve conter o texto "Próximo pokémon"');
    test.todo('os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;');
    test.todo('o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.');
    test.todo('deve ser mostrado apenas um pokémon por vez');
  });
  describe('Teste se a Pokédex tem os botões de filtro', () => {
    test.todo('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição');
    test.todo('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo.');
    test.todo('O texto do botão deve corresponder ao nome do tipo, ex. Psychic.');
    test.todo('O botão All precisa estar sempre visível.');
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test.todo('O texto do botão deve ser All;');
    test.todo(' Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado;');
    test.todo('Ao carregar a página, o filtro selecionado deverá ser All');
  });
});
