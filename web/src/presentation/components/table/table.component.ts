import {
  Component, ViewChild, ChangeDetectionStrategy, Input,
  TemplateRef, ContentChildren, QueryList, AfterViewInit,
  SimpleChanges, OnChanges,
  inject
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormatMoneyService } from '../../../app/core/services/formatMoney.service';

const MODULES = [MatPaginatorModule, MatTableModule, MatSortModule, CommonModule];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [...MODULES],
  template: `
    <div class="mat-elevation-z8 rounded-md w-full overflow-x-auto">
      <table mat-table [dataSource]="dataSource" matSort class="bg-white!">
        <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ column.header }}
          </th>
          <td mat-cell *matCellDef="let row">
            <ng-container *ngIf="!column.custom; else customCell">
              @if(column.key === 'preco'){
                {{ formatCurrecy.formatEuro(row[column.key]) }}
              }@else if (column.key === 'statusBilhete') {
                @switch (row[column.key]) {
                  @case (0){
                    <span class="text-green-400! p-2  bg-blue-100 border font-medium rounded-md">{{'Activo' }}</span>
                  }
                  @case (1){
                    <span class="text-red-400! p-2 bg-blue-100 border font-medium rounded-md">{{ 'Cancelado' }}</span>
                  }
                  @case (2){
                    <span class="text-blue-400! p-2 bg-blue-100 border font-medium rounded-md">{{ 'Utilizado' }}</span>
                  }
                }
              }
              @else{
                {{ row[column.key]}}
              }
            </ng-container>
            <ng-template #customCell>
              <ng-container
                *ngTemplateOutlet="column.custom!; context: { $implicit: row }">
              </ng-container>
            </ng-template>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="pageSizeOptions"
        [pageSize]="pageSize"
        [length]="dataLength"
        showFirstLastButtons
        class="bg-white!"
        (page)="onPageChange($event)"
      ></mat-paginator>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20];
  formatCurrecy = inject(FormatMoneyService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<T>([]);
  displayedColumns: string[] = [];
  dataLength = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(c => c.key);
    }

    if (changes['data']) {
      this.dataSource.data = this.data;
      this.dataLength = this.data.length;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
  }
}

export interface TableColumn {
  key: string;
  header: string;
  custom?: TemplateRef<any>;
}
