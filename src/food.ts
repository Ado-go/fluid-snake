import Vector2D from "./vector2D";

export default class Food {
  public position: Vector2D;
  public radius: number;
  private boundries: Vector2D;
  private color: string;
  private colors: string[] = ["red", "yellow", "green"];

  constructor(position: Vector2D, boundries: Vector2D, radius: number) {
    this.position = position;
    this.boundries = boundries;
    this.radius = radius;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  public reposition() {
    this.position = new Vector2D(
      Math.random() * (this.boundries.x - 100) + 50,
      Math.random() * (this.boundries.y - 100) + 50
    );
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
