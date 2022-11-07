import { findByTestId, findByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('#Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  describe('Testes para a janela de exibição dos pokemóns.', () => {
    test('a página deve conter um heading h2 com o texto Encountered pokémons', () => {
      const headingPokedex = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
      expect(headingPokedex).toBeVisible();
    });
  });
  describe('Testes para a exibição dos pokémons da lista, quando o botão "Próximo pokémon" é clicado', () => {
    test('o botão deve conter o texto "Próximo pokémon".', () => {
      const btnNextPokemon = screen.getByTestId('next-pokemon');
      expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
      expect(btnNextPokemon).toBeVisible();
    });
    test('os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
      // primeiro pokemón
      const firstPokemonName = screen.getByTestId('pokemon-name');
      expect(firstPokemonName).toHaveTextContent('Pikachu');
      expect(firstPokemonName).toBeVisible();

      userEvent.click(screen.getByTestId('next-pokemon'));

      // segundo pokémon
      const secondPokemonName = await screen.findByTestId('pokemon-name');
      expect(secondPokemonName).toHaveTextContent('Charmander');
      expect(secondPokemonName).toBeVisible();

      // verificando se o segundo pokémon não está mais no documento
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });
    test.todo('o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.');
    test.todo('deve ser mostrado apenas um pokémon por vez.');
  });
  describe('Testes para os botões que filtram os pokemóns da Pokédex pelo tipo.', () => {
    test.todo('deve existir um botão de filtragem para cada tipo de pokémon, sem repetição');
    test.todo('a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo.');
    test.todo('o texto do botão deve corresponder ao nome do tipo, ex. Psychic.');
    test.todo('o botão All precisa estar sempre visível.');
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test.todo('o texto do botão deve ser All.');
    test.todo('a Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado.');
    test.todo('ao carregar a página, o filtro selecionado deverá ser All.');
  });
});
