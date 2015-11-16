describe('edit_place_form', () => {
  var $compile, $rootScope, $templateCache, newPlaceForm;

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, _$rootScope_, _$templateCache_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });

    var template = angular.element($templateCache.get('app/admin/places/edit_place_form.html'));
    $compile(template)($rootScope);
    $rootScope.$digest();
    newPlaceForm = $rootScope.form;
  });

  describe('when all fields are filled correctly', () => {
    it('should be valid', () => {
      newPlaceForm.country.$setViewValue('1');
      newPlaceForm.name.$setViewValue('Test');
      expect(newPlaceForm.$valid).toEqual(true);
    });
  });

  describe('when not all fields are filled correctly', () => {
    it('should not be valid', () => {
      newPlaceForm.country.$setViewValue(null);
      newPlaceForm.name.$setViewValue('Tt');
      expect(newPlaceForm.$valid).toEqual(false);
    });
  });
});
