import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  description:string = '';
  group:Array<any> = []
  grupinho:string = '';

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(GroupComponent, {
      width: '250px',
      data: {grupo: this.grupinho},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.grupinho = result;
    });
  }


  teste(){
    this.group.push({description : this.description})
    console.log(this.group)
  }

  async list(){
    this.group = await this.httpService.get('grupo');
    console.log(this.group)
  }

  async insert(){
    this.group =  await this.httpService.post('grupo', {description : this.description});
    console.log(this.description);
    this.list();
  }
}
