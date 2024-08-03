import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketIoConfig } from 'ngx-socket-io';
import { routes } from './app.routes';

const socketConfig: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
};
