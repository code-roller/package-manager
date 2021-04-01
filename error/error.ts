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
    }
}