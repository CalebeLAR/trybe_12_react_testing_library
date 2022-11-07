import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// para não ficar repetindo sempre os mesmos metchers do RTL eu resolví refatorar esse código assim.
const getPokemonNameByTestId = () => screen.getByTestId('pokemon-name');
const getPokemonTypeByTestId = () => screen.getByTestId('pokemon-type');
const getPokemonWeightByTestId = () => screen.getByTestId('pokemon-weight');
const findPokemonNameByTestId = async () => screen.findByTestId('pokemon-name');

describe('#Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const getButtonNext = () => screen.getByTestId('next-pokemon');

  describe('Testes para os componentes da janela de exibição dos pokemóns.', () => {
    test('1) a página deve conter um heading h2 com o texto Encountered pokémons', () => {
      const headingPokedex = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
      expect(headingPokedex).toBeVisible();
    });
    test('2) a página deve conter o texto "Próximo pokémon".', () => {
      const btnNextPokemon = getButtonNext();
      expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
      expect(btnNextPokemon).toBeVisible();
    });
  });
  describe('Testes para a exibição dos pokémons da lista, quando o botão "Próximo pokémon" é clicado', () => {
    test('3) os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
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
    test('4) o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.', async () => {
      // verificando qual é o primeiro pokemón (Pikachu)
      expect(getPokemonNameByTestId()).toHaveTextContent('Pikachu');
      expect(getPokemonTypeByTestId()).toHaveTextContent('Electric');
      expect(getPokemonWeightByTestId()).toHaveTextContent('Average weight: 6.0 kg');

      // clicando até chegar no ultimo pokémon
      userEvent.click(getButtonNext()); // 2 charmander
      userEvent.click(getButtonNext()); // 3 Caterpie
      userEvent.click(getButtonNext()); // 4 Ekans
      userEvent.click(getButtonNext()); // 5 Alakazam
      userEvent.click(getButtonNext()); // 6 Mew
      userEvent.click(getButtonNext()); // 7 Rapidash
      userEvent.click(getButtonNext()); // 8 Snorlax
      userEvent.click(getButtonNext()); // 9 Dragonair
      userEvent.click(getButtonNext()); // 1 pikachu

      // verificando se retorna ao primeiro  pokemón (Pikachu)
      expect(getPokemonNameByTestId()).toHaveTextContent('Pikachu');
      expect(getPokemonTypeByTestId()).toHaveTextContent('Electric');
      expect(getPokemonWeightByTestId()).toHaveTextContent('Average weight: 6.0 kg');
    });
    test.todo('5) deve ser mostrado apenas um pokémon por vez.');
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
