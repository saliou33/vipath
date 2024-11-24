import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface GuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Guide = ({ isOpen, onClose }: GuideProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to vipath</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">What is vipath?</h3>
            <p className="text-gray-600">
              Path Visualizer is an interactive tool that helps you understand how different pathfinding
              algorithms work. You can visualize algorithms like Dijkstra's, A*, BFS, and more!
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">How to Use</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">1. Select an Algorithm</h4>
                <p className="text-gray-600">Choose from various pathfinding algorithms in the dropdown menu.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">2. Draw Walls</h4>
                <p className="text-gray-600">Click and drag on the grid to create walls that the algorithm must navigate around.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">3. Start Visualization</h4>
                <p className="text-gray-600">Click the play button to watch the algorithm find its path!</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Available Algorithms</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><span className="font-medium">Dijkstra's Algorithm</span> - Guarantees the shortest path</li>
              <li><span className="font-medium">A* Search</span> - Uses heuristics for efficient pathfinding</li>
              <li><span className="font-medium">Breadth-First Search</span> - Explores nodes level by level</li>
              <li><span className="font-medium">Depth-First Search</span> - Explores as far as possible along each branch</li>
            </ul>
          </section>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};