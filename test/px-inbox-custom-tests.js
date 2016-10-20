// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-inbox', function() {
    var inboxEl = Polymer.dom(document).querySelector('#px_inbox_1')
    test('Test that list is proper length', function(done){
      var list = Polymer.dom(inboxEl.root).querySelectorAll('li');
      assert.equal(list.length, 6);
      done();
    });
    test('Test that search works', function(done){
      flush(function() {
        var searchbox = Polymer.dom(inboxEl).querySelector('input');
        searchbox.value = "CMS";
        assert.equal(inboxEl._query, "CMS");
        var listItems = Polymer.dom(inboxEl.root).querySelectorAll('li');
        assert.equal(listItems.length, 2);
        done();
      });
      done();
    });
    test('Test that sort works', function(done){
      flush(function() {
        var sortDropdown = Polymer.dom(inboxEl).querySelector('px-dropdown');
        sortDropdown.value = "Title";
        assert.equal(inboxEl.sortBy, "Title");
        var listItems = Polymer.dom(inboxEl.root).querySelectorAll('li');
        assert.equal(listItems[0].id, 1);
        assert.equal(listItems[1].id, 6);
        assert.equal(listItems[2].id, 2);
        assert.equal(listItems[3].id, 4);
        assert.equal(listItems[4].id, 5);
        assert.equal(listItems[5].id, 3);
        done();
      });
      done();
    });
    test('Test that selection works', function(done){
        var listItems = Polymer.dom(inboxEl.root).querySelectorAll('li'),
            evt = new Event('click');
        listItems[0].dispatchEvent(evt);
        assert.isTrue(listItems[0].classList.contains('selected'));
        assert.equal(listItems[0].id, inboxEl.selectedItem);
        done();
    });
  });
};
