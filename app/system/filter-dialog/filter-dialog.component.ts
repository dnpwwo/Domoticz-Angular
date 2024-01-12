import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  form: FormGroup;
  header: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public filterData: string) { }

  ngOnInit() {
    if (this.filterData.length) {
      let json = JSON.parse(this.filterData);
      this.header = "Filter on " + json[0].id + " column";
      this.form = this.formBuilder.group({ filter: [json[0].value] })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const tableFilters = [];
    let json = JSON.parse(this.filterData);
    tableFilters.push({ id: json[0].id, value: this.form.value.filter });
    this.dialogRef.close(JSON.stringify(tableFilters));
  }
}
