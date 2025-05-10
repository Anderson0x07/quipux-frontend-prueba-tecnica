import { Component, inject, OnInit } from '@angular/core';
import { PlaylistDto, SongDto } from '../../../../dtos/playlist/playlist.dto';
import { PlaylistService } from './services/playlist.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
      FormsModule,
      ReactiveFormsModule,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export default class PlaylistComponent implements OnInit {

  playlist: PlaylistDto[] = [];

  playlistService = inject(PlaylistService);

  public messageService = inject(MessageService);

  private router = inject(Router);

  formPlaylist!: FormGroup;

  private fb = inject(FormBuilder);

  songs: SongDto[] = [];
  songsToAdd: SongDto[] = [];
    
  ngOnInit(): void {

    this.formPlaylist = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      canciones: [null]
    });

    this.getAllSongs();

    this.playlistService.getPlaylists().subscribe({
      next: (response) => {
        this.playlist = response;
      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el listado de playlist' });
      }
    });
      
  }

  getAllSongs(): void {
    this.playlistService.getAllSongs().subscribe({
      next: (response) => {
        this.songs = response;
        this.songsToAdd = response;
        this.playlistService.saveSongs(response);
      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el listado de canciones' });
      }
    });
  }

  openDetail(playlist: PlaylistDto): void {
    this.playlistService.savePlaylistDetail(playlist);
    this.router.navigate(['/admin/playlist/detail']);
  }

  openModalCrear: boolean = false;

  onCreate(): void {

    this.messageService.clear();
    const {nombre, descripcion, canciones} = this.formPlaylist.value;

    let songs: Array<SongDto> = [];

    if(canciones) {

      songs = canciones.map((cancion: number) => {
  
        const cancionExistente = this.songs.find((s) => s.id == cancion);
        if (!cancionExistente) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Canción no encontrada' });
          return;
        }
  
  
        return {
          id: cancionExistente.id,
          titulo: cancionExistente.titulo,
          artista: cancionExistente.artista,
          album: cancionExistente.album,
          anno: cancionExistente.anno,
          genero: cancionExistente.genero
        }
      });
    }

    const request: PlaylistDto = {
      nombre: nombre,
      descripcion: descripcion,
      canciones: songs
    }

    this.playlistService.createPlaylist(request).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Playlist creada exitosamente' });
        this.playlist.push(response);
        this.openModalCrear = false;
        this.formPlaylist.reset();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
    
  }

  eliminarPlaylist(playlist: PlaylistDto): void {
    this.messageService.clear();
    this.playlistService.deletePlaylist(playlist.nombre).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Playlist eliminada exitosamente' });
        this.playlist = this.playlist.filter((p) => p.nombre != playlist.nombre);
        
        this.songsToAdd = this.songs.filter((song) => {
          return !this.songs.some((s) => s.id == song.id); 
        });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la playlist' });
      }
    });
  }



}
