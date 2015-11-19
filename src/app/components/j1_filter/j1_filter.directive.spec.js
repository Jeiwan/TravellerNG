describe('j1Filter', () => {
  var $compile, scope, highPriorityFilter, lowPriorityFilter;

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

    var highPriorityFilterHtml = "<j1-filter items='items' field='name' priority='1'>Clear</j1-filter>",
        lowPriorityFilterHtml = "<j1-filter items='items' field='relation.name' priority='2'>Clear</j1-filter>",
        highPriorityFilterElement = $compile(angular.element(highPriorityFilterHtml))(scope),
        lowPriorityFilterElement = $compile(angular.element(lowPriorityFilterHtml))(scope);

    scope.$digest();
    highPriorityFilter = { element: highPriorityFilterElement, scope: highPriorityFilterElement.isolateScope() };
    lowPriorityFilter = { element: lowPriorityFilterElement, scope: lowPriorityFilterElement.isolateScope() };
  });

  describe('linking', () => {
    it('applies template', () => {
      expect(highPriorityFilter.element.html()).not.toEqual('');
      expect(highPriorityFilter.element.find('.j1Filters')).toBeDefined();
      expect(lowPriorityFilter.element.html()).not.toEqual('');
      expect(lowPriorityFilter.element.find('.j1Filters')).toBeDefined();
    });

    it('sets items', () => {
      expect(highPriorityFilter.scope.items).toEqual(scope.items);
      expect(highPriorityFilter.scope.items).toEqual(scope.items);
    });

    it('sets field', () => {
      expect(highPriorityFilter.scope.field).toEqual('name');
      expect(lowPriorityFilter.scope.field).toEqual('relation.name');
    });

    it('sets priproty', () => {
      expect(highPriorityFilter.scope.priority).toEqual('1');
      expect(lowPriorityFilter.scope.priority).toEqual('2');
    });

    it('sets selectedItem', () => {
      expect(highPriorityFilter.scope.selectedItem).toEqual(null);
      expect(lowPriorityFilter.scope.selectedItem).toEqual(null);
    });

    it('builds values list', () => {
      expect(highPriorityFilter.scope.values).toEqual(['AAA', 'BBB', 'CCC']);
      expect(lowPriorityFilter.scope.values).toEqual(['XXX', 'YYY', 'ZZZ']);
    });
  });

  describe('filtering', () => {
    describe('first filter', () => {
      describe('when filter is applied', () => {
        it('correctly sets "filtered" property of item', () => {
          highPriorityFilter.scope.selectedItem = highPriorityFilter.scope.values[2];
          highPriorityFilter.scope.$digest();
          expect(highPriorityFilter.scope.items.filter(i => i.filtered).map(i => i.name)).toEqual(['CCC']);
        });

        it('rebuilds second filter values', () => {
          highPriorityFilter.scope.selectedItem = highPriorityFilter.scope.values[1];
          highPriorityFilter.scope.$digest();
          expect(lowPriorityFilter.scope.values).toEqual(['YYY', 'ZZZ']);
        });
      });

      describe('when filter is cleared', () => {
        it('shows all items', () => {
          highPriorityFilter.scope.selectedItem = highPriorityFilter.scope.values[1];
          highPriorityFilter.scope.$digest();
          highPriorityFilter.scope.resetFilter();
          highPriorityFilter.scope.$digest();
          expect(highPriorityFilter.scope.items.filter(i => i.filtered).map(i => i.name)).toEqual(highPriorityFilter.scope.items.map(i => i.name));
        });
      });
    });

    describe('second filter', () => {
      describe('when filter is applied', () => {
        it('correctly sets "filtered" property of item', () => {
          lowPriorityFilter.scope.selectedItem = lowPriorityFilter.scope.values[2];
          lowPriorityFilter.scope.$digest();
          expect(lowPriorityFilter.scope.items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(['ZZZ', 'ZZZ']);
        });

        it('does not rebuild first filter values', () => {
          highPriorityFilter.scope.selectedItem = highPriorityFilter.scope.values[1];
          highPriorityFilter.scope.$digest();
          expect(highPriorityFilter.scope.values).toEqual(['AAA', 'BBB', 'CCC']);
        });
      });

      describe('when filter is cleared', () => {
        it('shows all items', () => {
          lowPriorityFilter.scope.selectedItem = lowPriorityFilter.scope.values[1];
          lowPriorityFilter.scope.$digest();
          lowPriorityFilter.scope.resetFilter();
          lowPriorityFilter.scope.$digest();
          expect(lowPriorityFilter.scope.items.filter(i => i.filtered).map(i => i.relation.name)).toEqual(lowPriorityFilter.scope.items.map(i => i.relation.name));
        });
      });
    });
  });
});
