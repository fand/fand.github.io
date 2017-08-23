import fm from "front-matter";

export default class Article {
  constructor(text) {
    const parsed = fm(text);

    this.body = parsed.body;
    this.id = parsed.attributes.id;
    this.date = new Date(parsed.attributes.date || new Date());
  }

  get title() {
    return this.body.split("\n")[0].replace(/#+/, "").trim();
  }

  get description() {
    return this.body.split("\n").slice(1).join("").trim();
  }
}
