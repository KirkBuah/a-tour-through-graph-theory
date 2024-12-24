let graph;
//let attractionConstantSlider;
//let repulsionConstantSlider;

function setup() {
  createCanvas(800, 800);
  graph = getRandomGraph(50,3, true);
}

function draw() {
  background(255);
  fill(0);

  graph.draw();
  graph.updateNodesPosition();

  // on click, run the BFS algorithm
  if (mouseIsPressed && mouseButton === LEFT) {
    breadthFirstSearch(graph, 100);
  }
  // on right click, reset the graph
  if (mouseIsPressed && mouseButton === RIGHT) {
    graph.resetColor();
  }
}
