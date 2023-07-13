import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiconfigService } from './apiconfig.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private base_url !: string;

    constructor(private http: HttpClient, private apiconfigService: ApiconfigService) {
      this.apiconfigService.loadApiBasePath().pipe(
        switchMap(() => this.apiconfigService.getApiBasePath())
      ).subscribe(
        (apiBaseUrl: string) => {
          this.base_url = apiBaseUrl;
          console.log('API Base URL:', this.base_url); // Verify the retrieved base URL
        },
        (error: any) => {
          console.log('Error retrieving API base URL:', error); // Log any errors during API base URL retrieval
        }
      );
    }


  getUsersStatistics(): Observable<any> {
    return this.http.get<any>( this.base_url + '/Statistics/users');
  }

  getModulesStatistics(): Observable<any> {
    return this.http.get<any>( this.base_url + '/Statistics/modules');
  }

  getProductsStatistics(): Observable<any> {
    return this.http.get<any>( this.base_url + '/Statistics/products');
  }
  getLicensesStatistics(): Observable<any> {
    return this.http.get<any>( this.base_url + '/Statistics/licenses');
  }

  getProductProgress(): Observable<any> {
    return this.http.get(`${this.base_url}/Statistics/progress`);
  }
  getProductsPercentage(): Promise<number> {
    return this.http.get<number>(`${this.base_url}/Statistics/productsPercentage`).toPromise();
  }
}
