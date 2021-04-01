
export class PackageArgumentParser {
    private readonly arguments:Array<string>;
    private readonly length:number

    constructor(args:Array<string>){
        this.arguments = args.slice(2, args.length)
        this.length = this.arguments.length
    }

    public parseCommandArguments = ():void | null => {
        if(this.length == 0){
            return null;
        } else if([1, 2].includes(this.length)){
            const validArguments:Array<Array<string>> = [["-v", "-p"],["get", "remove"]]
            if(!(validArguments[this.length-1].includes(this.arguments[0]))){
                console.log("Error")
            }
        }
    }
}