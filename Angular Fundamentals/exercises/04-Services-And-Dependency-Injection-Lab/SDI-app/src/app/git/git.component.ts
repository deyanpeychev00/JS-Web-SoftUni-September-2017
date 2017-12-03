import {Component, OnInit} from "@angular/core";
import {GitService} from "./git.service";

@Component({
  selector: 'git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css']
})

export class GitComponent implements OnInit {
  public gitData : Object;
  constructor(private gitService: GitService) {
  }

  ngOnInit() {
    this.gitService.getProfileInfo().subscribe(data => {
      this.gitData = data;
    });
  }
}
