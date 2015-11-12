describe('j1Paginate', () => {
  var $compile, scope, j1Paginate, iScope;

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, $rootScope) => {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });

    scope.items = [
      {value: 1, filtered: false},
      {value: 2, filtered: true},
      {value: 3, filtered: false},
      {value: 4, filtered: true},
      {value: 5, filtered: false},
      {value: 6, filtered: true},
      {value: 7, filtered: false},
      {value: 8, filtered: true},
      {value: 9, filtered: false},
      {value: 10, filtered: true},
      {value: 11, filtered: false},
      {value: 12, filtered: true},
      {value: 13, filtered: false},
      {value: 14, filtered: true}
    ];

    var html = "<j1-paginate items='items' per-page='2' filter='filtered'></j1-paginate>";
    j1Paginate = $compile(angular.element(html))(scope);
    scope.$digest();
    iScope = j1Paginate.isolateScope();
  });

  describe('linking', () => {
    it('applies template', () => {
      expect(j1Paginate.html()).not.toEqual('');
      expect(j1Paginate.find('[ng-repeat]')).toBeDefined();
    });

    it('sets items', () => {
      expect(iScope.items).toEqual(scope.items);
    });

    it('sets perPage', () => {
      expect(iScope.perPage).toEqual('2');
    });

    it('sets filter', () => {
      expect(iScope.filter).toEqual('filtered');
    });

    it('sets currentPage', () => {
      expect(iScope.currentPage).toEqual(1);
    });

    it('fills pages array', () => {
      expect(iScope.pages.length).toEqual(4);
    });

    it('paginates items on the first page', () => {
      expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([2, 4]);
    });
  });

  describe('changePage(n)', () => {
    describe('when page number is correct', () => {
      it('changes page', () => {
        iScope.changePage(2);
        expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([6, 8]);

        iScope.changePage(3);
        expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([10, 12]);

        iScope.changePage(4);
        expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([14]);

        iScope.changePage(1);
        expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([2, 4]);
      });
    });

    describe('when page number is incorrect', () => {
      it('alerts', () => {
        spyOn(window, 'alert');
        iScope.changePage(5);
        expect(window.alert).toHaveBeenCalledWith('Wrong page number!');
      });
    });
  });

  describe('firstPage()', () => {
    it('goes to the first page', () => {
      iScope.changePage(3);
      iScope.firstPage();
      expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([2, 4]);
    });
  });

  describe('previousPage()', () => {
    it('goes to the previous page', () => {
      iScope.changePage(2);
      iScope.previousPage();
      expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([2, 4]);
    });
  });

  describe('nextPage()', () => {
    it('goes to the next page', () => {
      iScope.nextPage();
      expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([6, 8]);
    });
  });

  describe('lastPage()', () => {
    it('goes to the last page', () => {
      iScope.lastPage();
      expect(iScope.items.filter(i => i.paginated).map(i => i.value)).toEqual([14]);
    });
  });
});
