import { Digraph } from './dijkstra';

describe('findPath', () => {
  test.each([
    {
      digraph: Digraph.fromPaths(['a', 'b'], ['b', 'c']),
      start: 'b',
      destination: 'c',
      expected: ['b', 'c'],
    },
    {
      digraph: Digraph.fromPaths(['a', 'b'], ['b', 'c']),
      start: 'a',
      destination: 'c',
      expected: ['a', 'b', 'c'],
    },
  ])('#', ({ digraph, start, destination, expected }) => {
    expect(digraph.findPath(start, destination)).toStrictEqual(expected);
  });

  test('no path', () => {
    const digraph = Digraph.fromPaths(['a', 'b'], ['b', 'c']);

    expect(() => digraph.findPath('c', 'a')).toThrow(`Could not find a path from c to a.`);
  });
});
