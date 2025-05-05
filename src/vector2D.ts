export default class Vector2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  addVector(vector: Vector2D) {
    this.x += vector.x;
    this.y += vector.y;
  }

  rotateVector(degree: number) {
    const angleRadians = degree * (Math.PI / 180);
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);
    const newX = this.x * cos - this.y * sin;
    const newY = this.x * sin + this.y * cos;
    this.x = newX;
    this.y = newY;
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }
}
