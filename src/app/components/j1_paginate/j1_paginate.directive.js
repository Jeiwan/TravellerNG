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
    var filteredItems = [],
        activated = false;

    scope.currentPage = 1;
    scope.changePage = changePage;
    scope.firstPage = firstPage;
    scope.previousPage = previousPage;
    scope.nextPage = nextPage;
    scope.lastPage = lastPage;
    scope.pages = [];

    scope.$watch('items', (newVal, oldVal) => {
      // Если элементы загрузились
      if (!activated && newVal.length !== 0) {
        activate();
        activated = true;

        return;
      }

      // Если изменилась фильтрация элементов
      if (typeof scope.filter !== 'undefined' &&
          !angular.equals(newVal.map((v) => v[scope.filter]), oldVal.map((v) => v[scope.filter]))) {
        activate();
      }
    }, true);

    /**
     * Filters items before paginating, calculates number of pages,
     * switches to page 1
     */
    function activate() {
      var pages = 0;

      if (typeof scope.filter !== 'undefined') {
        filteredItems = scope.items.filter((i) => {
          return i[scope.filter] !== false;
        });
      } else {
        filteredItems = angular.copy(scope.items);
      }
      //scope.filteredItems = filteredItems;

      pages = Math.ceil(filteredItems.length / parseInt(scope.perPage, 10), 10);

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
      if (n > scope.pages.length) {
        alert('Wrong page number!');

        return;
      };
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
