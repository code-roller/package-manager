import { yellow } from 'chalk'

import { PackageError } from "../error/error";
import { APPLICATION_VERSION } from '../index'
import { Packages } from '../packages/packages';

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
            const execute:Record<string, any> = {
                "-v" : () => {
                    this.logApplicationVersion(APPLICATION_VERSION)
                },
                "-p" : () => {
                    const packages = Packages.packages()
                }
            }
            const validArguments:Array<Array<string>> = [["-v", "-p"],["get", "remove"]]
            if(!(validArguments[this.length-1].includes(this.arguments[0]))){
                const exception = new PackageError(
                    "An error occured while parsing your arguments",
                    "Try again"
                ).evokePackageException()
            } else {
                if(Object.keys(execute).includes(this.arguments[0])){
                    execute[this.arguments[0]]()
                }
            }
        }
    }

    public logApplicationVersion = (version:string) => {
        console.log(yellow(APPLICATION_VERSION))
    }
}
