import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [AchievementsComponent],
  imports: [
    CommonModule,
    SharedModule,
  RouterModule.forChild([
    {
      path : '',
      component: AchievementsComponent
    }
  ])]
})
export class AchievementsModule { }
