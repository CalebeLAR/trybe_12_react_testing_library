import {screen} from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('#Pokemon', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  // });
  describe('Testes referentes ao card com as informações do pokémon', () => {
    test('(1) o link de detalhes do pokemon deve redirecionamentar para a página de detalhes de pokémon', async () => {
      const { history } = renderWithRouter(<App />);
      const moreDetails = screen.getByText('More details');
      const pikachu = screen.getByText('Pikachu');
      userEvent.click(moreDetails);

      const pikachuDetails = await screen.findByText('Pikachu Details');
      expect(history.location.pathname).toBe('/pokemons/25');
    });
    test.todo('(2) a página de detalhes deve ter um URL com a configuração /pokemon/<id do pokemon>');
  });
  describe('Testes referentes aos pokemons favoritados', () => {
    test.todo('(3) o ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg');
    test.todo('(4) a imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon exibido.');
  });
});
