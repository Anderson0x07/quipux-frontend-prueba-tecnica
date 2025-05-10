import { environment } from "../../../environments/environment.development";


export class PlaylistApiConstant {
    
    static readonly URL_BASE: string = environment.apiUrl;

    static readonly URL_PLAYLIST: string = 
    this.URL_BASE + '/lists';

    static readonly URL_SONGS: string = 
    this.URL_BASE + '/songs';

    

    
}