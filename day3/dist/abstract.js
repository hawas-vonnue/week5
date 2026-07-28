"use strict";
class Shape {
    static describe() {
        console.log("This is shape");
    }
    static create(type, ...args) {
        switch (type) {
            case "circle":
                return new Circle(args[0]);
            case "rect":
                return new Rectangle(args[0], args[1]);
            case "triangle":
                return new Triangle(args[0], args[1], args[2]);
            default:
                return null;
        }
    }
}
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
    describe() {
        console.log("This is circle");
    }
}
class Rectangle {
    length;
    width;
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    area() {
        return this.length * this.width;
    }
    perimeter() {
        return 2 * (this.length + this.width);
    }
    describe() {
        console.log("This is Rectangle");
    }
}
class Triangle {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    area() {
        let s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    perimeter() {
        return this.a + this.b + this.c;
    }
    describe() {
        console.log("This is Triangle");
    }
}
//----------------------Testing-------------------------------------
let circle = Shape.create("circle", 10);
circle?.describe();
console.log(circle?.area());
let rect = Shape.create("rect", 10, 10);
rect?.describe();
console.log(rect?.area());
let triangle = Shape.create("triangle", 10, 10, 10);
triangle?.describe();
console.log(triangle?.area());
