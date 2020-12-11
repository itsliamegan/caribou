export class Program {
  constructor(cwd, argv, stdin, stdout) {
    this.cwd = cwd
    this.argv = argv
    this.stdin = stdin
    this.stdout = stdout
  }

  async run() {
  }

  get arguments() {
    return this.argv.slice(2)
  }
}
