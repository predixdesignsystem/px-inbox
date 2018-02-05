describe('px-inbox', () => {
  let inboxEl;

  beforeEach((done) => {
    inboxEl = fixture('InboxFixture');
    flush(done);
  });

  it('renders all the list items', () => {
    const listItemEls = Polymer.dom(inboxEl.root).querySelectorAll('li');
    assert.equal(listItemEls.length, 6);
  });

  it('filters items when the search input changes', (done) => {
    const searchInput = Polymer.dom(inboxEl.root).querySelector('input');
    searchInput.value = 'CMS';
    searchInput.dispatchEvent(new Event('input')); /* manually trigger input event to simulate user input */
    flush(() => {
      const listItemEls = Polymer.dom(inboxEl.root).querySelectorAll('li');
      assert.equal(inboxEl._query, 'CMS');
      assert.equal(listItemEls.length, 2);
      done();
    });
  });

  it('sorts items when the sort by direction is changed', (done) => {
    const sortDropdown = Polymer.dom(inboxEl.root).querySelector('px-dropdown');
    sortDropdown.selected = 'Title';
    flush(() => {
      const listItemEls = Polymer.dom(inboxEl.root).querySelectorAll('li');
      assert.equal(inboxEl.sortBy, 'Title');
      assert.equal(listItemEls[0].id, '1');
      assert.equal(listItemEls[1].id, '6');
      assert.equal(listItemEls[2].id, '2');
      assert.equal(listItemEls[3].id, '4');
      assert.equal(listItemEls[4].id, '5');
      assert.equal(listItemEls[5].id, '3');
      done();
    });
  });

  it('updates the selected item when an inbox item is tapped', () => {
    const listItemEls = Polymer.dom(inboxEl.root).querySelectorAll('li');
    listItemEls[3].click();
    assert.isTrue(listItemEls[3].classList.contains('selected'));
    assert.equal(inboxEl.selectedItem, listItemEls[3].id);
    assert.equal(inboxEl.selectedItemRef, inboxEl.listItems[3]);
  });

  it('selects the first list item by default', () => {
    assert.equal(inboxEl.selectedItem, inboxEl.listItems[0].id);
    assert.equal(inboxEl.selectedItemRef, inboxEl.listItems[0]);
  });

  it('does not select the first list item if `disable-auto-select` attribute is defined first', (done) => {
    const inboxDisableAutoSelectEl = fixture('InboxDisableAutoSelectFixture');
    flush(() => {
      assert.isUndefined(inboxDisableAutoSelectEl.selectedItem);
      assert.isUndefined(inboxDisableAutoSelectEl.selectedItemRef);
      done();
    });
  });
});

describe('px-inbox date formatting', () => {
  let inboxEl;
  
  beforeEach((done) => {
    inboxEl = fixture('InboxFixture');
    flush(done);
  });

  it('does not format dates that are not valid ISO-8601 strings', () => {
    assert.equal(inboxEl._getFormattedDate('a long time ago'), 'a long time ago');
  });

  it('correctly formats time a few seconds ago', () => {
    const nowDate = new Date('2016-10-05T08:00:00');
    const pastDate = new Date('2016-10-05T07:59:16'); // 44 seconds before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'a few seconds ago');
  });

  it('correctly formats time a minute ago', () => {
    const nowDate = new Date('2016-10-05T08:00:00');
    const pastDate = new Date('2016-10-05T07:59:15'); // 45 seconds before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'a minute ago');
  });

  it('correctly formats time [n] minutes ago', () => {
    const nowDate = new Date('2016-10-05T08:00:00');
    const pastDate = new Date('2016-10-05T07:16:00'); // 44 minutes before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), '44 minutes ago');
  });

  it('correctly formats time an hour ago', () => {
    const nowDate = new Date('2016-10-05T08:00:00');
    const pastDate = new Date('2016-10-05T07:15:00'); // 45 minutes before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'an hour ago');
  });

  it('correctly formats time [n] hours ago', () => {
    const nowDate = new Date('2016-10-05T23:00:00');
    const pastDate = new Date('2016-10-05T02:00:00'); // 21 hours before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), '21 hours ago');
  });

  it('correctly formats time a day ago', () => {
    const nowDate = new Date('2016-10-05T23:00:00');
    const pastDate = new Date('2016-10-05T01:00:00'); // 22 hours before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'a day ago');
  });

  it('correctly formats time [n] days ago', () => {
    const nowDate = new Date('2016-10-28T23:00:00');
    const pastDate = new Date('2016-10-03T23:00:00'); // 25 days before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), '25 days ago');
  });

  it('correctly formats time a month ago', () => {
    const nowDate = new Date('2016-10-28T23:00:00');
    const pastDate = new Date('2016-10-02T23:00:00'); // 26 days before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'a month ago');
  });

  it('correctly formats time [n] months ago', () => {
    const nowDate = new Date('2016-12-10T23:00:00');
    const pastDate = new Date('2016-02-10T23:00:00'); // 10 months before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), '10 months ago');
  });

  it('correctly formats time a year ago', () => {
    const nowDate = new Date('2016-12-10T23:00:00');
    const pastDate = new Date('2016-01-10T23:00:00'); // 11 months before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), 'a year ago');
  });

  it('correctly formats time [n] years ago', () => {
    const nowDate = new Date('2016-12-10T23:00:00');
    const pastDate = new Date('2013-12-10T23:00:00'); // 3 years before nowDate
    assert.equal(inboxEl._formatDateFromNow(pastDate, nowDate), '3 years ago');
  });

  it('handles date objects correctly', () => {
    const item = [{"id":"1","title":"test","subtitle":"test","date":new Date(),"severity":"important"}];
    inboxEl.set('listItems', item);
    flush(function() {
      assert.equal(Polymer.dom(inboxEl.root).querySelector('.info').textContent.trim(), 'a few seconds ago');
    });
  });
});
