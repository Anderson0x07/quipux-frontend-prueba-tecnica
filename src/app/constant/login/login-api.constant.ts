import { environment } from "../../../environments/environment.development";


export class LoginApiConstant {
    
    static readonly URL_BASE: string = environment.apiUrl;

    static readonly URL_LOGIN: string = 
    this.URL_BASE + '/auth/login';

    static readonly URL_REGISTER: string = 
    this.URL_BASE + '/auth/register';

    
}