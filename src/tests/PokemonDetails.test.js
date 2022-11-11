import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

// const pokemonTypeButton = 'pokemon-type-button';
const pokemonNameId = 'pokemon-name';
const pokemonTypeId = 'pokemon-type';
const pokemonWeightId = 'pokemon-weight';
const moreDetailsId = 'More details';
// const nextPokemon = 'next-pokemon';

describe('#PokemonDetails.js\n', () => {
  describe('Testes sobre a rederização das informações do pokémon selecionado na tela\n', () => {
    beforeEach(async () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(moreDetailsId));
    });
    test('(1) A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;', () => {
      expect(screen.getByRole('heading', { name: 'Pikachu Details' })).toBeVisible();
    });
    test('(2) Não deve existir o link de navegação para os detalhes do pokémon selecionado', () => {
      const thereIsBtnDetails = screen.queryByRole('link', { name: moreDetailsId });
      expect(thereIsBtnDetails).not.toBeInTheDocument();
    });
    test('(3) A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const summary = screen.getByRole('heading', { name: 'Summary' });
      expect(summary).toBeVisible();
    });
    test('(4) A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
      // faz o expect do parágrafo do nome
      expect(screen.getByTestId(pokemonNameId)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemonNameId)).toBeVisible();
      // faz o expect do parágrafo do tipo
      expect(screen.getByTestId(pokemonTypeId)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemonTypeId)).toBeVisible();
      // faz o expect do parágrafo do weight
      expect(screen.getByTestId(pokemonWeightId)).toHaveTextContent('Average weight: 6.0 kg');
      expect(screen.getByTestId(pokemonWeightId)).toBeVisible();
      // faz o expect da imagem do pokémon
      const pikachuSprite = screen.getByAltText('Pikachu sprite');
      expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pikachuSprite).toBeVisible();
    });
  });
  describe('Testes sobre a rederização dos mapas da localização do pokémon selecionado\n', () => {
    test('(5) Aa seção de mapas do pokemon deve conte um heading com o texto "Game Locations of <pokémon>"', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(moreDetailsId));

      const pokemonsLocations = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
      expect(pokemonsLocations).toBeVisible();
    });
    test('(6) Todas as localizações do pokémon devem ser mostradas na seção de detalhes', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText('Próximo pokémon')); // Charmander
      userEvent.click(screen.getByText('Próximo pokémon')); // Caterpie
      userEvent.click(screen.getByText(moreDetailsId));

      const pokemonName = screen.getByTestId(pokemonNameId).textContent;
      const pokemon = pokemons.find((pok) => (pok.name === pokemonName));
      const numberOfLocations = pokemon.foundAt.length;

      // verificando quantas imagens referentes a localizaçoes ha na página
      const locationImages = screen.getAllByAltText(/location/i);
      const numImages = locationImages.length;
      expect(numImages).toBe(numberOfLocations);
    });
    test('(7) A imagem da localização deve ter um atributo src com a URL da localização');
    test.todo('(8) A imagem da localização deve ter um atributo alt com o texto "<namePokémon> location"');
  });
  describe('Testes sobre a funcionalidade de favoritar o pokémon selecionado atravéz da página de detalhes\n', () => {
    test.todo('(9) A página deve exibir um checkbox que permite favoritar o pokémon');
    test.todo('(10) Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos');
    test.todo('(11) O label do checkbox deve conter o texto "Pokémon favoritado?"');
  });
});
