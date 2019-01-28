
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./jqlite.js');
var jQuery = window.$ = window.jQuery = require('./jquery.js');
window.angular = global.angular = require('angular');
require('./bootstrap.js');
require('./angular-ui-router.min.js');
require('./angular-filter.min.js');
require('./angular-messages.min.js');
require('./ui-bootstrap-tpls.js');
require('./moment.min.js');
require('./main.js');
require('./build.js');
require('./select2.js');
require('./plugin.js');
require('./chosen/js/chosen.jquery.js');
require('./chosen/js/angular-chosen.min.js');
window.laroute = require('./laroute.js');
require('./angular-socialshare.min.js');
require('./angular-lazy-img.js');
require('./jquery.bxslider.js');
require('./vendor/tempusdominus-bootstrap-4');




/*services*/
require('./services/dialogService.js');

/*directive*/
require('./directives/ajax-loader.js');
require('./directives/afterRepeat-render.js');
require('./common.utils.js');

/*factory*/
require('./factory/dataFactory.js');
require('./factory/modalFactory.js');

require('./controller/home_page/HomePageController.js');
/*Welcome page*/
require('./controller/home_page/mainController');
require('./controller/navbar/navbarCtrl.js');
require('./controller/login/loginCtrl.js');
require('./controller/login/registerCtrl.js');
require('./controller/login/AuthController.js');
require('./controller/admin/ckController.js');


/*Admin Page - ui-router*/
require('./controller/admin/adminCtrl.js');









