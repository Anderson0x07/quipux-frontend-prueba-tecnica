export interface PlaylistDto {
	id?: number;
    nombre: string;
    descripcion: string;
    canciones: Array<SongDto>;
}

export interface SongDto {
    id: number;
    titulo: string;
    artista: string;
    album: string;
    anno: string;
    genero: string;
}