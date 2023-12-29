export class UrlLink {
  readonly link: URL;

  constructor(link: string) {
    try {
      this.link = new URL(link);
    } catch (error) {
      throw new Error("invalid_url_link");
    }
  }
}
