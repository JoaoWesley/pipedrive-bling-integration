import { Command } from "@brainhubeu/sqrs";

export class ExampleCommand implements Command {
  constructor(
    public readonly id: number,
    public readonly foo: string,
    public readonly bar: string
  ) {}
  type = "add-note";
}
