abstract class Shape {
    abstract area(): number;
    abstract perimeter(): number;
    static describe() {
        console.log("This is shape");
    }
    static create(type: "circle" | "rect" | "triangle", ...args: number[]) {
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

class Circle implements Shape {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    describe(): void {
        console.log("This is circle");
    }
}

class Rectangle implements Shape {
    length: number;
    width: number;

    constructor(length: number, width: number) {
        this.length = length;
        this.width = width;
    }

    area(): number {
        return this.length * this.width;
    }

    perimeter(): number {
        return 2 * (this.length + this.width);
    }

    describe(): void {
        console.log("This is Rectangle");
    }
}

class Triangle implements Shape {
    a: number;
    b: number;
    c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    area(): number {
        let s = (this.a + this.b + this.c) / 2;

        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    perimeter(): number {
        return this.a + this.b + this.c;
    }

    describe(): void {
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
