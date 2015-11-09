export function ToursService(CountriesService, $resource) {
  'ngInject';

  var parseQueryResult = function(response) {
    return angular.fromJson(response).results;
  };

  var prepareRelations = function(request) {
    request.country.__type = 'Pointer';
    request.country.className = 'Country';
    request.place.__type = 'Pointer';
    request.place.className = 'Place';
    request.hotel.__type = 'Pointer';
    request.hotel.className = 'Hotel';

    return angular.toJson(request);
  };

  var prepareUpdateRequest = function(request) {
    request = angular.fromJson(prepareRelations(request));

    delete request.state;

    return angular.toJson(request);
  };

  var prepareSaveRequest = function(request) {
    request = angular.fromJson(prepareRelations(request));

    delete request.state;

    return angular.toJson(request);
  };

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    { objectId: '@objectId', include: 'place,country,hotel' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT', transformRequest: prepareUpdateRequest },
      save: { method: 'POST', transformRequest: prepareSaveRequest }
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
    }
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
