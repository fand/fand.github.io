import * as fm from "front-matter";
import * as Markdown from "react-markdown";

class Article {
    body: string;
    opts: any;
    date: Date;

    constructor(text) {
        const parsed = fm(text);
        this.body = parsed.body;
        this.opts = parsed.attributes;
        this.date = new Date(this.opts.date || new Date());
    }

    get title(): string {
        return this.body.split("\n")[0].replace(/#+/, "").trim();
    }

    get description(): string {
        return this.body.split("\n").slice(1).join("").trim();
    }
}

export default [
    new Article(require("./glsl-livecoder.md")),
    new Article(require("./evil.md"))
];
