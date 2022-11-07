import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('#Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const getButtonNext = () => screen.getByTestId('next-pokemon');

  describe('Testes para a janela de exibição dos pokemóns.', () => {
    test('a página deve conter um heading h2 com o texto Encountered pokémons', () => {
      const headingPokedex = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
      expect(headingPokedex).toBeVisible();
    });
    test('a página deve conter o texto "Próximo pokémon".', () => {
      const btnNextPokemon = getButtonNext();
      expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
      expect(btnNextPokemon).toBeVisible();
    });
  });
  describe('Testes para a exibição dos pokémons da lista, quando o botão "Próximo pokémon" é clicado', () => {
    const getPokemonNameByTestId = () => screen.getByTestId('pokemon-name');
    const findPokemonNameByTestId = async () => screen.findByTestId('pokemon-name');

    test('os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
      // primeiro pokemón
      const firstPokemonName = getPokemonNameByTestId();
      expect(firstPokemonName).toHaveTextContent('Pikachu');
      expect(firstPokemonName).toBeVisible();

      userEvent.click(getButtonNext());

      // segundo pokémon
      const secondPokemonName = await findPokemonNameByTestId();
      expect(secondPokemonName).toHaveTextContent('Charmander');
      expect(secondPokemonName).toBeVisible();

      // verificando se o segundo pokémon não está mais no documento
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });
    test('o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.', async () => {
      // verificando qual é o primeiro pokemón (Pikachu)
      const firstPokemonName = getPokemonNameByTestId();
      const firstPokemonType = screen.getByTestId('pokemon-type');
      const firstPokemonWeight = screen.getByTestId('pokemon-weight');
      expect(firstPokemonName).toHaveTextContent('Pikachu');
      expect(firstPokemonType).toHaveTextContent('Electric');
      expect(firstPokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

      // clicando até chegar no ultimo pokémon
      const btnNextPokemon = screen.getByTestId('next-pokemon');
      userEvent.click(btnNextPokemon); // 2 charmander
      userEvent.click(btnNextPokemon); // 3 Caterpie
      userEvent.click(btnNextPokemon); // 4 Ekans
      userEvent.click(btnNextPokemon); // 5 Alakazam
      userEvent.click(btnNextPokemon); // 6 Mew
      userEvent.click(btnNextPokemon); // 7 Rapidash
      userEvent.click(btnNextPokemon); // 8 Snorlax
      userEvent.click(btnNextPokemon); // 9 Dragonair

      userEvent.click(btnNextPokemon); // 1 pikachu
      const pokemonName = await findPokemonNameByTestId();
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonName).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    });
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
