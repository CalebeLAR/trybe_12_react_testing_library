import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// para não ficar repetindo sempre os mesmos metchers do RTL eu resolví refatorar esse código assim.
const pokemonTypeButton = 'pokemon-type-button';
const pokemonName = 'pokemon-name';
const pokemonType = 'pokemon-type';
const pokemonWeight = 'pokemon-weight';
const nextPokemon = 'next-pokemon';

describe('#Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  describe('Testes para os componentes da janela de exibição dos pokemóns.', () => {
    test('1) a página deve conter um heading h2 com o texto Encountered pokémons', () => {
      const headingPokedex = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
      expect(headingPokedex).toBeVisible();
    });
    test('2) a página deve conter o texto "Próximo pokémon".', () => {
      const btnNextPokemon = screen.getByTestId(nextPokemon);
      expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
      expect(btnNextPokemon).toBeVisible();
    });
  });

  describe('Testes para a exibição dos pokémons da lista, quando o botão "Próximo pokémon" é clicado', () => {
    test('3) os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
      // primeiro pokemón
      const firstPokemonName = screen.getByTestId(pokemonName);
      expect(firstPokemonName).toHaveTextContent('Pikachu');
      expect(firstPokemonName).toBeVisible();

      userEvent.click(screen.getByTestId(nextPokemon));

      // segundo pokémon
      const secondPokemonName = await screen.findByTestId(pokemonName);
      expect(secondPokemonName).toHaveTextContent('Charmander');
      expect(secondPokemonName).toBeVisible();

      // verificando se o segundo pokémon não está mais no documento
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });
    test('4) o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.', async () => {
      // verificando qual é o primeiro pokemón (Pikachu)
      expect(screen.getByTestId(pokemonName)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemonType)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemonWeight)).toHaveTextContent('Average weight: 6.0 kg');

      // clicando até chegar no ultimo pokémon
      userEvent.click(screen.getByTestId(nextPokemon)); // 2 charmander
      userEvent.click(screen.getByTestId(nextPokemon)); // 3 Caterpie
      userEvent.click(screen.getByTestId(nextPokemon)); // 4 Ekans
      userEvent.click(screen.getByTestId(nextPokemon)); // 5 Alakazam
      userEvent.click(screen.getByTestId(nextPokemon)); // 6 Mew
      userEvent.click(screen.getByTestId(nextPokemon)); // 7 Rapidash
      userEvent.click(screen.getByTestId(nextPokemon)); // 8 Snorlax
      userEvent.click(screen.getByTestId(nextPokemon)); // 9 Dragonair
      userEvent.click(screen.getByTestId(nextPokemon)); // 1 pikachu

      // verificando se retorna ao primeiro  pokemón (Pikachu)
      expect(await screen.findByTestId(pokemonName)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemonType)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemonWeight)).toHaveTextContent('Average weight: 6.0 kg');
    });
    test('5) deve ser mostrado apenas um pokémon por vez.', async () => {
      // a plicação carrega apenas uma imagem para cada pokemón carregado,
      // isso significa que para cada click no botão deve ser rederizada na tela apenas UM sprite de pokemon por vez'
      const firstSpritesOnScreen = screen.getAllByAltText(/sprite/i);
      expect(firstSpritesOnScreen).toHaveLength(1);
      userEvent.click(screen.getByTestId(nextPokemon));

      const secondSpritesOnScreen = await screen.findAllByAltText(/sprite/i);
      expect(secondSpritesOnScreen).toHaveLength(1);
    });
  });

  describe('Testes para os botões que filtram os pokemóns da Pokédex pelo tipo.', () => {
    test('6) deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
      const typePokemonsButtons = screen.getAllByTestId(pokemonTypeButton);
      expect(typePokemonsButtons).toHaveLength(7);
      expect(typePokemonsButtons[0]).toHaveTextContent('Electric');
      expect(typePokemonsButtons[1]).toHaveTextContent('Fire');
      expect(typePokemonsButtons[2]).toHaveTextContent('Bug');
      expect(typePokemonsButtons[3]).toHaveTextContent('Poison');
      expect(typePokemonsButtons[4]).toHaveTextContent('Psychic');
      expect(typePokemonsButtons[5]).toHaveTextContent('Normal');
      expect(typePokemonsButtons[6]).toHaveTextContent('Dragon');
    });
    test('7) a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo, e o botão All precisa estar sempre visível.', async () => {
      // são 7 botões ao todo. quado a aplicação inicia, a pokedex exibe todos os tipos de pokemons
      const typePokemonsButtons = screen.getAllByTestId(pokemonTypeButton);
      typePokemonsButtons.forEach(async (button) => {
        await screen.findByTestId(pokemonName);
        userEvent.click(button);
        const curr = screen.queryByTestId(nextPokemon);
        const isDisable = !curr.disabled;
        if (isDisable) {
          expect(screen.getByTestId(pokemonType)).toHaveTextContent(button.textContent);
          expect(screen.getByText('All')).toBeVisible();
          userEvent.click(screen.getByTestId(pokemonType));
          expect(screen.getByTestId(pokemonType)).toHaveTextContent(button.textContent);
          expect(screen.getByText('All')).toBeVisible();
        }
        expect(screen.getByTestId(pokemonType)).toHaveTextContent(button.textContent);
        expect(screen.getByText('All')).toBeVisible();
      });
    });
    test('8) o texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      const types = typeButtons.map((btn) => btn.textContent);
      typeButtons.forEach((button) => {
        const currentTextButton = button.textContent;
        const typecurrentTextButton = types[types.indexOf(currentTextButton)];
        expect(currentTextButton).toBe(typecurrentTextButton);
      });
    });
    test('9) o botão All precisa estar sempre visível.', () => {
      expect(screen.getByText('All')).toBeVisible();
    });
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('10) o texto do botão deve ser All.', async () => {
      expect(screen.getByText('All')).toHaveTextContent('All');
      expect(screen.getByText('All')).toBeInTheDocument();
    });
    test('11) a Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado.', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Psychic' }));
      expect(await screen.findByTestId(pokemonName)).toHaveTextContent('Alakazam');
      userEvent.click(screen.getByRole('button', { name: 'All' }));
      expect(await screen.findByTestId(pokemonName)).toHaveTextContent('Pikachu');
    });
    test('12) ao carregar a página, o filtro selecionado deverá ser All.', () => {
      expect(screen.getByText('All')).toHaveTextContent('All');
      expect(screen.getByText('All')).toBeInTheDocument();
    });
  });
});
