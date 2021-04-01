import * as axios from 'axios'

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
            console.log(this.data)
        }
    }

}