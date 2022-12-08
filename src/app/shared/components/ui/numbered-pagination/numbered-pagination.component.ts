import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { CommonModule } from '@angular/common'

import { allowNavigation, NumberedPagination, ruler } from '@shared/helpers'

@Component({
  standalone: true,
  selector: 'app-numbered-pagination',
  templateUrl: './numbered-pagination.component.html',
  styleUrls: ['./numbered-pagination.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberedPaginationComponent {
  @Input() index: number = 1;
  @Input() set totalCount(count: number) {
    this._totalCount = count;
    if (count > (this.pageSize * 5)) {
      this.rulerLength = 5;
    } else {
      this.rulerLength = Math.ceil(count / this.pageSize);
    }
    this.maxPages = Math.ceil(this.totalCount / this.pageSize);
  }
  @Input() pageSize: number = 5;
  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  public get totalCount() {
    return this._totalCount;
  }

  public maxPages: number = 1;
  public maxRulerLength: number = 5;
  public rulerLength: number = this.maxRulerLength;

  private _totalCount: number = 5;

  constructor() {}

  public get pagination(): NumberedPagination {
    const { index, maxPages, rulerLength } = this;
    const pages = ruler(index, maxPages, rulerLength);
    return { index, maxPages, pages } as NumberedPagination;
  }

  public navigateToPage(pageNumber: number): void {
    if (allowNavigation(pageNumber, this.index, this.maxPages)) {
      this.index = pageNumber;
      this.page.emit(this.index);
    }
  }

  public trackByFn(index: number): number {
    return index;
  }
}

