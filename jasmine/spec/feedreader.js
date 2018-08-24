/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite contains tests all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the
         * allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a valid URL', function() {
           allFeeds.forEach(function(item) {
             expect(item.url).toBeDefined();
             expect(item.url.length).not.toBe(0);
           });
         });


        /* This test loops through each feed in the
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a valid name', function() {
           allFeeds.forEach(function(item) {
             expect(item.name).toBeDefined();
             expect(item.name.length).not.toBe(0);
           });
         });
    });


    /* This test suite contains tests about the menu.*/
    describe('The menu', function() {

        /* This test ensures the menu element is hiden by default.*/
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
           // Alternative method of chekcing:
           //expect(document.getElementsByClassName('menu-hidden')[0]).toBeDefined();
         });

         /* This test ensures the menu changes visibiliity
         * when the menu icon is clicked.*/
          it('changes visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Alternative method of checking:
            //expect(document.getElementsByClassName('menu-hidden')[0]).toBeUndefined();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* This test suite contains tests about initial entries.*/
    describe('Initial Entries', function() {
      beforeEach(function(done){
        loadFeed(0,function() {
          done();
        });
      });
      /* This test ensures that when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      it('loads correctly', function(done) {
        expect($('.feed .entry').length).toBeGreaterThan(0);
        done();
      });
    });


    /* This test suite contains tests about a new feed selection.
    * Since the function is asynchronous, beforeEach is used.*/
    describe('New Feed Selection', function() {
      var firstFeed = "";
      var nextFeed  = "";

       beforeEach(function(done){
         // load the first feed and store the html of the
         // first entry in the variable firstFeed
         loadFeed(0,function() {
           firstFeed = $('.feed .entry').html();

           // load the next feed and store the html of the
           // next entry in the variable nextFeed
           loadFeed(1, function() {
             nextFeed = $('.feed .entry').html();

             done();
           });
         });
       });

       /* This test ensures that when a new feed is loaded
        * by the loadFeed function, the content actually changes.
        */
       it('loads new content', function(done) {
         expect(firstFeed).not.toEqual(nextFeed);
         done();
       });
    });
}());
