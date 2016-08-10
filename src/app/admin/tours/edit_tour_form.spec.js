describe('edit_tour_form', () => {
  var $compile, $rootScope, $templateCache, newTourForm;

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, _$rootScope_, _$templateCache_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });

    var template = angular.element($templateCache.get('app/admin/tours/edit_tour_form.html'));
    $compile(template)($rootScope);
    $rootScope.$digest();
    newTourForm = $rootScope.form;
  });

  describe('when all fields are filled correctly', () => {
    it('should be valid', () => {
      newTourForm.country.$setViewValue('1');
      newTourForm.place.$setViewValue('1');
      newTourForm.hotel.$setViewValue('1');
      newTourForm.title.$setViewValue('Test');
      newTourForm.price.$setViewValue('100');
      newTourForm.text.$setViewValue('Test description');
      expect(newTourForm.$valid).toEqual(true);
    });
  });

  describe('when not all fields are filled correctly', () => {
    it('should not be valid', () => {
      newTourForm.title.$setViewValue('Tt');
      newTourForm.price.$setViewValue('-100');
      newTourForm.text.$setViewValue('Tt');
      expect(newTourForm.$valid).toEqual(false);
    });
  });
});
