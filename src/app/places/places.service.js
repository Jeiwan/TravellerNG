export function PlacesService($resource) {
  'ngInject';

  var parseQueryResult = function(response) {
    return angular.fromJson(response).results;
  };

  var prepareRelations = function(request) {
    request.country.__type = 'Pointer';
    request.country.className = 'Country';

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

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    { objectId: '@objectId', include: 'country' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT', transformRequest: prepareUpdateRequest },
      save: { method: 'POST', transformRequest: prepareSaveRequest }
    }
  );

  angular.extend(Place.prototype, {
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
    query: Place.query,
    get: Place.get,
    create: Place.save,
    update: Place.update,
    destroy: Place.remove
  };

  return service;
}
