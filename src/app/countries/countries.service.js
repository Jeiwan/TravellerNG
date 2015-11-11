export function CountriesService($http, $q, $resource) {
  'ngInject';

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    { objectId: '@objectId' },
    {
      query: { transformResponse: parseQueryResult, isArray: true },
      update: { method: 'PUT' }
    }
  );

  angular.extend(Country.prototype, {
    state: 'show',
    isShown() {
      return this.state === 'show';
    },
    isEdited() {
      return this.state === 'edit';
    },
    show() {
      this.state = 'show';
    },
    edit() {
      this.state = 'edit';
    }
  });

  return Country;

  function parseQueryResult(response) {
    response = angular.fromJson(response);
    return response.results;
  };
}
