describe('j1Filter', () => {
  var $compile, scope, j1Filters = [], iScopes = [];

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, $rootScope) => {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });

    scope.items = [
      { name: 'AAA', relation: { name: 'XXX' } },
      { name: 'BBB', relation: { name: 'YYY' } },
      { name: 'AAA', relation: { name: 'XXX' } },
      { name: 'CCC', relation: { name: 'ZZZ' } },
      { name: 'AAA', relation: { name: 'XXX' } },
      { name: 'BBB', relation: { name: 'ZZZ' } },
      { name: 'AAA', relation: { name: 'XXX' } }
    ];

    var html1 = "<j1-filter items='items' field='name' priority='1'>Clear</j1-filter>",
        html2 = "<j1-filter items='items' field='relation.name' priority='2'>Clear</j1-filter>";

    j1Filters[0] = $compile(angular.element(html1))(scope);
    j1Filters[1] = $compile(angular.element(html2))(scope);
    scope.$digest();
    iScopes[0] = j1Filters[0].isolateScope();
    iScopes[1] = j1Filters[1].isolateScope();
  });

  describe('linking', () => {
    it('applies template', () => {
      expect(j1Filters[0].html()).not.toEqual('');
      expect(j1Filters[0].find('.j1Filters')).toBeDefined();
      expect(j1Filters[1].html()).not.toEqual('');
      expect(j1Filters[1].find('.j1Filters')).toBeDefined();
    });

    it('sets items', () => {
      expect(iScopes[0].items).toEqual(scope.items);
      expect(iScopes[1].items).toEqual(scope.items);
    });

    it('sets field', () => {
      expect(iScopes[0].field).toEqual('name');
      expect(iScopes[1].field).toEqual('relation.name');
    });

    it('sets priproty', () => {
      expect(iScopes[0].priority).toEqual('1');
      expect(iScopes[1].priority).toEqual('2');
    });

    it('sets selectedItem', () => {
      expect(iScopes[0].selectedItem).toEqual(null);
      expect(iScopes[1].selectedItem).toEqual(null);
    });

    it('builds values list', () => {
      expect(iScopes[0].values).toEqual(['AAA', 'BBB', 'CCC']);
      expect(iScopes[1].values).toEqual(['XXX', 'YYY', 'ZZZ']);
    });
  });

  describe('filtering', () => {
    describe('first filter', () => {
      describe('when filter is applied', () => {
        it('correctly sets "filtered" property of item', () => {
          iScopes[0].selectedItem = iScopes[0].values[1];
          iScopes[0].$digest();
          expect(iScopes[0].items.filter(i => i.filtered).map(i => i.name)).toEqual(['BBB', 'BBB']);

          iScopes[0].selectedItem = iScopes[0].values[2];
          iScopes[0].$digest();
          expect(iScopes[0].items.filter(i => i.filtered).map(i => i.name)).toEqual(['CCC']);

          iScopes[0].selectedItem = iScopes[0].values[0];
          iScopes[0].$digest();
          expect(iScopes[0].items.filter(i => i.filtered).map(i => i.name)).toEqual(['AAA', 'AAA', 'AAA', 'AAA']);
        });

        it('rebuilds second filter values', () => {
          iScopes[0].selectedItem = iScopes[0].values[1];
          iScopes[0].$digest();
          expect(iScopes[1].values).toEqual(['YYY', 'ZZZ']);
        });
      });

      describe('when filter is cleared', () => {
        it('shows all items', () => {
          iScopes[0].selectedItem = iScopes[0].values[1];
          iScopes[0].$digest();
          iScopes[0].resetFilter();
          iScopes[0].$digest();
          expect(iScopes[0].items.filter(i => i.filtered).map(i => i.name)).toEqual(iScopes[0].items.map(i => i.name));
        });
      });
    });

    describe('second filter', () => {
      describe('when filter is applied', () => {
        it('correctly sets "filtered" property of item', () => {
          iScopes[1].selectedItem = iScopes[1].values[1];
          iScopes[1].$digest();
          expect(iScopes[1].items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(['YYY']);

          iScopes[1].selectedItem = iScopes[1].values[2];
          iScopes[1].$digest();
          expect(iScopes[1].items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(['ZZZ', 'ZZZ']);

          iScopes[1].selectedItem = iScopes[1].values[0];
          iScopes[1].$digest();
          expect(iScopes[1].items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(['XXX', 'XXX', 'XXX', 'XXX']);
        });

        it('does not rebuild first filter values', () => {
          iScopes[1].selectedItem = iScopes[1].values[1];
          iScopes[1].$digest();
          expect(iScopes[0].values).toEqual(['AAA', 'BBB', 'CCC']);
        });
      });

      describe('when filter is cleared', () => {
        it('shows all items', () => {
          iScopes[1].selectedItem = iScopes[1].values[1];
          iScopes[1].$digest();
          iScopes[1].resetFilter();
          iScopes[1].$digest();
          expect(iScopes[1].items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(iScopes[1].items.map(i => i.relation.name));
        });
      });
    });
  });
});
