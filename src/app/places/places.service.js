export function PlacesService($resource) {
  'ngInject';

  var parseQueryResult = function(response) {
    return angular.fromJson(response).results;
  };

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    { objectId: '@objectId' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT' }
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
    },
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
