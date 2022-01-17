import { Digraph } from "./dijkstra";

describe('findPath', () => {
  test.each([
    {
      digraph: Digraph.fromPaths(
        ['a', 'b'],
        ['b', 'c'],
      ),
      from: 'b',
      to: 'c',
      expected: ['b', 'c'],
    },
    {
      digraph: Digraph.fromPaths(
        ['a', 'b'],
        ['b', 'c'],
      ),
      from: 'a',
      to: 'c',
      expected: ['a', 'b', 'c'],
    },
  ])('#', ({ digraph, from, to, expected }) => {
    expect(digraph.findPath(from, to)).toStrictEqual(expected);
  });

  test('no b', () => {
    const digraph = Digraph.fromPaths(
      ['a', 'b'],
      ['b', 'c'],
    );

    expect(() => digraph.findPath('c', 'a')).toThrow(
      `Could not find a path from c to a.`
    );

  });
});
