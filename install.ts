import * as axios from 'axios'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { cwd } from 'process'
import * as extract from 'extract-zip'

export namespace IntsallPackage {

    export interface PackageData {
        name :string
        releaseName : string
        releaseData : any;
    }

    export class Installer {
        private readonly data:PackageData

        constructor(data:PackageData) {
            this.data = data
            
            const file = this.getFile(this.data.releaseData)
        }

        private getFile = async (url:string) => {
            const response = await axios.default({
                method: 'GET',
                url: url,
                responseType: 'stream'
              })
            response.data.pipe(createWriteStream(join(
                cwd(), "file.zip"
            )))

            await extract.default(join(cwd(), "file.zip"), {dir:this.data.name}, (error) =>{
                console.log(error)
            })
        }
    }

}