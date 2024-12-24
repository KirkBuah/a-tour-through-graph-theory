class Node {
    constructor(value) {
        this.value = value;
        this.color = color(0);
        this.x = random(width);
        this.y = random(height);
    }

    static nodeEquals(node1, node2) {
        return node1.value === node2.value;
    }

    draw() {
        fill(this.color);
        circle(this.x, this.y, 10);
    }
}
