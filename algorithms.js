function getRandomGraph(N, edges, connected = false) {
    let graph = new Graph();
    for (let i = 0; i < N; i++) {
      graph.addNode(new Node(i));
    }
    
    // add random edges
    for (let i = 0; i < edges; i++) {
      let node1 = Math.floor(random(N));
      let node2 = Math.floor(random(N));
      graph.addEdge(node1, node2);
    }
  
    // make sure the graph is connected
    if (connected) {
      // traverse the graph
      let visited = new Set();
      let stack = [graph.nodes[0]];
      while (stack.length > 0) {
        let node = stack.pop();
        visited.add(node);
        graph.adjList.get(node).forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        })
      }
      // get the unvisited nodes
      let unvisited = graph.nodes.filter(node => !visited.has(node));
      // connect the unvisited nodes
      visited = Array.from(visited);
      for (let i = 0; i < unvisited.length; i++) {
        let node1 = unvisited[i];
        let node2 = visited[Math.floor(random(visited.length))];
        graph.addEdge(node1.value, node2.value);
        visited.push(node1);
      }
    }
    return graph;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function breadthFirstSearch(graph, timeDelay = 0) {
  let visited = new Set();
  let stack = [graph.nodes[0]];

  while (stack.length > 0) {
      let node = stack.pop();

      // Simulate a delay
      await sleep(timeDelay);

      visited.add(node);
      node.color = color(255, 0, 0);
      graph.adjList.get(node).forEach(neighbor => {
          if (!visited.has(neighbor)) {
              stack.push(neighbor);
          }
      });
  }
}