class Graph {
    constructor() {
        this.nodes = [];
        this.adjList = new Map();
        this.nodeDiameter = 10;
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjList.set(node, []);
    }

    removeNode(node) {
        const index = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
            delete this.adjList[node];
        }
    }

    addEdge(value1, value2) {
        // search for node1 and node2 in this.nodes
        const foundNode1 = this.nodes.find(node => node.value === value1);
        const foundNode2 = this.nodes.find(node => node.value === value2);
        // check if edges already exist
        if (this.adjList.get(foundNode1).includes(foundNode2) || this.adjList.get(foundNode2).includes(foundNode1)) {
            return;
        }
        if (!foundNode1 || !foundNode2) {
            return;
        }
        this.adjList.get(foundNode1).push(foundNode2)
        this.adjList.get(foundNode2).push(foundNode1)
    }

    removeEdge(node1, node2) {
        const index1 = this.adjList[node1].indexOf(node2);
        const index2 = this.adjList[node2].indexOf(node1);
        if (index1 > -1) {
            this.adjList[node1].splice(index1, 1);
        }
        if (index2 > -1) {
            this.adjList[node2].splice(index2, 1);
        }
    }

    updateNodesPosition() {
        const attractionConstant = 0.01;
        const repulsionConstant = 1000;
        this.nodes.forEach(node => {
            let totalForceX = 0;
            let totalForceY = 0;

            // Forces between this node and its neighbors
            this.adjList.get(node).forEach(neighbor => {
                const distance = dist(node.x, node.y, neighbor.x, neighbor.y) + 1; // Avoid divide-by-zero
                const angle = atan2(neighbor.y - node.y, neighbor.x - node.x);

                // Attraction force
                const attractionForceX = attractionConstant * distance * cos(angle);
                const attractionForceY = attractionConstant * distance * sin(angle);

                totalForceX += attractionForceX;
                totalForceY += attractionForceY;
            });

            // Repulsion between all nodes
            this.nodes.forEach(otherNode => {
                if (node !== otherNode) {
                    const distance = dist(node.x, node.y, otherNode.x, otherNode.y) + 1;
                    const angle = atan2(node.y - otherNode.y, node.x - otherNode.x);

                    // Repulsion force
                    const repulsionForceX = repulsionConstant / (distance * distance) * cos(angle);
                    const repulsionForceY = repulsionConstant / (distance * distance) * sin(angle);

                    totalForceX += repulsionForceX;
                    totalForceY += repulsionForceY;
                }
            });

            // Update position with damping
            node.x += totalForceX * 0.1;
            node.y += totalForceY * 0.1;

            // Constrain positions to canvas
            node.x = constrain(node.x, 0 + this.nodeDiameter/2, width - this.nodeDiameter/2);
            node.y = constrain(node.y, 0 + this.nodeDiameter/2, height - this.nodeDiameter/2);
        });
    }

    draw(label = false) {
        // draw edges
        stroke(0);
        this.nodes.forEach(node => {
            this.adjList.get(node).forEach(neighbor => {
                line(node.x, node.y, neighbor.x, neighbor.y);
            });
        });
        // draw nodes
        this.nodes.forEach(node => {
            node.draw(label = label);
        })
    }

    setConstants(attractionConstant, repulsionConstant) {
        this.attractionConstant = attractionConstant;
        this.repulsionConstant = repulsionConstant;
    }

    resetColor() {
        for (let node of this.nodes) {
            node.color = color(0);
        }
    }

    print() {
        let result = '';
        this.nodes.forEach(node => {
            result += node.value + ' -> ' + this.adjList.get(node).map(node => node.value).join(', ') + '\n';
        });
        console.log(result);
    }

    isEulerian() {
        // check connectedness
        let even = 0;
        let odd = 0;
        this.nodes.forEach(node => {
            let length = this.adjList.get(node).length;
            if (length == 0) return false;
            if (length % 2 == 0) {
                even++;
            } else {
                odd++;
            }
        })
        if (odd == 0 || odd == 2) return true;
        return false;
    }

    isConnected() {
        let visited = new Set();
        let stack = [graph.nodes[0]];

        while (stack.length > 0) {
            let node = stack.pop();
            visited.add(node);
            graph.adjList.get(node).forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            });
        }

        if (visited.size == this.nodes.length) return true;
        return false;
    }

    getOddVertices() {
        let oddVertices = [];
        this.nodes.forEach(node => {
            let N = this.adjList.get(node).length;
            if (N % 2 != 0) {
                oddVertices.push(node);
            }
        });
        return oddVertices;
    }

    getEvenVertices() {
        let oddVertices = this.getOddVertices();
        let evenVertices = this.nodes;
        oddVertices.forEach(oddVertex => {
            evenVertices = evenVertices.filter(vertex => vertex !== oddVertex);
        });
        return evenVertices;
    }

    getNeighbors(node) {
        if (!this.adjList.has(node)) {
            return [];
        }
        return this.adjList.get(node);
    }
}