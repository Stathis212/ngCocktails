
import { NumberedPaginationComponent } from './numbered-pagination.component'

describe('NumberedPaginationComponent', () => {
  let component: NumberedPaginationComponent;

  beforeEach(async () => {
    component = new NumberedPaginationComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to page', () => {
    const setPageEmitSpy = spyOn<any>(component['page'], 'emit');

    component.totalCount = 60;
    component.navigateToPage(2);

    expect(component.index).toEqual(2);
    expect(setPageEmitSpy).toHaveBeenCalledWith(2);
  });
});
