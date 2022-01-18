export interface GraphData {
  [from: string]: {
    [to: string]: number;
  };
}

export interface Predecessors {
  [key: string]: string;
}

export interface Costs {
  [key: string]: number;
}

export class Digraph {
  static fromPaths(...paths: [from: string, to: string, cost?: number][]): Digraph {
    const data: GraphData = {};
    for (const [from, to, cost = 1] of paths) {
      data[from] ||= {};
      data[from][to] = cost;
    }
    return new Digraph(data);
  }

  private queue: { value: string; cost: number }[] = [];

  constructor(private graph: GraphData) {}

  private addToQueue(value: string, cost: number): void {
    this.queue.push({ value, cost });
    this.queue.sort((a, b) => b.cost - a.cost);
  }

  private singleSourceShortestPaths(start: string, destination: string): [predecessors: Predecessors, costs: Costs] {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    const predecessors: Predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    const costs: Costs = {};
    costs[start] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    this.queue = [];
    this.addToQueue(start, 0);

    while (this.queue.length) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, closestValue, that currently has the shortest path from s.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { value: shortestValue, cost: shortestCost } = this.queue.pop()!;

      // Get nodes adjacent to closestValue...
      const adjacentNodes = this.graph[shortestValue] || {};
      // ...and explore the edges that connect closestValue to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. adjacentNode is the node across the current edge from closestValue.
      for (const [adjacentNode, adjacentNodeCost] of Object.entries(adjacentNodes)) {
        // Cost of s to closestValue plus the cost of closestValue to adjacentNode across e--this is *a*
        // cost from s to adjacentNode that may or may not be less than the current
        // known cost to adjacentNode.
        const totalCostToAdjecentNode = shortestCost + adjacentNodeCost;

        // If we haven't visited adjacentNode yet OR if the current known cost from s to
        // adjacentNode is greater than the new cost we just found (cost of s to closestValue plus
        // cost of closestValue to adjacentNode across e), update adjacentNode's cost in the cost list and
        // update adjacentNode's predecessor in the predecessor list (it's now closestValue).
        const cost_of_s_to_v = costs[adjacentNode];
        const first_visit = costs[adjacentNode] === void 0;
        if (first_visit || cost_of_s_to_v > totalCostToAdjecentNode) {
          costs[adjacentNode] = totalCostToAdjecentNode;
          this.addToQueue(adjacentNode, totalCostToAdjecentNode);
          predecessors[adjacentNode] = shortestValue;
        }
      }
    }

    if (destination !== void 0 && costs[destination] === void 0) {
      throw new Error(`Could not find a path from ${start} to ${destination}.`);
    }
    return [predecessors, costs];
  }

  private extractShortestPathFromPredecessorList(predecessors: Predecessors, destination: string): string[] {
    const nodes: string[] = [];
    let closestValue = destination;
    while (closestValue) {
      nodes.push(closestValue);
      closestValue = predecessors[closestValue];
    }
    nodes.reverse();
    return nodes;
  }

  public findPath(start: string, destination: string) {
    return this.findPathWithCost(start, destination)[0];
  }

  public findPathWithCost(start: string, destination: string): [path: string[], cost: number] {
    const [predecessors, costs] = this.singleSourceShortestPaths(start, destination);
    return [this.extractShortestPathFromPredecessorList(predecessors, destination), costs[destination]];
  }
}
