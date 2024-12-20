let graph = new Graph();
//let attractionConstantSlider;
//let repulsionConstantSlider;

function setup() {
  createCanvas(400, 400);

  // Create sliders
  //attractionConstantSlider = createSlider(0, 0.1, 0.01, 0.001);
  //attractionConstantSlider.position(20, height + 20);

  //repulsionConstantSlider = createSlider(0, 1000, 100, 1);
  //repulsionConstantSlider.position(20, height + 60);

  // Create graph
  graph.addNode(new Node('A'));
  graph.addNode(new Node('B'));
  graph.addNode(new Node('C'));
  graph.addNode(new Node('D'));
  graph.addNode(new Node('E'));

  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('C', 'D');
  graph.addEdge('C', 'E');

  
}

function draw() {
  background(255);
  fill(0);

  graph.draw();
  graph.updateNodesPosition();
  //graph.setConstants(attractionConstantSlider.value(), repulsionConstantSlider.value());
}
