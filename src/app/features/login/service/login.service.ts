import { inject, Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LoginResponseDTO } from "../../../dtos/auth/login-response.dto";
import { LoginRequestDTO } from "../../../dtos/auth/login-request.dto";
import { LoginApiConstant } from "../../../constant/login/login-api.constant";


@Injectable({
    providedIn: 'root',
})
export class SeguridadService {

    private http: HttpClient = inject(HttpClient);

    public login(request: LoginRequestDTO): Observable<LoginResponseDTO> {
        return this.http.post<LoginResponseDTO>(LoginApiConstant.URL_LOGIN, request);
    }

    public register(request: any): Observable<any> {
        return this.http.post(LoginApiConstant.URL_REGISTER, request);
    }

}