import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('#PokemonDetails.js', () => {
  describe('Testes sobre a rederização das informações do pokémon selecionado na tela', () => {
    test.todo('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;');
    test.todo('Não deve existir o link de navegação para os detalhes do pokémon selecionado');
    test.todo('A seção de detalhes deve conter um heading h2 com o texto Summary');
    test.todo('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado');
  });
  describe('Testes sobre a rederização dos mapas da localização do pokémon selecionado', () => {
    test.todo('Aa seção de mapas do pokemon deve conte um heading com o texto "Game Locations of <pokémon>"');
    test.todo('Todas as localizações do pokémon devem ser mostradas na seção de detalhes');
    test.todo('A imagem da localização deve ter um atributo src com a URL da localização');
    test.todo('A imagem da localização deve ter um atributo alt com o texto "<namePokémon> location"');
  });
  describe('Testes sobre a funcionalidade de favoritar o pokémon selecionado atravéz da paágina de detalhes', () => {
    test.todo('A página deve exibir um checkbox que permite favoritar o pokémon');
    test.todo('Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos');
    test.todo('O label do checkbox deve conter o texto "Pokémon favoritado?"');
  });
});
