export function PlacesService($resource) {
  'ngInject';

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

  return Place;

  function parseQueryResult(response) {
    return angular.fromJson(response).results;
  }

  function prepareRelations(request) {
    request.country.__type = 'Pointer';
    request.country.className = 'Country';

    return angular.toJson(request);
  }

  function prepareUpdateRequest(request) {
    request = angular.fromJson(prepareRelations(request));

    delete request.state;

    return angular.toJson(request);
  }

  function prepareSaveRequest(request) {
    request = angular.fromJson(prepareRelations(request));

    delete request.state;

    return angular.toJson(request);
  }
}
