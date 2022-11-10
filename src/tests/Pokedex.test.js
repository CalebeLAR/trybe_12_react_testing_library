import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// para não ficar repetindo sempre os mesmos metchers do RTL eu resolví refatorar esse código assim.
const pokemon_type_button = 'pokemon-type-button';
const pokemon_name = 'pokemon-name';
const pokemon_type = 'pokemon-type';
const pokemon_weight = 'pokemon-weight';
const next_pokemon = 'next-pokemon';
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
      const btnNextPokemon = screen.getByTestId(next_pokemon);
      expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
      expect(btnNextPokemon).toBeVisible();
    });
  });

  describe('Testes para a exibição dos pokémons da lista, quando o botão "Próximo pokémon" é clicado', () => {
    test('3) os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
      // primeiro pokemón
      const firstPokemonName = screen.getByTestId(pokemon_name);
      expect(firstPokemonName).toHaveTextContent('Pikachu');
      expect(firstPokemonName).toBeVisible();

      userEvent.click(screen.getByTestId(next_pokemon));

      // segundo pokémon
      const secondPokemonName = await screen.findByTestId(pokemon_name);
      expect(secondPokemonName).toHaveTextContent('Charmander');
      expect(secondPokemonName).toBeVisible();

      // verificando se o segundo pokémon não está mais no documento
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    });
    test('4) o primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.', async () => {
      // verificando qual é o primeiro pokemón (Pikachu)
      expect(screen.getByTestId(pokemon_name)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemon_type)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemon_weight)).toHaveTextContent('Average weight: 6.0 kg');

      // clicando até chegar no ultimo pokémon
      userEvent.click(screen.getByTestId(next_pokemon)); // 2 charmander
      userEvent.click(screen.getByTestId(next_pokemon)); // 3 Caterpie
      userEvent.click(screen.getByTestId(next_pokemon)); // 4 Ekans
      userEvent.click(screen.getByTestId(next_pokemon)); // 5 Alakazam
      userEvent.click(screen.getByTestId(next_pokemon)); // 6 Mew
      userEvent.click(screen.getByTestId(next_pokemon)); // 7 Rapidash
      userEvent.click(screen.getByTestId(next_pokemon)); // 8 Snorlax
      userEvent.click(screen.getByTestId(next_pokemon)); // 9 Dragonair
      userEvent.click(screen.getByTestId(next_pokemon)); // 1 pikachu

      // verificando se retorna ao primeiro  pokemón (Pikachu)
      expect(await screen.findByTestId(pokemon_name)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemon_type)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemon_weight)).toHaveTextContent('Average weight: 6.0 kg');
    });
    test('5) deve ser mostrado apenas um pokémon por vez.', async () => {
      // a plicação carrega apenas uma imagem para cada pokemón carregado,
      // isso significa que para cada click no botão deve ser rederizada na tela apenas UM sprite de pokemon por vez'
      const firstSpritesOnScreen = screen.getAllByAltText(/sprite/i);
      expect(firstSpritesOnScreen).toHaveLength(1);
      userEvent.click(screen.getByTestId(next_pokemon));

      const secondSpritesOnScreen = await screen.findAllByAltText(/sprite/i);
      expect(secondSpritesOnScreen).toHaveLength(1);
    });
  });

  describe('Testes para os botões que filtram os pokemóns da Pokédex pelo tipo.', () => {
    test('6) deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
      const typePokemonsButtons = screen.getAllByTestId('pokemon-type-button');
      expect(typePokemonsButtons).toHaveLength(7);
      expect(typePokemonsButtons[0]).toHaveTextContent('Electric');
      expect(typePokemonsButtons[1]).toHaveTextContent('Fire');
      expect(typePokemonsButtons[2]).toHaveTextContent('Bug');
      expect(typePokemonsButtons[3]).toHaveTextContent('Poison');
      expect(typePokemonsButtons[4]).toHaveTextContent('Psychic');
      expect(typePokemonsButtons[5]).toHaveTextContent('Normal');
      expect(typePokemonsButtons[6]).toHaveTextContent('Dragon');
    });
    test('7) a partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo.', async () => {
      // são 7 botões ao todo. quado a aplicação inicia, a pokedex exibe todos os tipos de pokemons
      const typePokemonsButtons = screen.getAllByTestId('pokemon-type-button');
      typePokemonsButtons.forEach(async (button) => {
        await screen.findByTestId(pokemon_name);
        userEvent.click(button);
        const curr = screen.queryByText('Próximo pokémon');
        const isDisable = !curr.disabled;
        if (isDisable) {
          expect(screen.getByTestId(pokemon_type)).toHaveTextContent(button.textContent);
          userEvent.click(screen.getByTestId(pokemon_type));
          expect(screen.getByTestId(pokemon_type)).toHaveTextContent(button.textContent);
        }
        expect(screen.getByTestId(pokemon_type)).toHaveTextContent(button.textContent);
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
    test.todo('9) o botão All precisa estar sempre visível.');
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test.todo('10) o texto do botão deve ser All.');
    test.todo('11) a Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado.');
    test.todo('12) ao carregar a página, o filtro selecionado deverá ser All.');
  });
});
