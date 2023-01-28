import { InjectionToken } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Appconfig } from "../interfaces/appconfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<Appconfig>('app.config');

export const APP_CONFIG: Appconfig = {
  apiEndpoint: environment.apiEndpoint,
  imageKitUploadEndpoint: environment.imageKitUploadEndpoint,
  imageKitAuthEndpoint: environment.authenticationEndpoint,
  imageKitIoKey: environment.imageKitIoKey
}
