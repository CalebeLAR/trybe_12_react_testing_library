import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// const pokemonTypeButton = 'pokemon-type-button';
const pokemonName = 'pokemon-name';
const pokemonType = 'pokemon-type';
const pokemonWeight = 'pokemon-weight';
const moreDetais = 'More details';
// const nextPokemon = 'next-pokemon';

describe('#PokemonDetails.js', () => {
  beforeEach(async () => {
    renderWithRouter(<App />);
    // Favoritanda o pikachu e entra na pagina de detalhes dele, em todos os testes.
    userEvent.click(screen.getByText('More details'));
    // await screen.findByText('Pikachu Details');
    // userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    // userEvent.click(await screen.findByLabelText('Pokémon favoritado?'));
    // userEvent.click(await screen.findByText('Home'));
    // userEvent.click(await screen.findByText('More details'));
  });
  describe('Testes sobre a rederização das informações do pokémon selecionado na tela', () => {
    test('(1) A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;', () => {
      expect(screen.getByRole('heading', { name: 'Pikachu Details' })).toBeVisible();
    });
    test('(2) Não deve existir o link de navegação para os detalhes do pokémon selecionado', () => {
      const thereIsBtnDetails = screen.queryByRole('link', { name: moreDetais });
      expect(thereIsBtnDetails).not.toBeInTheDocument();
    });
    test('(3) A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const summary = screen.getByRole('heading', { name: 'Summary' });
      expect(summary).toBeVisible();
    });
    test('(4) A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
      // faz o expect do parágrafo do nome
      expect(screen.getByTestId(pokemonName)).toHaveTextContent('Pikachu');
      expect(screen.getByTestId(pokemonName)).toBeVisible();
      // faz o expect do parágrafo do tipo
      expect(screen.getByTestId(pokemonType)).toHaveTextContent('Electric');
      expect(screen.getByTestId(pokemonType)).toBeVisible();
      // faz o expect do parágrafo do weight
      expect(screen.getByTestId(pokemonWeight)).toHaveTextContent('Average weight: 6.0 kg');
      expect(screen.getByTestId(pokemonWeight)).toBeVisible();
      // faz o expect da imagem do pokémon
      const pikachuSprite = screen.getByAltText('Pikachu sprite');
      expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pikachuSprite).toBeVisible();
    });
  });
  describe('Testes sobre a rederização dos mapas da localização do pokémon selecionado', () => {
    test('(5) Aa seção de mapas do pokemon deve conte um heading com o texto "Game Locations of <pokémon>"', () => {
      const pokemonsLocations = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
      expect(pokemonsLocations).toBeVisible();
    });
    test.todo('(6) Todas as localizações do pokémon devem ser mostradas na seção de detalhes');
    test.todo('(7) A imagem da localização deve ter um atributo src com a URL da localização');
    test.todo('(8) A imagem da localização deve ter um atributo alt com o texto "<namePokémon> location"');
  });
  describe('Testes sobre a funcionalidade de favoritar o pokémon selecionado atravéz da página de detalhes', () => {
    test.todo('(9) A página deve exibir um checkbox que permite favoritar o pokémon');
    test.todo('(10) Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos');
    test.todo('(11) O label do checkbox deve conter o texto "Pokémon favoritado?"');
  });
});
