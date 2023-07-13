import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  usersCount: number=0;
  activeUsersCount: number=0;
  inactiveUsersCount: number=0;
  modulesCount: number=0;
  activeModulesCount :number=0;
  inactiveModulesCount: number=0;
  productsCount: number=0;
  activeProductsCount :number=0;
  inactiveProductsCount: number=0;
  licensesCount: number=0;
  activeLicensesCount :number=0;
  inactiveLicensesCount: number=0;
  percentage: number=0;
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getUsersStatistics().subscribe((data: any) => {
      this.usersCount = data.usersCount;
      this.activeUsersCount = data.activeUsersCount;
      this.inactiveUsersCount = data.inactiveUsersCount;
      this.getProductsPercentage();
    });

    this.statisticsService.getModulesStatistics().subscribe((data: any) => {
      this.modulesCount = data.modulesCount;
    });

    this.statisticsService.getProductsStatistics().subscribe((data: any) => {
      this.productsCount = data.productsCount;
    });

    this.statisticsService.getLicensesStatistics().subscribe((data: any) => {
      this.licensesCount = data.licensesCount;
    });
  }
  async getProductsPercentage(): Promise<void> {
    this.percentage = await this.statisticsService.getProductsPercentage();
  }
}
