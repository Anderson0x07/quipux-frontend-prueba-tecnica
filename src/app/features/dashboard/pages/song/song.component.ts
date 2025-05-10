import { Component, inject, OnInit } from '@angular/core';
import { SongDto } from '../../../../dtos/playlist/playlist.dto';
import { PlaylistService } from '../playlist/services/playlist.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export default class SongComponent implements OnInit {

  openModalCrear: boolean = false;

  songs: SongDto[] = [];

  playlistService = inject(PlaylistService);

  messageService = inject(MessageService);

  formSong!: FormGroup;

  fb: FormBuilder = inject(FormBuilder);

  generos: string[] = [
    'Pop',
    'Rock',
    'Jazz',
    'Hip-Hop',
    'Reggaeton',
    'Electrónica',
    'Clásica',
    'Country',
    'Folk',
    'R&B',
    'Blues',
    'Metal',
    'Punk',
    'Alternativa'
  ];


  ngOnInit(): void {

    this.formSong = this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      album: ['', Validators.required],
      anno: ['', Validators.required],
      genero: ['', Validators.required],
    });
      
    this.getAllSongs();
  }

  getAllSongs(): void {
    this.playlistService.getAllSongs().subscribe({
      next: (response) => {
        this.songs = response;
      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }

  onCreateSong(): void {
    if (this.formSong.invalid) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos.' });
      return;
    }

    const request = {
      ...this.formSong.value
    }

    this.playlistService.createSong(request).subscribe({
      next: (response) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Canción creada correctamente.' });
        this.getAllSongs();
        this.formSong.reset();
        this.openModalCrear = false;
      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });

  }

}
