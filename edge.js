class Edge {
    constructor (startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
    }

    toString() {
        return [this.startNode.value, this.endNode.value].sort().join("-");
    }
}