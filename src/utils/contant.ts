export type ItemType = {
  name: string;
  key: string;
  fn?: () => [];
};

export const algorithms: ItemType[] = [
  { key: "djikstras", name: "Djikstra's Algorithm" },
  { key: "a*", name: "A* Search" },
  { key: "greedy", name: "Greedy" },
  { key: "swarm", name: "Swarm Algorithm" },
  { key: "convergent-swarm", name: "Convergent Swarm Algorithm" },
  { key: "bidirectional-swarm", name: "Bidirectional Swarm Algorithm" },
  { key: "bfs", name: "Breadth-first Search" },
  { key: "dfs", name: "Depth-first Search" },
];
