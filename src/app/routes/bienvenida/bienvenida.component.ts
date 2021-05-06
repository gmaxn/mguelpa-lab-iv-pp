import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GitProfile } from 'src/app/models/git-profile';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  profile: GitProfile = {
    login: "",
    avatar_url:"",
    url:"",
    html_url:""
  };

  constructor(private gs: GitService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initProfile();
  }

  initProfile(): void {
    this.gs.getProfile().subscribe({
      next: response => {
        this.profile = response;
      },
      error: err => alert(err)
    });
  }

}
