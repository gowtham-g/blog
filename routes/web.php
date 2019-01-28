<?php


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test_the_code', function(){
    return [ request()->all(), auth()->check()];
});

Auth::routes();
Route::get('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
// -------welcome blade news,tutorial get route---------//
Route::get('/register_pop_up', ['as' => 'register.pop_up', 'uses' => 'UsersController@view_register']);
Route::get('register',['as'=>'register','uses'=>'Auth\RegisterController@showRegistrationForm']);

Route::post('registration', ['as' => 'user.register', 'uses' => 'UsersController@register']);


Route::get('category_view/{helpCategory}',['as'=>'category.view','uses'=>'MainController@Categoryview']);


Route::group(['middleware' => 'admin'], function () {
        /*admin*/
        /*Roles and permission*/
Route::get('/permission_view', ['as' => 'admin.permission_view', 'uses' => 'HelpController@permission_view']);
Route::post('/role_permission_paginate', ['as' => 'admin.role_permission.paginate', 'uses' => 'HelpController@role_permission_paginate']);
Route::get('/permissionrole_create', ['as' => 'admin.permissionrole.create', 'uses' => 'HelpController@permissionrole_create']);
Route::post('/permissionrole_store', ['as' => 'admin.permissionrole.store', 'uses' => 'HelpController@permissionrole_store']);
Route::get('/permissionrole_edit', ['as' => 'admin.permissionrole.edit', 'uses' => 'HelpController@permissionrole_edit']);
Route::post('/permissionrole_edit_data', ['as' => 'admin.permissionrole.edit_data', 'uses' => 'HelpController@permissionrole_edit_data']);
Route::post('/permission_role_update', ['as' => 'admin.permission_role.update', 'uses' => 'HelpController@permission_role_update']);
Route::get('/permission_role_delete', ['as' => 'admin.permission_role.delete', 'uses' => 'HelpController@permission_role_delete']);
Route::get('/permission_role_popup', ['as' => 'admin.permission.role_popup', 'uses' => 'HelpController@permission_role_popup']);
Route::post('/permission_role_store', ['as' => 'admin.permission_role.store', 'uses' => 'HelpController@permission_role_store']);
Route::post('/role_name', ['as' => 'admin.role.name', 'uses' => 'HelpController@role_name']);
Route::get('/role_view', ['as' => 'admin.role_view', 'uses' => 'HelpController@role_view']);
Route::post('/user_name', ['as' => 'admin.user.name', 'uses' => 'HelpController@user_name']);

        /*---------------------dashboard----------------*/
Route::get('/admin', 'DashboardController')->name('admin.dashboard');
        /*----------------Category--------------------*/
Route::get('/category_view/', ['as' => 'admin.category_view', 'uses' => 'HelpController@dashboard']);
Route::get('/category_create', ['as' => 'category.create', 'uses' => 'HelpController@create']);
Route::post('/category_store', ['as' => 'category.store', 'uses' => 'HelpController@store']);
Route::get('/category_edit/{helpCategory}', ['as' => 'admin.category.edit', 'uses' => 'HelpController@edit']);
Route::post('/category_Update/{helpCategory}', ['as' => 'admin.category.update', 'uses' => 'HelpController@update']);
Route::get('/dashboard_view', ['as' => 'admin.dashboard_view', 'uses' => 'HelpController@dashboard_view']);
Route::get('/category/delete/{helpCategory}', array('as' => 'admin.category.delete', 'uses' => 'HelpController@Categorydelete'));
Route::get('/categoryDelete/{helpCategory}', array('as' => 'admin.category.destroy', 'uses' => 'HelpController@deleteCat'));
Route::get('/posthelp/view/{name}',['as'=>'help.view','uses'=>'HelpController@categoryModelview']);
Route::get('/category_preview/delete/{id}', array('as' => 'help.post.destroy', 'uses' => 'HelpController@category_preview_delete'));
Route::get('/category_preview/{helpCategory}', ['as' => 'admin.category.preview', 'uses' => 'HelpController@preview']);
Route::post('/add-category-state', ['as' => 'category.state', 'uses' => 'HelpController@statechange']);
Route::get('/editCategory/{name}', ['as' => 'admin.category_edit', 'uses' => 'HelpController@category_preview_edit']);
Route::post('help/api/file_upload', 'HelpController@fileUpload');
        /*---------------State---------*/

Route::get('/status_view', ['as' => 'admin.status_view', 'uses' => 'StateController@index']);
Route::get('/status_create', ['as' => 'admin.state_create', 'uses' => 'StateController@create']);
Route::post('/state_store', ['as' => 'admin.state_store', 'uses' => 'StateController@store']);
Route::get('/state_edit/{helpState}', ['as' => 'admin.state_edit', 'uses' => 'StateController@edit']);
Route::post('/state_update/{helpState}', ['as' => 'admin.state_update', 'uses' => 'StateController@update']);
Route::get('/statedelete/{helpState}', ['as' => 'admin.state.delete', 'uses' => 'StateController@destroy']);
Route::patch('/state_approve/{helpState}', ['as' => 'state.approve.update', 'uses' => 'StateController@approve']);
Route::get('/state_delete/{helpState}', ['as' => 'admin.state.popup', 'uses' => 'StateController@popupdelete']);

        /*---------------Tag------------*/
Route::get('/tag_view', ['as' => 'admin.tag_view', 'uses' => 'tagController@index']);
Route::get('/tag_create', ['as' => 'admin.tag_create', 'uses' => 'tagController@create']);
Route::post('/tag_store', ['as' => 'admin.tag_store', 'uses' => 'tagController@store']);
Route::get('/tag_edit/{helpTag}', ['as' => 'admin.tag_edit', 'uses' => 'tagController@edit']);
Route::post('/tag_update/{helpTag}', ['as' => 'admin.tag_update', 'uses' => 'tagController@update']);
Route::get('/tag_delete/{helpTag}', ['as' => 'admin.tag.delete', 'uses' => 'tagController@popupView']);
Route::get('/tagdestroy/{helpTag}', ['as' => 'user.tag.delete', 'uses' => 'TagController@delete']);
Route::post('/tagadd', ['as' => 'post.tag', 'uses' => 'TagController@postTag']);

    /*-------------------Post-----------*/
Route::get('/add_post', ['as' => 'admin.post_view', 'uses' => 'HelpController@addPost']);
Route::post('/post/{helpCategory}', ['as' => 'admin.post.store', 'uses' => 'HelpController@post']);
Route::post('/postadd', ['as' => 'category.post.store', 'uses' => 'HelpController@poststore']);
Route::post('/postapi', ['as' => 'admin.api.getStates', 'uses' => 'HelpController@getStateApi']);
Route::get('/postapitag', ['as' => 'admin.api.getTag', 'uses' => 'HelpController@getTagApi']);

});

/*------------------------------------------------ Front-end ---------------------------------------------------------------------*/

//->middleware('web','auth')

Route::get('/search/{help}', ['as' => 'search', 'uses' => 'MainController@Search']);
Route::get('/', ['as' => 'index', 'uses' => 'MainController@index']);
Route::get('/post',['as'=>'get.post.images','uses'=>'MainController@posts']);
Route::get('/{helpPost}',['as'=>'post.read','uses'=>'MainController@readMore']);
Route::get('login_html', ['as' => 'home.loginTemplate', 'uses' => 'MainController@loginTemplate']);
Route::get('/tags/{helpTag}', ['as' => 'tag.main', 'uses' => 'MainController@tagview']);
Route::get('/statusview/{helpState}',['as'=>'status.view','uses'=>'MainController@statusview']);
Route::get('secondnav',['as'=>'get.secondNav','uses'=>'MainController@navbar']);



/*-----------------------------------------footer-------------------------------------------------------------------------*/
Route::group(['domain' => config('constant.footer_url')], function() {

Route::get('user/api/login', ['as' => 'user.login', 'uses' => 'Auth\LoginController@login']);
Route::get('wofoxdesign', ['as' => 'footer.wofoxdesign', 'uses' => 'Footer\FooterController@wofoxDesign']);
Route::get('wofoxphoto', ['as' => 'footer.wofoxphoto', 'uses' => 'Footer\FooterController@wofoxPhoto']);
Route::get('wofoxgif', ['as' => 'footer.wofoxgif', 'uses' => 'Footer\FooterController@wofoxGif']);
Route::get('wofoxvideo', ['as' => 'footer.wofoxvideos', 'uses' => 'Footer\FooterController@wofoxVideos']);
Route::get('wofoxai', ['as' => 'footer.wofoxai', 'uses' => 'Footer\FooterController@wofoxai']);
Route::get('wofoxtools', ['as' => 'footer.wofoxtools', 'uses' => 'Footer\FooterController@wofoxTools']);
Route::get('wofoxopenstock', ['as' => 'footer.wofoxopenstock', 'uses' => 'Footer\FooterController@wofoxOpenStock']);
Route::get('wofoxteam', ['as' => 'footer.wofoxteam', 'uses' => 'Footer\FooterController@wofoxTeam']);
Route::get('wofoxproject', ['as' => 'footer.wofoxproject', 'uses' => 'Footer\FooterController@wofoxProject']);
Route::get('wofoxassest', ['as' => 'footer.wofoxassest', 'uses' => 'Footer\FooterController@wofoxAssest']);


Route::get('brandkit', ['as' => 'footer.brandkit', 'uses' => 'Footer\FooterController@brandKit']);
Route::get('email', ['as' => 'footer.email', 'uses' => 'Footer\FooterController@Email']);
Route::get('ebookcreator', ['as' => 'footer.ebookcreator', 'uses' => 'Footer\FooterController@ebookCreator']);
Route::get('videoproduction', ['as' => 'footer.videoproduction', 'uses' => 'Footer\FooterController@videoProduction']);
Route::get('websiteblog', ['as' => 'footer.websiteblog', 'uses' => 'Footer\FooterController@websiteBlog']);
Route::get('graphicdesign', ['as' => 'footer.graphicdesign', 'uses' => 'Footer\FooterController@graphicDesign']);
Route::get('webtoprint', ['as' => 'footer.webtoprint', 'uses' => 'Footer\FooterController@webtoPrint']);
Route::get('ecommerce', ['as' => 'footer.ecommerce', 'uses' => 'Footer\FooterController@eCommerce']);
Route::get('contentmarketing', ['as' => 'footer.contentmarketing', 'uses' => 'Footer\FooterController@contentMarketing']);


Route::get('twitter', ['as' => 'footer.twitter', 'uses' => 'Footer\FooterController@twitter']);
Route::get('facebook', ['as' => 'footer.facebook', 'uses' => 'Footer\FooterController@facebook']);
Route::get('linkedin', ['as' => 'footer.linkedin', 'uses' => 'Footer\FooterController@linkedin']);
Route::get('instagram', ['as' => 'footer.instagram', 'uses' => 'Footer\FooterController@instagram']);
Route::get('youtube', ['as' => 'footer.youtube', 'uses' => 'Footer\FooterController@youtube']);
Route::get('google-plus', ['as' => 'footer.google', 'uses' => 'Footer\FooterController@google']);
Route::get('pinterest', ['as' => 'pinterest', 'uses' => 'Category\CategoryController@pinterest']);
Route::get('tumblr', ['as' => 'footer.tumblr', 'uses' => 'Footer\FooterController@tumblr']);
Route::get('snapchat-geofilters', ['as' => 'footer.snapchat', 'uses' => 'Footer\FooterController@snapchat']);


Route::get('press-kit', ['as' => 'footer.press', 'uses' => 'Footer\FooterController@press']);
Route::get('helpcenter', ['as' => 'footer.helpcenter', 'uses' => 'Footer\FooterController@helpCenter']);
Route::get('terms-of-use', ['as' => 'footer.terms_of_use', 'uses' => 'Footer\FooterController@termsOfUse']);
Route::get('privacy-policy', ['as' => 'footer.private_policy', 'uses' => 'Footer\FooterController@privatePolicy']);
Route::get('cookies-policy', ['as' => 'footer.cookies_policy', 'uses' => 'Footer\FooterController@cookiesPolicy']);
Route::get('contact-us', ['as' => 'footer.contact', 'uses' => 'Footer\FooterController@contact']);


Route::get('pricing', ['as' => 'footer.pricing', 'uses' => 'Footer\FooterController@pricing']);
Route::get('wofox-for-nonprofits', ['as' => 'footer.nonprofits', 'uses' => 'Footer\FooterController@nonProfits']);
Route::get('wofox-for-education', ['as' => 'footer.education', 'uses' => 'Footer\FooterController@education']);
Route::prefix('content-calendar')->group(function () {
Route::get('', ['as' => 'events.day_events', 'uses' => 'Schedule\CalenderController@events']);
});

Route::get('watch-demo', ['as' => 'watch-demo', 'uses' => 'HomeController@watchDemo']);
Route::get('changelog', ['as' => 'changelog.view', 'uses' => 'Help\HelpController@ChangeLog']);
Route::get('integrations', ['as' => 'footer.integration', 'uses' => 'Footer\FooterController@integrations']);
Route::get('roadmap', ['as' => 'footer.roadmap', 'uses' => 'Footer\FooterController@roadmap']);
});
/*--------------------navbar links----------------*/
Route::group(['domain' => config('constant.header_url')], function() {
Route::get('{template_category}/{slug}/{pin_type?}/{search_name?}', ['as' => 'category', 'uses' => 'Category\CategoryController@category']);
Route::get('{template_category}', ['as' => 'menu', 'uses' => 'Category\CategoryController@category']);
});

/*--------------------navbar links----------------*/
Route::group(['domain' => config('constant.sidebar_url')], function() {
Route::get('dashboard', ['as' => 'sidebar.design.recent', 'uses' => 'HomeController@recent']);
Route::prefix('projects')->middleware(['web','auth'])->group(function () {
Route::get('', ['as'=>'collaborate.dashboard','uses'=>'CollaborateController@index'])->middleware('auth');
});
Route::get('/team', ['as' => 'team', 'uses' => 'TeamController@index']);
Route::group(['prefix' => 'assets'], function () {Route::get('dashboard', ['as' => 'assets', 'uses' => 'Editor\User\UserAssetController@index']);});
Route::prefix('tools')->middleware(['web','auth'])->group(function () {Route::prefix('watermark')->group(function () {Route::get('', ['as' => 'tools', 'uses' => 'Tool\ToolsController@index']);});});
Route::get('content-calendar/calendar',['as'=>'event','uses'=>'CalenderController@index']);
});


