import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <App.js />', () => {
  describe('Barra de navegação', () => {
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
  });

  describe('Click nos links de navegação', () => {
    test('(2) ao clicar no link "Home" a plicação deve redirecionar para a página principal "/".', () => {
      const { history } = renderWithRouter(<App />);

      // navegando da página about para a home
      history.push('/about');
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página favorite pokemon para a home
      history.push('/favorites');
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página NotFound pokemon para a home
      history.push('/PaginaNotFound');
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página home pokemon para propria a home
      history.push('/');
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');
    });
    test('(3) ao clicar no link "About" a plicação deve redirecionar para a página principal "/about".', () => {
      const { history } = renderWithRouter(<App />);

      // navegando da pagina home para a about
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina favorite para a pagina about
      history.push('/favorites');
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina NotFound para a pagina about
      history.push('/PaginaNotFound');
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina about para a propria pagina about
      history.push('/about');
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');
    });
    test.todo('(4) ao clicar no link "Favorite Pokémons" a plicação deve redirecionar para a página de pokemons favoritados "/favorites".');
  });

  describe('Not Found', () => {
    test.todo('(5) a aplicação redireciona para a página notFound caso a URL seja desconhecida.');
  });
});
