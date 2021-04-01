
export class PackageArgumentParser {
    private readonly arguments:Array<string>;
    private readonly length:number

    constructor(args:Array<string>){
        this.arguments = args.slice(2, args.length)
        this.length = this.arguments.length
    }
}