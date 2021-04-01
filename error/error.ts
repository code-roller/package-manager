import { red,yellow } from 'chalk'

export class PackageError {
    private readonly message:string;
    private readonly suggestion:string;

    constructor(error:string, suggestion:string){
        this.message = error
        this.suggestion = suggestion
    }

    public evokePackageException = () => {
        const output:Array<string> = [red(this.message), yellow(this.suggestion)]
        for(let outputIndex=0; outputIndex<output.length; outputIndex++){
            console.log(output[outputIndex])
        }
        process.exit()
    }
}