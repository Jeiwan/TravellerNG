describe('edit_country_form', () => {
  var $compile, $rootScope, $templateCache, newCountryForm;

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, _$rootScope_, _$templateCache_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });

    var template = angular.element($templateCache.get('app/admin/countries/edit_country_form.html'));
    $compile(template)($rootScope);
    $rootScope.$digest();
    newCountryForm = $rootScope.form;
  });

  describe('when all fields are filled correctly', () => {
    it('should be valid', () => {
      newCountryForm.name.$setViewValue('Test');
      expect(newCountryForm.$valid).toEqual(true);
    });
  });

  describe('when not all fields are filled correctly', () => {
    it('should not be valid', () => {
      newCountryForm.name.$setViewValue('Tt');
      expect(newCountryForm.$valid).toEqual(false);
    });
  });
});
