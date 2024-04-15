import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-corredores',
  templateUrl: './corredores.component.html',
  styleUrls: ['./corredores.component.css']
})
export class CorredoresComponent implements OnInit {

  public listCorredores: any[] = [];

  constructor(private _teamService: TeamService) { }

  ngOnInit(): void {
    this.obtenerCorredores();
  }

  obtenerCorredores() {
    this._teamService.getTeam().subscribe({
      next: ({corredores, totalCorredores}) => {
        this.listCorredores = corredores;
      },
      error: (err:any) => {
        console.log(err)
      }
    });
  }

}
