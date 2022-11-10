import {screen} from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('#Pokemon', () => {
  describe('Testes referentes ao card com as informações do pokémon', () => {
    test.todo('o card do pokémon deve contém um link de navegação para exibir detalhes deste pokémon, que redirecione para a pagina de detalhes do pokemon');
    test.todo('o link de detalhes do pokemon deve redirecionamentar para a página de detalhes de pokémon');
    test.todo('a página de detalhes deve ter um URL com a configuração /pokemon/<id do pokemon>');
  });
  describe('Testes referentes aos pokemons favoritados', () => {
    test.todo('o ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg');
    test.todo('a imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon exibido.');
  });
});