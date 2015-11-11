/** @module j1Paginate */
export function j1Paginate() {
  var directive = {
    link: link,
    scope: {
      items: '=',
      perPage: '@',
      filter: '@'
    },
    templateUrl: 'app/components/j1_paginate/j1_paginate.html'
  };

  return directive;

  function link(scope, el, attr) {
    var filteredItems = [];

    scope.currentPage = 1;
    scope.changePage = changePage;
    scope.firstPage = firstPage;
    scope.previousPage = previousPage;
    scope.nextPage = nextPage;
    scope.lastPage = lastPage;
    scope.pages = [];


    scope.$watch('items', (newVal, oldVal) => {
      if (newVal.length !== 0 && oldVal.length === 0) {
        activate();
        return;
      }

      if (!angular.equals(newVal.map((v) => v[scope.filter]), oldVal.map((v) => v[scope.filter]))) {
        paginateAll();
        activate();
      }
    }, true);

    /**
     * Filters items before paginating, calculates number of pages,
     * switches to page 1
     */
    function activate() {
      var pages = 0;

      filteredItems = scope.items.filter((i) => {
        return i[scope.filter] !== false;
      });

      pages = parseInt(filteredItems.length / parseInt(scope.perPage, 10), 10);

      scope.pages = [];
      for(var i = 1; i <= pages; i++) {
        scope.pages.push(i);
      }
      depaginateAll();
      paginatePage(1);
    }

    /** Changes page
     * @param {Number} n Page number
     */
    function changePage(n) {
      depaginateAll();
      paginatePage(n);
      scope.currentPage = n;
    }

    function paginateAll() {
      filteredItems.forEach((i) => {
        i.paginated = true;
      });
    }

    function depaginateAll() {
      filteredItems.forEach((i) => {
        i.paginated = false;
      });
    }

    /** Set 'paginated' to true for all items on the chosen page
     * @param {Integer} n Page to choose
     */
    function paginatePage(n) {
      var first = scope.perPage * (n - 1),
          last = scope.perPage * n;

      filteredItems.slice(first, last).forEach((i) => {
        i.paginated = true;
      });
    }

    function firstPage() {
      changePage(1);
    }

    function previousPage() {
      changePage(scope.currentPage - 1);
    }

    function nextPage() {
      changePage(scope.currentPage + 1);
    }

    function lastPage() {
      changePage(scope.pages.length);
    }
  }
}
