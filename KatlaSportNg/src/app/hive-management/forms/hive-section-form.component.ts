import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSection } from '../models/hive-section';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {
 
  hiveSection = new HiveSection(0, "", "", false, "", 0);
  existed = false;
  hiveId: number;
  nameValue: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.hiveSectionService.getHiveSection(p['id']).subscribe(h => this.hiveSection = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.location.back();
  }

  onCancel() {
    this.navigateToHives();
  }

  onSubmit(hiveSection: HiveSection) {
    this.hiveId = +sessionStorage.getItem("key");
    if(hiveSection.id > 0) this.onUpdate(hiveSection);
    else this.onAdd(hiveSection);
  }

  onAdd(hiveSection: HiveSection) {
    hiveSection.hiveId = this.hiveId;
    this.hiveSectionService.addHiveSection(hiveSection).subscribe(h => hiveSection.id);
  }

  onUpdate(hiveSection: HiveSection) {
    hiveSection.hiveId = this.hiveId;
    this.hiveSectionService.updateHiveSection(hiveSection).subscribe(h => hiveSection.id);
  }

  onDelete(hiveSectionId: number, hiveSection: HiveSection) {
    this.hiveSectionService.setHiveSectionStatus(hiveSectionId, true).subscribe(c => hiveSection.isDeleted = true);
  }

  onUndelete(hiveSectionId: number, hiveSection: HiveSection) {
    this.hiveSectionService.setHiveSectionStatus(hiveSectionId, false).subscribe(c => hiveSection.isDeleted = false);
  }

  onPurge() {
    this.nameValue='';
  }
}
