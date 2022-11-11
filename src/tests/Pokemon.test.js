import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('#Pokemon', () => {
  const MoreDetails = 'More details';
  describe('Testes referentes ao card com as informações do pokémon', () => {
    test('(1) o link de detalhes do pokemon deve redirecionamentar para a página de detalhes de pokémon', async () => {
      renderWithRouter(<App />);
      const pikachu = screen.getByText('Pikachu');
      expect(pikachu).toBeVisible();

      const pikachuType = screen.getByTestId('pokemon-type');
      expect(pikachuType).toHaveTextContent('Electric');
      expect(pikachuType).toBeVisible();

      const pikachuImage = screen.getByAltText('Pikachu sprite');
      expect(pikachuImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pikachuImage).toBeVisible();

      const linkDetails = screen.getByText(MoreDetails);
      expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
      expect(linkDetails).toBeVisible();
    });
    test('(2) a página de detalhes deve ter um URL com a configuração /pokemon/<id do pokemon>', async () => {
      const { history } = renderWithRouter(<App />);
      expect(screen.getByText('Pikachu')).toBeVisible();

      const linkDetails = screen.getByText(MoreDetails);
      userEvent.click(linkDetails);

      await screen.findByText('Pikachu Details');
      expect(history.location.pathname).toBe('/pokemons/25');
    });
  });
  describe('Testes referentes aos pokemons favoritados', () => {
    test('(3) o ícone do pokemon favoritado deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg', async () => {
      renderWithRouter(<App />);

      // entrar na páginade detalhes
      userEvent.click(screen.getByText(MoreDetails));
      await screen.findByText('Pikachu Details');

      // clicar no checkBox para favoritar
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));

      // verifica se na imagem do pokemon aparece o icone de uma estrela
      const favoriteStar = await screen.findByAltText('Pikachu is marked as favorite');
      expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
      expect(favoriteStar).toBeVisible();
    });
  });
});
