class IBizObejct {
    public name: string;
    constructor(opts: any = {}) {
        this.name = opts.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}