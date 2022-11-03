import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
    test('(2) ao clicar no link "Home" a plicação deve redirecionar para a página principal "/".', async () => {
      const { history } = renderWithRouter(<App />);

      // navegando da página about para a home
      act(() => {
        history.push('/about');
      });

      expect(await screen.findByRole('heading', { name: 'About Pokédex', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página favorite pokemon para a home
      act(() => {
        history.push('/favorites');
      });

      expect(await screen.findByRole('heading', { name: 'Favorite pokémons', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página NotFound pokemon para a home
      act(() => {
        history.push('/PaginaNotFound');
      });

      expect(await screen.findByRole('heading', { name: 'Page requested not found', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');

      // navegando da página home pokemon para propria a home
      act(() => {
        history.push('/');
      });

      expect(await screen.findByRole('heading', { name: 'Encountered pokémons', level: 2 }));
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');
    });
    test('(3) ao clicar no link "About" a plicação deve redirecionar para a página principal "/about".', async () => {
      const { history } = renderWithRouter(<App />);

      // navegando da pagina home para a about
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina favorite para a pagina about
      act(() => {
        history.push('/favorites');
      });
      expect(await screen.findByRole('heading', { name: 'Favorite pokémons', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina NotFound para a pagina about
      act(() => {
        history.push('/PaginaNotFound');
      });
      expect(await screen.findByRole('heading', { name: 'Page requested not found', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');

      // navegando da pagina about para a propria pagina about
      act(() => {
        history.push('/about');
      });
      expect(await screen.findByRole('heading', { name: 'About Pokédex', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');
    });
    test('(4) ao clicar no link "Favorite Pokémons" a plicação deve redirecionar para a página de pokemons favoritados "/favorites".', async () => {
      const { history } = renderWithRouter(<App />);

      // navegando da pagina home para a favorites
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(history.location.pathname).toBe('/favorites');

      // navegando da pagina about para a pagina favorites
      act(() => {
        history.push('/about');
      });
      expect(await screen.findByRole('heading', { name: 'About Pokédex', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(history.location.pathname).toBe('/favorites');

      // navegando da pagina NotFound para a pagina favorites
      act(() => {
        history.push('/PaginaNotFound');
      });
      expect(await screen.findByRole('heading', { name: 'Page requested not found', level: 2 })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(history.location.pathname).toBe('/favorites');

      // navegando da pagina favorites para a propria pagina favorites
      act(() => {
        history.push('/favorites');
      });
      expect(await screen.findByRole('heading', { name: 'Favorite pokémons' })).toBeVisible();
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(history.location.pathname).toBe('/favorites');
    });
  });

  describe('NotFound', () => {
    test('(5) a aplicação redireciona para a página notFound caso a URL seja desconhecida.', async () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/PaginaNotFound');
      });
      const mainTitleNotFound = await screen.findByRole('heading', { name: 'Page requested not found' });
      expect(mainTitleNotFound).toBeVisible();
      const imgSadPikachu = screen.getByRole('img');
      expect(imgSadPikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      expect(imgSadPikachu).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
      expect(imgSadPikachu).toBeVisible();
    });
  });
});
