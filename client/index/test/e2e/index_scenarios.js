describe('Resource', function() {

  ddescribe('Index', function() {
 
    beforeEach(function() {
      browser().navigateTo('/');
      login();
      createPersonnel('testname');
      browser().navigateTo('/');
    });
    
    afterEach(function() {
      deletePersonnel('testname');
      logout();
    });
 
    it('should allow the entry of search terms', function() {
      input('form.searchTerms').enter('hello');
      expect(input('form.searchTerms').val()).toBe('hello');
    });

  });

});

function createPersonnel(name, surname) {
  element('a[href$="addPersonnel"]').click();
  input('form.name').enter(name);
  input('form.surname').enter(surname);
  element('#addPersonnelButton').click();
}