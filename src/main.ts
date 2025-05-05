let canvas: HTMLCanvasElement = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

import Snake from "./snake";
import Food from "./food";
import Vector2D from "./Vector2D";

type SnakeControl = null | "a" | "d";

class Game {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private snake: Snake;
  private food: Food;
  public restartable: boolean = false;
  public snakeControl: SnakeControl = null;
  public intervalId: undefined | number = undefined;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.snake = new Snake(new Vector2D(width / 4, height / 2), 10, 5);
    this.food = new Food(new Vector2D(300, 300), new Vector2D(500, 500), 10);
  }

  public rotateSnake(clockwise: boolean) {
    this.snake.rotate(clockwise);
  }

  public restart() {
    this.width = this.width;
    this.height = this.height;
    this.snake = new Snake(
      new Vector2D(this.width / 4, this.height / 2),
      10,
      5
    );
    this.food = new Food(new Vector2D(300, 300), new Vector2D(500, 500), 10);
    let intervalId = setInterval(() => game.update(), 1000 / 100);
    game.intervalId = intervalId;
  }

  public update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.snakeControl === "d") {
      game.rotateSnake(true);
    } else if (this.snakeControl === "a") {
      game.rotateSnake(false);
    }
    this.snake.move();
    if (this.snake.foodCollision(this.food)) {
      this.snake.grow();
      this.food.reposition();
    }
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);

    if (this.snake.bodyCollision()) {
      clearInterval(this.intervalId);
      this.restartable = true;
      this.ctx.font = "48px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Game over", this.width / 4, 50);

      this.ctx.font = "16px Arial";
      this.ctx.fillText("press R to restart", this.width / 3, 70);
    }
  }
}

const game = new Game(500, 500, ctx);

document.addEventListener("keypress", (event) => {
  if (event.key.toLowerCase() === "d") {
    game.snakeControl = "d";
  } else if (event.key.toLowerCase() === "a") {
    game.snakeControl = "a";
  }
});

document.addEventListener("keyup", (_event) => {
  game.snakeControl = null;
});

document.addEventListener("keypress", (event) => {
  if (event.key.toLowerCase() === "r" && game.restartable) {
    game.restartable = false;
    game.restart();
  }
});

let intervalId = setInterval(() => game.update(), 1000 / 100);
game.intervalId = intervalId;
