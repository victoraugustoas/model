export class RateStars {
  readonly stars: number;

  constructor(stars: number) {
    if (stars > 5 || stars < 0) throw new Error("invalid_star_rating");

    this.stars = stars;
  }
}
