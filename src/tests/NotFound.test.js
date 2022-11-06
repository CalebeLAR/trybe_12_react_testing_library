import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('#NotFound.', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('1) O componente deve conter um heading h2 com o texto Page requested not found', () => {
    const mainTitle = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(mainTitle).toBeVisible();
  });

  test('2)  O componente deve conter a imagem do Pikachu chorando.', () => {
    const imgSadPikachu = screen.getByRole('img');
    expect(imgSadPikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgSadPikachu).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
    expect(imgSadPikachu).toBeVisible();
  });
});
