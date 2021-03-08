import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class ServiceBase{
    constructor(
      ) {}

    protected handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return throwError(err.message);
    }
}