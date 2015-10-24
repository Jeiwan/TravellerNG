export function ToursService(CountriesService, $resource) {
  'ngInject';
  var that = this;

  var parseQueryResult = function(response) {
    return angular.fromJson(response).results;
  };

  var prepareRelations = function(request) {
    request.country.__type = 'Pointer';
    request.country.className = 'Country';
    request.place.__type = 'Pointer';
    request.place.className = 'Place';

    return angular.toJson(request);
  };

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    { objectId: '@objectId', include: 'place,country' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT', transformRequest: prepareRelations },
      save: { method: 'POST', transformRequest: prepareRelations }
    }
  );

  angular.extend(Tour.prototype, {
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
  });

  var service = {
    query: Tour.query,
    get: Tour.get,
    create: Tour.save,
    update: Tour.update,
    destroy: Tour.remove
  };

  return service;
}
