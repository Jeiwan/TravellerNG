export function HotelsService($resource) {
  'ngInject';

  var Hotel = $resource(
    'https://api.parse.com/1/classes/Hotel/:objectId',
    { objectId: '@objectId', include: 'place' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT', transformRequest: prepareRelations },
      save: { method: 'POST', transformRequest: prepareRelations }
    }
  );

  angular.extend(Hotel.prototype, {
    state: 'show',
    edit() {
      this.state = 'edit';
    },
    show() {
      this.state = 'show';
    },
    isShown() {
      return this.state === 'show';
    },
    isEdited() {
      return this.state === 'edit';
    },
    starsArray() {
      var array = [];

      for (var i = 0; i < 5; i++) {
        if (i < this.stars) {
          array.push(1);
        } else {
          array.push(0);
        }
      }

      return array;
    }
  });

  return Hotel;

  function parseQueryResult(response) {
    return angular.fromJson(response).results;
  };

  function prepareRelations(request) {
    request.place.__type = 'Pointer';
    request.place.className = 'Place';

    return angular.toJson(request);
  };
}
