import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <FavoritePokemons />', () => {
  test('Caso a pessoa não tenha pokémons favoritos deve ser exibida na tela a mensagem "No favorite pokemon found".', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorites');
    });
    await screen.findByText('Favorite pokémons');
    const favoritado = screen.queryByText(/No favorite pokemon found/i);
    expect(favoritado).toBeVisible();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', async () => {
    renderWithRouter(<App />);
    // aperta nos detalhes do pokémons
    const btnMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnMoreDetails);

    // perta no pokém
    const btnFav = await screen.findByLabelText('Pokémon favoritado?');
    userEvent.click(btnFav);

    // vai para a pagina dos favoritos
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const img = await screen.findByAltText('Pikachu is marked as favorite');
    expect(img).toBeVisible();
  });
});
