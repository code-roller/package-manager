import * as axios from 'axios'

export class Packages {
    private readonly organization:string
    private readonly url:any = (org:string):string => {
        return `https://api.github.com/orgs/${org}/repos`
    }

    constructor(organization:string) {
        this.organization = organization
    }

    private createPackageIndex = () => {
        axios.default.get(this.url(this.organization)).then((value: axios.AxiosResponse<any>) => {
            let repositories:Array<string> = new Array()
            let data = value.data

            for(let index=0; index<data.length; index++){
                repositories.push(
                    data[index].name
                )
            }
            console.log(repositories)
            
        }).catch((exception) => {
            console.log("error")
        }).then(() => {
        
        })
    }

    public static packages = () => {
        return new Packages("code-roller").createPackageIndex()
    }
}