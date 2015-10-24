export function config ($logProvider, $httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  $httpProvider.defaults.headers.common = {
    'X-Parse-Application-Id': 'NPvfRBwctZRRyAvnnn7m9e1YBJ0HF6UR5szlXdsc',
    'X-Parse-REST-API-Key': 'tkdojfs3KoTvRIJMGipliLwT6WNzux4MaWA0EiUG'
  };
}
