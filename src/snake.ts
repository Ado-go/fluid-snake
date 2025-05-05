import Vector2D from "./Vector2D";
import Food from "./food";

export default class Snake {
  private directionVector: Vector2D = new Vector2D(1, 0);
  private radius: number;
  private snakeBody: Vector2D[] = [];
  private positionHistory: Vector2D[] = [];

  constructor(
    spawnPosition: Vector2D,
    radius: number,
    startingBodyCount: number
  ) {
    this.radius = radius;
    this.snakeBody.push(spawnPosition.copy());
    const parts = startingBodyCount;
    for (let i = 0; i < parts; i++) {
      this.snakeBody.push(spawnPosition.copy());
    }
  }

  public rotate(clockwise: boolean) {
    clockwise
      ? this.directionVector.rotateVector(3)
      : this.directionVector.rotateVector(-3);
  }

  public bodyCollision() {
    let head = this.snakeBody[0];
    const maxLength = this.snakeBody.length * this.radius * 2;
    if (maxLength > this.positionHistory.length) {
      return false;
    }
    for (let i = 2; i < this.snakeBody.length; i++) {
      if (
        Math.sqrt(
          (head.x - this.snakeBody[i].x) ** 2 +
            (head.y - this.snakeBody[i].y) ** 2
        ) <
        this.radius * 2
      ) {
        return true;
      }
    }
    return false;
  }

  public foodCollision(food: Food) {
    let head = this.snakeBody[0];
    if (
      Math.sqrt(
        (head.x - food.position.x) ** 2 + (head.y - food.position.y) ** 2
      ) <
      this.radius * 2
    ) {
      return true;
    }
    return false;
  }

  public grow() {
    let last = this.snakeBody[this.snakeBody.length - 1].copy();
    let almostLast = this.snakeBody[this.snakeBody.length - 2].copy();
    let newPosition = last.copy();
    almostLast.addVector(new Vector2D(last.x * -1, last.y * -1));
    newPosition.addVector(almostLast);
    this.snakeBody.push(newPosition);
  }

  public move() {
    const head = this.snakeBody[0];
    const movement = this.directionVector;
    head.addVector(movement);

    this.positionHistory.unshift(head.copy());

    const maxLength = this.snakeBody.length * this.radius * 2;
    if (this.positionHistory.length > maxLength) {
      this.positionHistory.pop();
    }

    for (let i = 1; i < this.snakeBody.length; i++) {
      const index = i * this.radius * 2;
      if (this.positionHistory[index]) {
        this.snakeBody[i] = this.positionHistory[index].copy();
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let position = 0;
    for (let snakePart of this.snakeBody) {
      ctx.beginPath();
      ctx.arc(snakePart.x, snakePart.y, this.radius, 0, 2 * Math.PI);
      if (position % 2 === 0) {
        ctx.fillStyle = "blue";
      } else {
        ctx.fillStyle = "lightblue";
      }
      ctx.fill();
      position++;
    }
  }
}
