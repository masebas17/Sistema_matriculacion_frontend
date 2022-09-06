import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay, finalize, map, retryWhen } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private uiService: UiService) {}
  //? Gestiona las peticiones http, el loader de cargando misntras se ejecuta la peticion y el alert cuando ha ocurrido algun error
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Presenta la alerta de cargando...
    this.uiService.presentLoader();
    return next.handle(req).pipe(
      retryWhen((err) => {
        let retries = 1;
        return err.pipe(
          delay(1000),
          map((error) => {
            // Si existe un error en la peticion lo intenta hasta 2 veces y lanza el error a la funcion de catch
            if (retries++ === 2) {
              throw error;
            }
            return error;
          })
        );
      }),
      catchError((err) => {
        // Se cierra la alerta de cargando...
        this.uiService.closeLoader();
        // Al capturar el error se presenta la alerta de error utilizando el servicio con un timer para que se presente el error cuando se ha cerrado el loader
        const myTimeout = setTimeout(() => {
          this.uiService.presentErrorAlert(err);
        }, 1000);
        myTimeout;
        return EMPTY;
      }),
      finalize(() => {
        // Se cierra en el caso de que no se haya capturado ningun error
        this.uiService.closeLoader();
      })
    );
  }
}
