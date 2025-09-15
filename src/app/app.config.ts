import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// You no longer need to import withHashLocation
import { provideRouter } from '@angular/router'; 
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Corrected line: Simply provide the routes. 
    // This uses the default PathLocationStrategy for clean URLs.
    provideRouter(routes), 
    
    provideHttpClient()
  ]
};
