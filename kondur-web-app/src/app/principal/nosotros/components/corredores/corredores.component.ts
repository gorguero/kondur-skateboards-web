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

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.obtenerCorredores();
  }

  obtenerCorredores() {
    return this.teamService.getTeam().subscribe(
      data => {
        this.listCorredores = data;
      },
      error => {
        console.log(error)
      }
    )
  }

}
