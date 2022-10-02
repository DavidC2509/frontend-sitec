import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class AppConfig {

    public static settings: IAppConfig;
    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : any) => {
               AppConfig.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }

    static get apiUrl(){
        return AppConfig.settings.apiUrl;
    }

    static get mapboxKey(){
        return AppConfig.settings.mapboxKey;
    }

}



export interface IAppConfig {
    env: {
        name: string;
    };
    apiUrl: string;
    mapboxKey: string;
    production: boolean;
}
