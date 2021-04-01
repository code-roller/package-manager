import {magentaBright, yellow} from 'chalk';

import {PackageError} from '../error/error';
import {APPLICATION_VERSION} from '../index';
import { IntsallPackage } from '../install';
import {Packages} from '../packages/packages';

export class PackageArgumentParser {
  private readonly arguments: Array<string>;
  private readonly length: number;

  /**
   * @constructor
   * @param args The command line arguments
   */
  constructor(args: Array<string>) {
    this.arguments = args.slice(2, args.length);
    this.length = this.arguments.length;
  }

  /**
   *
   * @returns {Void | null}
   */
  public parseCommandArguments = (): void | null => {
    if (this.length == 0) {
      return null;
    } else if ([1, 2].includes(this.length)) {
      const execute: Record<string, any> = {
        '-v': () => {
          this.logApplicationVersion(APPLICATION_VERSION);
        },
        '-p': () => {
          const packages = Packages.packages((data: any) => {
            const name = magentaBright(`[${data.data.name}]`);
            console.log(`${name} - ${yellow(data.data.description)}`);
          });
        },
      };
      const validArguments: Array<Array<string>> = [
        ['-v', '-p'],
        ['get', 'remove'],
      ];
      if (!validArguments[this.length - 1].includes(this.arguments[0])) {
        const exception = new PackageError(
          'An error occured while parsing your arguments',
          'Try again'
        ).evokePackageException();
      } else {
        if (Object.keys(execute).includes(this.arguments[0])) {
          execute[this.arguments[0]]();
        } else{
          if(this.arguments[0] == "get"){
            const install = this.arguments[1]
            const installPackage = Packages.packages((data:any) => {
              if(data.data.name == install){
                const zip = new IntsallPackage.Installer({
                  name : data.data.name,
                  releaseName : data.releases.name,
                  releaseData : data.releases.zipball_url
                })
              }
            })
          }
        }
      }
    }
  };

  public logApplicationVersion = (version: string) => {
    console.log(yellow(APPLICATION_VERSION));
  };
}
