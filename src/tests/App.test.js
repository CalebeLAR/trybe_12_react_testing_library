import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <App.js />', () => {
  test('(1) a aplicação deve conter um topo com um conjunto de links de navegação.', () => {
    renderWithRouter(<App />);

    // expects para o topo "barra de navegação"
    const nav = screen.getByRole('navigation');
    expect(nav).toBeVisible();

    // expects do link "home"
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toHaveAttribute('class', 'link');
    expect(linkHome).toHaveAttribute('href', '/');
    expect(linkHome).toBeVisible();

    // expects do link "home"
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toHaveAttribute('class', 'link');
    expect(linkAbout).toHaveAttribute('href', '/about');
    expect(linkAbout).toBeVisible();

    // expects do link "home"
    const linkFavoritePokémons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokémons).toHaveAttribute('class', 'link');
    expect(linkFavoritePokémons).toHaveAttribute('href', '/favorites');
    expect(linkFavoritePokémons).toBeVisible();
  });

  test.todo('(2) ao clicar no link "Home" a plicação deve redirecionar para a página principal "/".');
  test.todo('(3) ao clicar no link "About" a plicação deve redirecionar para a página principal "/about".');
  test.todo('(4) ao clicar no link "Favorite Pokémons" a plicação deve redirecionar para a página de pokemons favoritados "/favorites".');
  test.todo('(5) a aplicação redireciona para a página notFound caso a URL seja desconhecida.');
});
