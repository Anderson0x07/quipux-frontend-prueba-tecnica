import { inject, Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PlaylistDto, SongDto } from "../../../../../dtos/playlist/playlist.dto";
import { PlaylistApiConstant } from "../../../../../constant/playlist/playlist-api.constant";


@Injectable({
    providedIn: 'root',
})
export class PlaylistService {

    private http: HttpClient = inject(HttpClient);

    private playlistDetail!: PlaylistDto;

    private songs: SongDto[] = [];

    public saveSongs(songs: SongDto[]): void {
        this.songs = songs;
    }

    get getSongs(): SongDto[] {
        return this.songs;
    }


    public savePlaylistDetail(id: PlaylistDto) {
        this.playlistDetail = id;
    }

    get getPlaylistDetail(): PlaylistDto {
        return this.playlistDetail;
    }

    public getPlaylists(): Observable<PlaylistDto[]> {
        return this.http.get<PlaylistDto[]>(PlaylistApiConstant.URL_PLAYLIST);
    }

    public getDetailByName(name: string): Observable<{description: string}> {
        return this.http.get<{description: string}>(`${PlaylistApiConstant.URL_PLAYLIST}/${name}`);
    }

    public createPlaylist(request: PlaylistDto): Observable<PlaylistDto> {
        return this.http.post<PlaylistDto>(`${PlaylistApiConstant.URL_PLAYLIST}`, request);
    }

    public deletePlaylist(name: string): Observable<void> {
        return this.http.delete<void>(`${PlaylistApiConstant.URL_PLAYLIST}/${name}`);
    }

    public getAllSongs(): Observable<SongDto[]> {
        return this.http.get<SongDto[]>(PlaylistApiConstant.URL_SONGS);
    }

    public createSong(request: SongDto): Observable<SongDto> {
        return this.http.post<SongDto>(`${PlaylistApiConstant.URL_SONGS}`, request);
    }

    public addSongToPlaylist(request: {playlistName: string, songId: number}): Observable<{description: string}> {
        return this.http.put<{description: string}>(`${PlaylistApiConstant.URL_SONGS}?playlistName=${request.playlistName}&songId=${request.songId}`, null);
    }

}