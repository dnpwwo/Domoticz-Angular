import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SceneService } from "../scene.service";
import { Scene, ScenesMessage } from "../scene";
import { SceneComponent } from '../scene/scene.component';
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'dmz-scene-list',
  templateUrl: './scene-list.component.html',
  styleUrls: ['./scene-list.component.css']
})
export class SceneListComponent implements OnInit {

  Scenes: Scene[] = [];
  tableColumns: string[] = ['SceneID', 'Name', 'Active'];
  selectedRow: Scene;
  selectedRowNumber = 0;
  dialogConfig = new MatDialogConfig();

  constructor(private sceneService: SceneService,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog,
    private deleteDialog: MatDialog) { }

  goBack() {
    this.location.back();
    console.log('goBack()...');
  }

  ngOnInit() {
    this.sceneService.getScenes().subscribe((ScenesMsg: ScenesMessage) => {
      if (ScenesMsg != null) {
        this.Scenes = ScenesMsg.Scenes;
        this.snackBar.open(ScenesMsg.Count + ' Scene' + (this.Scenes.length > 1 ? 's' : '') + ' loaded. ', '', { duration: 3000 });
        console.log(this.Scenes);
      }
      else this.snackBar.open('No Scenes returned. ', '', { duration: 5000 });
      return this.Scenes;
    }, (error) => {
        this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  onNew() {
    this.dialogConfig.data = undefined;
    this.dialog.open(SceneComponent, this.dialogConfig);
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    this.dialog.open(SceneComponent, this.dialogConfig);
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of scene '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.sceneService.deleteScene(this.selectedRow.SceneID);
      }
    });
  }
}
