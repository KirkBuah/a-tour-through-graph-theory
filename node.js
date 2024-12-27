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

    draw(label = false) {
        fill(this.color);
        circle(this.x, this.y, 10);
        if (label) {
            circle(this.x, this.y, 15);
            fill(255);
            textAlign(CENTER, CENTER);
            text(this.value, this.x, this.y);
            fill(this.color);  
        } else {
            circle(this.x, this.y, 10);
        }
    }
}
