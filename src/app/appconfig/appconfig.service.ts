import { InjectionToken } from "@angular/core";
import { environment } from "../env/env.dev";
import { Appconfig } from "../interfaces/appconfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<Appconfig>('app.config');

export const APP_CONFIG: Appconfig = {
  apiEndpoint: environment.apiEndpoint
}
