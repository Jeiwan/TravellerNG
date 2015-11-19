/** @module j1Filter */
export function j1Filter() {
  'ngInject';

  var directive = {
    restrict: 'E',
    transclude: true,
    scope: {
      items: '=',
      field: '@',
      priority: '@'
    },
    link: link,
    templateUrl: 'app/components/j1_filter/j1_filter.html'
  };

  return directive;

  function link(scope, el, attr) {
    scope.resetFilter = resetFilter;
    scope.selectedItem = null;
    scope.values = [];

    var deregister = scope.$watchCollection('items', (newValue, _oldValue) => {
      if (newValue.length !== 0) {
        buildValues();
        deregister();
      }
    });

    // Следим за изменением фильтра
    scope.$watch('selectedItem', (newValue, oldValue) => {
      // Если выбрано новое значение для фильтра
      if (typeof newValue !== 'undefined' && newValue !== null) {
        // Фильтруем элементы
        scope.items.forEach((i) => {
          if (deepSeek(i, scope.field) === newValue) {
            i.filtered = true;
            i.j1FilteredOutBy = null;
          } else {
            i.filtered = false;
            if (i.j1FilteredOutBy === null || typeof i.j1FilteredOutBy === 'undefined') {
              i.j1FilteredOutBy = scope.field;
            }
          }
        });
      // Если фильтр сбрасывается (newValue = null)
      } else {
        // Отменяем фильтрацию только для тех элементов,
        // которые были отфильтрованы этим фильтром
        scope.items.filter((i) => {
          return i.j1FilteredOutBy === scope.field;
        }).forEach((i) => {
          i.filtered = true;
          i.j1FilteredOutBy = null;
        });
      }
      scope.$parent.$emit('j1-filter-changed', scope.priority, newValue);
    });

    scope.$parent.$on('j1-filter-changed', (event, priority, value) => {
      // Если изменени фильтр более высокого приоритета,
      // то перестраиваем список значений фильтра
      if (parseInt(priority, 10) < parseInt(scope.priority, 10)) {
        buildValues();

        if (value === null) {
          resetFilter();
        }
      }
    });

    function resetFilter() {
      scope.selectedItem = null;
    }

    // Построение списка значний для фильтра
    function buildValues() {
      var values = scope.items.filter((i) => {
        return i.filtered !== false;
      }).map((i) => {
        return deepSeek(i, scope.field);
      });

      scope.values = values.filter(uniques);
    }
  }

  /**
   * @function
   * Получение значения объекта по указанному пути
   * @param {Object} obj Объект, в котором происходит поиск
   * @param {String} path Путь для получения значения
   * @example
   * deepSeek({a: { b: { c: 'd' } }, 'a.b.c'); // 'd'
   */
  function deepSeek(obj, path) {
    var prop, props = path.split('.');

    prop = props[0];

    for (var i = 0; i < props.length - 1; i++) {
      var nextObj = obj[props[i]];

      if (typeof nextObj !== 'undefined') {
        obj = nextObj;
      } else {
        break;
      }
      prop = props[i+1];
    }

    return obj[prop];
  }

  function uniques(value, index, self) {
    return self.indexOf(value) === index;
  }
}
