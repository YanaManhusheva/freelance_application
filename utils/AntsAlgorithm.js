class AntColonyOptimization {
  constructor(
    tasks,
    antCount = 50,
    iterations = 100,
    alpha = 1,
    beta = 5,
    evaporationRate = 0.5
  ) {
    this.distances = this.createMatrix(tasks);
    this.alpha = alpha; // Influence of pheromone
    this.beta = beta; // Influence of heuristic value (1/distance)
    this.evaporationRate = evaporationRate; // Rate at which pheromone evaporates
    this.antCount = antCount; // Number of ants
    this.iterations = iterations; // Number of iterations
    this.pheromone = Array.from({ length: tasks.length }, () =>
      Array(tasks.length).fill(0.1)
    );
  }

  createMatrix(tasks) {
    let matrix = Array.from({ length: tasks.length }, () =>
      new Array(tasks.length).fill(0.0)
    );
    let tagSums = {};

    // Calculate tag sums for weighted distance calculation
    tasks.forEach((task) => {
      if (task.tag) {
        if (!tagSums[task.tag]) {
          tagSums[task.tag] = 0.0; // Initialize to floating point
        }
        tagSums[task.tag] += task.estimatedTime;
      }
    });
    console.log("tagSums" + tagSums);

    // Populate the matrix with distances
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < tasks.length; j++) {
        if (i === j) {
          matrix[i][j] = 0.0; // Distance from a node to itself is zero
        } else if (
          tasks[i].tag &&
          tasks[i].tag === tasks[j].tag &&
          tagSums[tasks[i].tag] !== 0
        ) {
          // Ensure division by zero is handled
          matrix[i][j] =
            tasks[i].estimatedTime *
            (1 -
              Math.abs(tasks[i].estimatedTime - tasks[j].estimatedTime) /
                tagSums[tasks[i].tag]);
        } else {
          // If there is no tag match, or tags are missing, use some default logic
          matrix[i][j] = tasks[i].estimatedTime; // Ensure this is a float if not inherently so
        }
      }
    }

    return matrix;
  }

  run() {
    let shortestPath = { route: [], distance: Infinity };

    for (let iteration = 0; iteration < this.iterations; iteration++) {
      let paths = this.constructPaths();
      this.updatePheromones(paths);

      let bestThisIteration = paths.reduce(
        (best, path) => (path.distance < best.distance ? path : best),
        { route: [], distance: Infinity }
      );
      //console.log(`Iteration ${iteration + 1}: Best path distance = ${bestThisIteration.distance}`);

      if (bestThisIteration.distance < shortestPath.distance) {
        shortestPath = bestThisIteration;
      }
    }
    shortestPath.route.pop();
    return shortestPath;
  }

  constructPaths() {
    let paths = [];

    for (let i = 0; i < this.antCount; i++) {
      let start = Math.floor(Math.random() * this.distances.length);
      let path = this.genPath(start);
      paths.push({
        route: path,
        distance: this.calculateDistance(path),
      });
    }

    return paths;
  }

  genPath(start) {
    let path = [];
    let visited = new Set();
    visited.add(start);
    let current = start;

    while (visited.size < this.distances.length) {
      let next = this.pickNextCity(current, visited);
      path.push(current);
      visited.add(next);
      current = next;
    }

    // Ensure the path returns to the start to complete the cycle
    path.push(current); // Add the last city
    path.push(start); // Return to start
    return path;
  }

  pickNextCity(current, visited) {
    let probabilities = this.distances[current].map((dist, index) => {
      if (visited.has(index) || dist === 0) {
        return 0; // Skip visited cities and avoid division by zero
      }
      return (
        this.pheromone[current][index] ** this.alpha * (1 / dist) ** this.beta
      );
    });

    let total = probabilities.reduce((acc, prob) => acc + prob, 0);
    let randomPoint = Math.random() * total;
    let runningTotal = 0;

    for (let i = 0; i < probabilities.length; i++) {
      runningTotal += probabilities[i];
      if (runningTotal >= randomPoint) {
        return i;
      }
    }

    return -1; // Return an invalid index as a fallback
  }

  updatePheromones(paths) {
    for (let i = 0; i < this.pheromone.length; i++) {
      for (let j = 0; j < this.pheromone[i].length; j++) {
        this.pheromone[i][j] *= 1 - this.evaporationRate;
      }
    }

    paths.forEach((path) => {
      let contribution = 500 / path.distance;
      for (let i = 0; i < path.route.length - 1; i++) {
        let from = path.route[i];
        let to = path.route[i + 1];
        this.pheromone[from][to] += contribution;
      }
    });
  }

  calculateDistance(path) {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += this.distances[path[i]][path[i + 1]];
    }
    distance += this.distances[path[path.length - 1]][path[0]];
    return distance;
  }
}
// const distances = [
//     [0, 2, 3, 4, 4, 4, 3, 3, 4, 4, 4],
//     [6, 0, 5, 6, 6, 6, 6, 5, 6, 6, 6],
//     [4, 4, 0, 4, 4, 4, 3, 3, 4, 4, 4],
//     [8, 8, 8, 0, 7, 8, 8, 8, 6, 8, 8],
//     [6, 6, 6, 6, 0, 6, 6, 6, 4, 6, 6],
//     [5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5],
//     [10, 10, 10, 10, 10, 9, 0, 8, 10, 10, 10],
//     [3,  3,  3,  3,  3,  2, 1, 0, 3, 3, 3],
//     [10, 10, 10, 10, 10, 10, 10, 10, 0, 8, 10],
//     [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3],
//     [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0]
// ];
//
// const aco = new AntColonyOptimization(distances, 11, 100, 1, 5, 0.64);
// const result = aco.run();
// console.log(`Shortest path: ${result.route} with distance: ${result.distance}`);
export default AntColonyOptimization;
