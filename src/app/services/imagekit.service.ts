import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { APP_SERVICE_CONFIG } from '../appconfig/appconfig.service';
import { Appconfig } from '../interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagekitService {
  private imagekitUrl: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) {
    this.imagekitUrl = config.imageKitUploadEndpoint;
  }

  async upload(file: File){
    const _config = this.config;
    const _http = this.http;
    const _url = this.imagekitUrl;
    const request = await this.http.get(this.config.imageKitAuthEndpoint).pipe(take(1)).subscribe({
      async next(value) {
        const token = await JSON.parse(JSON.stringify(value));
        const data = {
          file: file,
          publicKey: _config.imageKitIoKey,
          signature: token.signature,
          expire: token.expire,
          token: token.token,
          fileName: token.token,
        }
        _http.post(_url, data).pipe(take(1)).subscribe(res => console.log(res));
      },
      error(err) {
        console.error(err);
      },
      complete() {

      },
    });
    // const data = {
    //   file: file,
    //   publicKey: this.config.imageKitIoKey,
    //   signature: token.signature,
    //   expire: token.expire,
    //   token: token.token,
    //   fileName: token.token,
    // }
    // return this.http.post(this.imagekitUrl, data);
  }


}
