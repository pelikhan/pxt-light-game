namespace lightRacer {
    export class GameEngine {
        public strip: lightRacer.LightStrip;
        public cars: Car[];
        private lastTime: number;

        constructor(strip: LightStrip) {
            this.strip = strip;
            this.cars = [];
            this.lastTime = control.millis();

            this.strip.setBuffered(true); // don't auto-render            
        }

        addCar(): Car {
            const sp = new Car();
            this.cars.push(sp);
            return sp;
        }

        render() {
            this.update();
            this.paint();
            this.strip.show();
        }

        update() {
            const now = control.millis();
            const dt = (now - this.lastTime) / 1000;
            for (const sprite of this.cars) {
                let p = sprite.pos + dt * sprite.velocity
                sprite.pos = p;
            }
            this.lastTime = now;
        }

        paint() {
            this.strip.clear();
            for (const sprite of this.cars)
                sprite.paint(this.strip);
            this.strip.show();
        }
    }

    export class Car {
        pos: number; // may be deciment
        velocity: number; // pixel per second
        color: number;
        head: number; // number of head LED
        tail: number; // number of tail LED

        constructor() {
            this.pos = 0;
            this.velocity = 0;
            this.color = 0xcccccc;
            this.tail = 1;
        }

        paint(strip: LightStrip) {
            const p = this.pos | 0;
            const dir = Math.sign(this.velocity);

            strip.setPixelColor(p, this.color); // TODO alpha
            for (let i = 0; i < this.tail; ++i)
                strip.setPixelColor(p - (1 + i) * dir, this.color); // TODO alpha
            for (let i = 0; i < this.head; ++i)
                strip.setPixelColor(p + (1 + i) * dir, this.color); // TODO alpha
        }
    }
} 