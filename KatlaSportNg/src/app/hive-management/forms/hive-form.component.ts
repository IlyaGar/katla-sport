import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: ['./hive-form.component.css']
})
export class HiveFormComponent implements OnInit {

  hive = new Hive(0, "", "", "", false, "");
  existed = false;
  nameValue:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.hiveService.getHive(p['id']).subscribe(h => this.hive = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.router.navigate(['/hives']);
  }

  onCancel() {
    this.navigateToHives();
  }
  
  onSubmit(hive: Hive) {
    if(hive.id > 0) this.onUpdate(hive);
    else this.onAdd(hive);
  }

  onAdd(hive: Hive) {
    this.hiveService.addHive(hive).subscribe(h => hive.id);
  }

  onUpdate(hive: Hive) {
    this.hiveService.updateHive(hive).subscribe(h => hive.id);
  }

  onDelete(hiveId: number, hive: Hive) {
    this.hiveService.setHiveStatus(hiveId, true).subscribe(c => hive.isDeleted = true);
  }

  onUndelete(hiveId: number, hive: Hive) {
    this.hiveService.setHiveStatus(hiveId, false).subscribe(c => hive.isDeleted = false);
  }

  onPurge() {
    this.nameValue='';
  }
}
