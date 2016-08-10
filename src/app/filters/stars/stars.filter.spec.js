describe('StarsFilter', function() {
  var StarsFilter, $sce;

  beforeEach(() => {
    window.module('TravellerNG');

    inject(($filter, _$sce_) => {
      StarsFilter = $filter('stars');
      $sce = _$sce_;
    });
  });

  describe('when maxStars is default', () => {
    describe('when stars are maximum', () => {
      it('returns all full star-icons', () => {
        var result = $sce.getTrustedHtml(StarsFilter(5));
        expect(result.split('data-star="full"').length - 1).toEqual(5);
        expect(result.split('data-star="empty"').length - 1).toEqual(0);
      });
    });

    describe('when stars are not maximum', () => {
      it('returns full and empty star-icons', () => {
        var result = $sce.getTrustedHtml(StarsFilter(3));
        expect(result.split('data-star="full"').length - 1).toEqual(3);
        expect(result.split('data-star="empty"').length - 1).toEqual(2);
      });
    });
  });

  describe('when maxStars is not default', () => {
    describe('when stars are maximum', () => {
      it('returns all full star-icons', () => {
        var result = $sce.getTrustedHtml(StarsFilter(10, 10));
        expect(result.split('data-star="full"').length - 1).toEqual(10);
        expect(result.split('data-star="empty"').length - 1).toEqual(0);
      });
    });

    describe('when stars are not maximum', () => {
      it('returns full and empty star-icons', () => {
        var result = $sce.getTrustedHtml(StarsFilter(6, 10));
        expect(result.split('data-star="full"').length - 1).toEqual(6);
        expect(result.split('data-star="empty"').length - 1).toEqual(4);
      });
    });
  });
});
