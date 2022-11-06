import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componete <About />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/about');
    });
  });
  test('1) a página deve conter as informações sobre a Pokédex', () => {
    // expects para o topo "barra de navegação"
    const nav = screen.getByRole('navigation');
    expect(nav).toBeVisible();

    const aboutPokedexTitle = screen.getByRole('heading', { name: 'Pokédex', level: 1 });
    expect(aboutPokedexTitle).toBeVisible();

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

  test('2) a página deve conter um heading h2 com o texto About Pokédex', () => {
    const aboutPokedexTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedexTitle).toBeVisible();
  });

  test('3) a página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
    // textos da página
    const texts = [
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons',
      'One can filter Pokémons by type, and see more details for each one of them',
    ];

    // expects primeiro parágrafo
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toHaveTextContent(texts[0]);
    expect(firstParagraph).toBeVisible();

    // expects segundo parágrafo
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toHaveTextContent(texts[1]);
    expect(secondParagraph).toBeVisible();
  });

  test('4) a página deve conter uma imagem específica de uma Pokédex', () => {
    const imgSadPikachu = screen.getByRole('img');
    expect(imgSadPikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgSadPikachu).toHaveAttribute('alt', 'Pokédex');
    expect(imgSadPikachu).toBeVisible();
  });
});
