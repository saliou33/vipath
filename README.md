# Vipath - Interactive Pathfinding Visualizer

A modern, interactive pathfinding algorithm visualizer built with React, TypeScript, and Tailwind CSS. This tool helps you understand how different pathfinding algorithms work through beautiful visualizations.

![Vipath Demo](https://saliou33.github.io/vipath/)

## 🚀 Features

- **Multiple Pathfinding Algorithms**
  - A* (A-Star)
  - Dijkstra's Algorithm
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Bidirectional BFS

- **Interactive Grid**
  - Drag and drop start/end nodes
  - Draw walls by clicking/dragging
  - Responsive grid sizing
  - Smooth animations

- **User-Friendly Interface**
  - Interactive tutorial
  - Algorithm controls (play, pause, reset)
  - Speed adjustment
  - Clean, modern UI

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Icons

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vipath.git
   cd vipath
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173`

## 🎮 How to Use

1. Choose a pathfinding algorithm from the top menu
2. Set up your maze:
   - Drag the START node (🟢) to your desired starting position
   - Drag the TARGET node (🎯) to your desired end position
   - Click and drag on the grid to create walls
3. Click the PLAY button to visualize the algorithm
4. Use the speed slider to adjust animation speed
5. Click RESET to try a different configuration

## 🧪 Available Algorithms

- **A* (A-Star)**: Uses heuristics to find the shortest path quickly
- **Dijkstra**: Guarantees the shortest path, explores uniformly
- **BFS**: Explores level by level, guarantees shortest path in unweighted graphs
- **DFS**: Explores as far as possible along each branch
- **Bidirectional BFS**: Searches from both start and end simultaneously

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Clement Mihailescu's Pathfinding Visualizer
- Built with modern web technologies
- Designed for learning and education
