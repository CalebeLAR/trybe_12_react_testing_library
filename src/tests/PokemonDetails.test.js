import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { act } from 'react-dom/test-utils';

// const pokemonTypeButton = 'pokemon-type-button';
const pokemonNameId = 'pokemon-name';
const pokemonTypeId = 'pokemon-type';
const pokemonWeightId = 'pokemon-weight';
const moreDetailsId = 'More details';
const próximoPokémon = 'Próximo pokémon';
// const nextPokemon = 'next-pokemon';

describe('\n#PokemonDetails.js', () => {
  describe('\nTestes sobre a rederização das informações do pokémon selecionado na tela', () => {
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
      // faz o expect da descrição do pokemon
      const decription = screen.getByText(/with electricity to make them tender/i);
      expect(decription).toBeVisible();
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
  describe('\nTestes sobre a rederização dos mapas da localização do pokémon selecionado', () => {
    test('(5) Aa seção de mapas do pokemon deve conte um heading com o texto "Game Locations of <pokémon>"', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(moreDetailsId));

      const pokemonsLocations = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
      expect(pokemonsLocations).toBeVisible();
    });
    test('(6) Todas as localizações do pokémon devem ser mostradas na seção de detalhes', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(próximoPokémon)); // Charmander
      userEvent.click(screen.getByText(próximoPokémon)); // Caterpie
      userEvent.click(screen.getByText(moreDetailsId));

      const pokemonName = screen.getByTestId(pokemonNameId).textContent;
      const pokemon = pokemons.find((pok) => (pok.name === pokemonName));
      const numberOfLocations = pokemon.foundAt.length;

      // verificando quantas imagens referentes a localizaçoes ha na página
      const locationImages = screen.getAllByAltText(/location/i);
      const numImages = locationImages.length;
      expect(numImages).toBe(numberOfLocations);
    });
    test('(7) A imagem da localização deve ter um atributo src com a URL da localização', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(próximoPokémon)); // Charmander
      userEvent.click(screen.getByText(moreDetailsId));

      // pegando quantos locais o pokemons DEVE ter.
      const pokemonName = screen.getByTestId(pokemonNameId).textContent;
      const pokemon = pokemons.find((pok) => (pok.name === pokemonName));
      const listLocations = pokemon.foundAt;
      const srcList = listLocations.map((location) => location.map);

      // pegando todas as imagens que estão sendo renderizadas na tela;
      const locationImages = screen.getAllByAltText(/location/i);

      // verificando se está sendo renderizada uma imagem, com o SRC certo,
      // para cada localização que o pokémon deve ter.
      locationImages.forEach((locationImage) => {
        const i = srcList.indexOf(locationImage.src);
        expect(i).not.toBe(undefined);
        expect(locationImage).toHaveAttribute('src', srcList[i]);
      });
    });
    test('(8) A imagem da localização deve ter um atributo alt com o texto "<namePokémon> location"', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(próximoPokémon)); // Charmander
      userEvent.click(screen.getByText(moreDetailsId));

      // pegando quantos locais o pokemons DEVE ter.
      const pokemonName = screen.getByTestId(pokemonNameId).textContent;

      // pegando todas as imagens que estão sendo renderizadas na tela;
      const locationImages = screen.getAllByAltText(/location/i);

      // verificando se está sendo renderizada uma imagem,
      // com o ALT certo, para cada localização que o pokémon deve ter.
      locationImages.forEach((locationImage) => {
        expect(locationImage).toHaveAttribute('alt', `${pokemonName} location`);
      });
    });
  });
  describe('\nTestes sobre a funcionalidade de favoritar o pokémon selecionado atravéz da página de detalhes', () => {
    test('(9) A página deve exibir um checkbox que permite favoritar o pokémon', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(próximoPokémon)); // Charmander
      userEvent.click(screen.getByText(moreDetailsId));

      const checkBox = screen.getByLabelText('Pokémon favoritado?');
      expect(checkBox).toBeVisible();
    });
    test('(10) Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos', async () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/pokemons/4'); // Charmander details
      });

      // acha o checkBox desfavoritado
      expect(screen.getByLabelText('Pokémon favoritado?')).not.toBeChecked();

      // favorita o pokemon
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();
      const beforefavoriteStar = await screen.findByAltText(/marked as favorite/i);
      expect(beforefavoriteStar).toHaveAttribute('src', '/star-icon.svg');
      expect(beforefavoriteStar).toBeVisible();

      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      expect(screen.getByLabelText('Pokémon favoritado?')).not.toBeChecked();

      const afterFavoriteStar = screen.queryByAltText(/marked as favorite/i);
      expect(afterFavoriteStar).toBe(null);
      expect(afterFavoriteStar).not.toBeInTheDocument();
      // expect(favoriteStar).toBeVisible();

      // act(() => {
      //   history.push('/favorites'); // Caterpie details
      // });

      // acha o checkBox desfavoritado
      // expect(screen.getByLabelText('Pokémon favoritado?')).not.toBeChecked();

      // // favorita o pokemon
      // userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      // expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();
    });
    test('(11) para cada imagem de local do pokémon, deve ter um parágrafo com seu respequitivo nome.', async () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByText(próximoPokémon)); // Charmander
      userEvent.click(screen.getByText(próximoPokémon)); // Caterpie
      userEvent.click(screen.getByText(próximoPokémon)); // Ekans
      userEvent.click(screen.getByText(moreDetailsId));

      const pokemonName = screen.getByTestId(pokemonNameId).textContent; // Ekans

      // pega quantos locais o pokemons DEVE ter.
      const pokemon = pokemons.find((pok) => (pok.name === pokemonName));
      const listLocations = pokemon.foundAt;
      const namesLocations = listLocations.map((location) => location.location);

      // verifica se pra cala localização existe uma tag <em> com o texto da localização na tela.
      namesLocations.forEach((nameLocation) => {
        const tagEM = screen.getByText(nameLocation);
        expect(tagEM).toBeVisible();
      });
    });
  });
});
