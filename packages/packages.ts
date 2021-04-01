import * as axios from 'axios'
import { PackageError } from '../error/error'

export class Packages {
    private readonly organization:string
    private readonly url:any = (org:string):string => {
        return `https://api.github.com/orgs/${org}/repos`
    }
    private releaseUrl:any = (name:string) => {
        return `https://api.github.com/repos/code-roller/${name}/releases`
    }
    public releaseList:Array<Record<string, any>> = new Array()

    constructor(organization:string) {
        this.organization = organization
    }

    private createPackageIndex = (callback:Function) => {
        axios.default.get(this.url(this.organization)).then((value: axios.AxiosResponse<any>) => {
            let repositories:Array<Record<string, string>> = new Array()
            let data = value.data

            for(let index=0; index<data.length; index++){
                const name = data[index].name
                repositories.push({
                    name : name,
                    description : data[index].description
                })
            }

            for(let k=0; k<repositories.length; k++){
                const repo = repositories[k]
                axios.default.get(this.releaseUrl(repo.name)).then((value:axios.AxiosResponse<any>) => {
                    const releasesData = value.data
                    if(releasesData.length != 0){
                        callback({
                            data : repo,
                            releases : releasesData[
                                releasesData.length - 1
                            ]
                        })
                    }
                }).catch((exception) => {
                    console.log(exception)
                }).then(() => {

                })
            }

        }).catch((exception) => {
            const error = new PackageError(
                exception.toJSON().stack.toString(),
                "Try again"
            ).evokePackageException()
        }).then(() => {
        
        })
    }

    public static packages = (callback:Function) => {
        const data = new Packages("code-roller").createPackageIndex(callback)
    }
}