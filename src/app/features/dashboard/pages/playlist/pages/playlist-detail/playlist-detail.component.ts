import { Component, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaylistDto, SongDto } from '../../../../../../dtos/playlist/playlist.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export default class PlaylistDetailComponent implements OnInit {

  playlistService = inject(PlaylistService);
  private router = inject(Router);

  playlistDetail!: PlaylistDto;
  description!: string;

  songs: SongDto[] = [];
  songsToAdd: SongDto[] = [];

  messageService = inject(MessageService);

  ngOnInit(): void {

    this.playlistDetail = this.playlistService.getPlaylistDetail;

    if(!this.playlistDetail) {
      this.router.navigate(['/admin/playlist']);
    }

    this.songs = this.playlistDetail.canciones;

    this.getDescriptionPlaylist(this.playlistDetail.nombre);

    const songs = this.playlistService.getSongs;

    this.songsToAdd = songs.filter((song) => {
      return !this.songs.some((s) => s.id == song.id); 
    });
      
  }


  getDescriptionPlaylist(playlistName: string): void {
    this.playlistService.getDetailByName(playlistName).subscribe({
      next: (response) => {
        this.description = response.description;
      },
      error: () => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la descripción de la playlist' });
        this.router.navigate(['/admin/playlist']);
      }
    });
  }


  openModalAgregarCancion: boolean = false;
  cancionSeleccionada: string = '';
  agregarCancion(): void {

    const cancionEncontrada = this.songsToAdd.find((song) => song.id == Number(this.cancionSeleccionada));

    if(!cancionEncontrada) {
      return;
    }

    const request = {
      playlistName: this.playlistDetail.nombre,
      songId: cancionEncontrada.id
    }

    this.playlistService.addSongToPlaylist(request).subscribe({
      next: () => {
        this.songs.push(cancionEncontrada);
        this.songsToAdd = this.songsToAdd.filter((song) => song.id != cancionEncontrada?.id);
        this.cancionSeleccionada = '';
        this.openModalAgregarCancion = false;
      },
      error: () => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar la canción a la playlist' });
      }
    });
  }

}
