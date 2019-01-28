(function () {

    var laroute = (function () {

        var routes = {

            absolute: false,
            rootUrl: 'blog.wofox1.test',
            routes : [{"host":null,"methods":["GET","HEAD"],"uri":"_debugbar\/open","name":"debugbar.openhandler","action":"Barryvdh\Debugbar\Controllers\OpenHandlerController@handle"},{"host":null,"methods":["GET","HEAD"],"uri":"_debugbar\/clockwork\/{id}","name":"debugbar.clockwork","action":"Barryvdh\Debugbar\Controllers\OpenHandlerController@clockwork"},{"host":null,"methods":["GET","HEAD"],"uri":"_debugbar\/assets\/stylesheets","name":"debugbar.assets.css","action":"Barryvdh\Debugbar\Controllers\AssetController@css"},{"host":null,"methods":["GET","HEAD"],"uri":"_debugbar\/assets\/javascript","name":"debugbar.assets.js","action":"Barryvdh\Debugbar\Controllers\AssetController@js"},{"host":null,"methods":["DELETE"],"uri":"_debugbar\/cache\/{key}\/{tags?}","name":"debugbar.cache.delete","action":"Barryvdh\Debugbar\Controllers\CacheController@delete"},{"host":null,"methods":["GET","HEAD"],"uri":"login","name":"login","action":"App\Http\Controllers\Auth\LoginController@showLoginForm"},{"host":null,"methods":["POST"],"uri":"login","name":null,"action":"App\Http\Controllers\Auth\LoginController@login"},{"host":null,"methods":["POST"],"uri":"logout","name":"logout","action":"App\Http\Controllers\Auth\LoginController@logout"},{"host":null,"methods":["GET","HEAD"],"uri":"register","name":"register","action":"App\Http\Controllers\Auth\RegisterController@showRegistrationForm"},{"host":null,"methods":["POST"],"uri":"register","name":null,"action":"App\Http\Controllers\Auth\RegisterController@register"},{"host":null,"methods":["GET","HEAD"],"uri":"password\/reset","name":"password.request","action":"App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm"},{"host":null,"methods":["POST"],"uri":"password\/email","name":"password.email","action":"App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail"},{"host":null,"methods":["GET","HEAD"],"uri":"password\/reset\/{token}","name":"password.reset","action":"App\Http\Controllers\Auth\ResetPasswordController@showResetForm"},{"host":null,"methods":["POST"],"uri":"password\/reset","name":null,"action":"App\Http\Controllers\Auth\ResetPasswordController@reset"},{"host":null,"methods":["GET","HEAD"],"uri":"logout","name":"logout","action":"App\Http\Controllers\Auth\LoginController@logout"},{"host":null,"methods":["GET","HEAD"],"uri":"register_pop_up","name":"register.pop_up","action":"App\Http\Controllers\UsersController@view_register"},{"host":null,"methods":["POST"],"uri":"registration","name":"user.register","action":"App\Http\Controllers\UsersController@register"},{"host":null,"methods":["GET","HEAD"],"uri":"category_view\/{helpCategory}","name":"category.view","action":"App\Http\Controllers\MainController@Categoryview"},{"host":null,"methods":["GET","HEAD"],"uri":"permission_view","name":"admin.permission_view","action":"App\Http\Controllers\HelpController@permission_view"},{"host":null,"methods":["POST"],"uri":"role_permission_paginate","name":"admin.role_permission.paginate","action":"App\Http\Controllers\HelpController@role_permission_paginate"},{"host":null,"methods":["GET","HEAD"],"uri":"permissionrole_create","name":"admin.permissionrole.create","action":"App\Http\Controllers\HelpController@permissionrole_create"},{"host":null,"methods":["POST"],"uri":"permissionrole_store","name":"admin.permissionrole.store","action":"App\Http\Controllers\HelpController@permissionrole_store"},{"host":null,"methods":["GET","HEAD"],"uri":"permissionrole_edit","name":"admin.permissionrole.edit","action":"App\Http\Controllers\HelpController@permissionrole_edit"},{"host":null,"methods":["POST"],"uri":"permissionrole_edit_data","name":"admin.permissionrole.edit_data","action":"App\Http\Controllers\HelpController@permissionrole_edit_data"},{"host":null,"methods":["POST"],"uri":"permission_role_update","name":"admin.permission_role.update","action":"App\Http\Controllers\HelpController@permission_role_update"},{"host":null,"methods":["GET","HEAD"],"uri":"permission_role_delete","name":"admin.permission_role.delete","action":"App\Http\Controllers\HelpController@permission_role_delete"},{"host":null,"methods":["GET","HEAD"],"uri":"permission_role_popup","name":"admin.permission.role_popup","action":"App\Http\Controllers\HelpController@permission_role_popup"},{"host":null,"methods":["POST"],"uri":"permission_role_store","name":"admin.permission_role.store","action":"App\Http\Controllers\HelpController@permission_role_store"},{"host":null,"methods":["POST"],"uri":"role_name","name":"admin.role.name","action":"App\Http\Controllers\HelpController@role_name"},{"host":null,"methods":["GET","HEAD"],"uri":"role_view","name":"admin.role_view","action":"App\Http\Controllers\HelpController@role_view"},{"host":null,"methods":["POST"],"uri":"user_name","name":"admin.user.name","action":"App\Http\Controllers\HelpController@user_name"},{"host":null,"methods":["GET","HEAD"],"uri":"admin","name":"admin.dashboard","action":"App\Http\Controllers\DashboardController"},{"host":null,"methods":["GET","HEAD"],"uri":"category_view","name":"admin.category_view","action":"App\Http\Controllers\HelpController@dashboard"},{"host":null,"methods":["GET","HEAD"],"uri":"category_create","name":"category.create","action":"App\Http\Controllers\HelpController@create"},{"host":null,"methods":["POST"],"uri":"category_store","name":"category.store","action":"App\Http\Controllers\HelpController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"category_edit\/{helpCategory}","name":"admin.category.edit","action":"App\Http\Controllers\HelpController@edit"},{"host":null,"methods":["POST"],"uri":"category_Update\/{helpCategory}","name":"admin.category.update","action":"App\Http\Controllers\HelpController@update"},{"host":null,"methods":["GET","HEAD"],"uri":"dashboard_view","name":"admin.dashboard_view","action":"App\Http\Controllers\HelpController@dashboard_view"},{"host":null,"methods":["GET","HEAD"],"uri":"category\/delete\/{helpCategory}","name":"admin.category.delete","action":"App\Http\Controllers\HelpController@Categorydelete"},{"host":null,"methods":["GET","HEAD"],"uri":"categoryDelete\/{helpCategory}","name":"admin.category.destroy","action":"App\Http\Controllers\HelpController@deleteCat"},{"host":null,"methods":["GET","HEAD"],"uri":"posthelp\/view\/{name}","name":"help.view","action":"App\Http\Controllers\HelpController@categoryModelview"},{"host":null,"methods":["GET","HEAD"],"uri":"category_preview\/delete\/{id}","name":"help.post.destroy","action":"App\Http\Controllers\HelpController@category_preview_delete"},{"host":null,"methods":["GET","HEAD"],"uri":"category_preview\/{helpCategory}","name":"admin.category.preview","action":"App\Http\Controllers\HelpController@preview"},{"host":null,"methods":["POST"],"uri":"add-category-state","name":"category.state","action":"App\Http\Controllers\HelpController@statechange"},{"host":null,"methods":["GET","HEAD"],"uri":"editCategory\/{name}","name":"admin.category_edit","action":"App\Http\Controllers\HelpController@category_preview_edit"},{"host":null,"methods":["POST"],"uri":"help\/api\/file_upload","name":null,"action":"App\Http\Controllers\HelpController@fileUpload"},{"host":null,"methods":["GET","HEAD"],"uri":"status_view","name":"admin.status_view","action":"App\Http\Controllers\StateController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"status_create","name":"admin.state_create","action":"App\Http\Controllers\StateController@create"},{"host":null,"methods":["POST"],"uri":"state_store","name":"admin.state_store","action":"App\Http\Controllers\StateController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"state_edit\/{helpState}","name":"admin.state_edit","action":"App\Http\Controllers\StateController@edit"},{"host":null,"methods":["POST"],"uri":"state_update\/{helpState}","name":"admin.state_update","action":"App\Http\Controllers\StateController@update"},{"host":null,"methods":["GET","HEAD"],"uri":"statedelete\/{helpState}","name":"admin.state.delete","action":"App\Http\Controllers\StateController@destroy"},{"host":null,"methods":["PATCH"],"uri":"state_approve\/{helpState}","name":"state.approve.update","action":"App\Http\Controllers\StateController@approve"},{"host":null,"methods":["GET","HEAD"],"uri":"state_delete\/{helpState}","name":"admin.state.popup","action":"App\Http\Controllers\StateController@popupdelete"},{"host":null,"methods":["GET","HEAD"],"uri":"tag_view","name":"admin.tag_view","action":"App\Http\Controllers\tagController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"tag_create","name":"admin.tag_create","action":"App\Http\Controllers\tagController@create"},{"host":null,"methods":["POST"],"uri":"tag_store","name":"admin.tag_store","action":"App\Http\Controllers\tagController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"tag_edit\/{helpTag}","name":"admin.tag_edit","action":"App\Http\Controllers\tagController@edit"},{"host":null,"methods":["POST"],"uri":"tag_update\/{helpTag}","name":"admin.tag_update","action":"App\Http\Controllers\tagController@update"},{"host":null,"methods":["GET","HEAD"],"uri":"tag_delete\/{helpTag}","name":"admin.tag.delete","action":"App\Http\Controllers\tagController@popupView"},{"host":null,"methods":["GET","HEAD"],"uri":"tagdestroy\/{helpTag}","name":"user.tag.delete","action":"App\Http\Controllers\TagController@delete"},{"host":null,"methods":["POST"],"uri":"tagadd","name":"post.tag","action":"App\Http\Controllers\TagController@postTag"},{"host":null,"methods":["GET","HEAD"],"uri":"add_post","name":"admin.post_view","action":"App\Http\Controllers\HelpController@addPost"},{"host":null,"methods":["POST"],"uri":"post\/{helpCategory}","name":"admin.post.store","action":"App\Http\Controllers\HelpController@post"},{"host":null,"methods":["POST"],"uri":"postadd","name":"category.post.store","action":"App\Http\Controllers\HelpController@poststore"},{"host":null,"methods":["POST"],"uri":"postapi","name":"admin.api.getStates","action":"App\Http\Controllers\HelpController@getStateApi"},{"host":null,"methods":["GET","HEAD"],"uri":"postapitag","name":"admin.api.getTag","action":"App\Http\Controllers\HelpController@getTagApi"},{"host":null,"methods":["GET","HEAD"],"uri":"search\/{help}","name":"search","action":"App\Http\Controllers\MainController@Search"},{"host":null,"methods":["GET","HEAD"],"uri":"\/","name":"index","action":"App\Http\Controllers\MainController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"post","name":"get.post.images","action":"App\Http\Controllers\MainController@posts"},{"host":null,"methods":["GET","HEAD"],"uri":"{helpPost}","name":"post.read","action":"App\Http\Controllers\MainController@readMore"},{"host":null,"methods":["GET","HEAD"],"uri":"login_html","name":"home.loginTemplate","action":"App\Http\Controllers\MainController@loginTemplate"},{"host":null,"methods":["GET","HEAD"],"uri":"tags\/{helpTag}","name":"tag.main","action":"App\Http\Controllers\MainController@tagview"},{"host":null,"methods":["GET","HEAD"],"uri":"statusview\/{helpState}","name":"status.view","action":"App\Http\Controllers\MainController@statusview"},{"host":null,"methods":["GET","HEAD"],"uri":"SecondNav","name":"get.secondNav","action":"App\Http\Controllers\MainController@navbar"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"user\/api\/login","name":"user.login","action":"App\Http\Controllers\Auth\LoginController@login"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxdesign","name":"footer.wofoxdesign","action":"App\Http\Controllers\Footer\FooterController@wofoxDesign"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxphoto","name":"footer.wofoxphoto","action":"App\Http\Controllers\Footer\FooterController@wofoxPhoto"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxgif","name":"footer.wofoxgif","action":"App\Http\Controllers\Footer\FooterController@wofoxGif"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxvideo","name":"footer.wofoxvideos","action":"App\Http\Controllers\Footer\FooterController@wofoxVideos"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxai","name":"footer.wofoxai","action":"App\Http\Controllers\Footer\FooterController@wofoxai"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxtools","name":"footer.wofoxtools","action":"App\Http\Controllers\Footer\FooterController@wofoxTools"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxopenstock","name":"footer.wofoxopenstock","action":"App\Http\Controllers\Footer\FooterController@wofoxOpenStock"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxteam","name":"footer.wofoxteam","action":"App\Http\Controllers\Footer\FooterController@wofoxTeam"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxproject","name":"footer.wofoxproject","action":"App\Http\Controllers\Footer\FooterController@wofoxProject"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofoxassest","name":"footer.wofoxassest","action":"App\Http\Controllers\Footer\FooterController@wofoxAssest"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"brandkit","name":"footer.brandkit","action":"App\Http\Controllers\Footer\FooterController@brandKit"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"email","name":"footer.email","action":"App\Http\Controllers\Footer\FooterController@Email"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"ebookcreator","name":"footer.ebookcreator","action":"App\Http\Controllers\Footer\FooterController@ebookCreator"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"videoproduction","name":"footer.videoproduction","action":"App\Http\Controllers\Footer\FooterController@videoProduction"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"websiteblog","name":"footer.websiteblog","action":"App\Http\Controllers\Footer\FooterController@websiteBlog"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"graphicdesign","name":"footer.graphicdesign","action":"App\Http\Controllers\Footer\FooterController@graphicDesign"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"webtoprint","name":"footer.webtoprint","action":"App\Http\Controllers\Footer\FooterController@webtoPrint"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"ecommerce","name":"footer.ecommerce","action":"App\Http\Controllers\Footer\FooterController@eCommerce"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"contentmarketing","name":"footer.contentmarketing","action":"App\Http\Controllers\Footer\FooterController@contentMarketing"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"twitter","name":"footer.twitter","action":"App\Http\Controllers\Footer\FooterController@twitter"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"facebook","name":"footer.facebook","action":"App\Http\Controllers\Footer\FooterController@facebook"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"linkedin","name":"footer.linkedin","action":"App\Http\Controllers\Footer\FooterController@linkedin"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"instagram","name":"footer.instagram","action":"App\Http\Controllers\Footer\FooterController@instagram"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"youtube","name":"footer.youtube","action":"App\Http\Controllers\Footer\FooterController@youtube"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"google-plus","name":"footer.google","action":"App\Http\Controllers\Footer\FooterController@google"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"pinterest","name":"pinterest","action":"App\Http\Controllers\Category\CategoryController@pinterest"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"tumblr","name":"footer.tumblr","action":"App\Http\Controllers\Footer\FooterController@tumblr"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"snapchat-geofilters","name":"footer.snapchat","action":"App\Http\Controllers\Footer\FooterController@snapchat"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"press-kit","name":"footer.press","action":"App\Http\Controllers\Footer\FooterController@press"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"helpcenter","name":"footer.helpcenter","action":"App\Http\Controllers\Footer\FooterController@helpCenter"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"terms-of-use","name":"footer.terms_of_use","action":"App\Http\Controllers\Footer\FooterController@termsOfUse"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"privacy-policy","name":"footer.private_policy","action":"App\Http\Controllers\Footer\FooterController@privatePolicy"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"cookies-policy","name":"footer.cookies_policy","action":"App\Http\Controllers\Footer\FooterController@cookiesPolicy"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"contact-us","name":"footer.contact","action":"App\Http\Controllers\Footer\FooterController@contact"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"pricing","name":"footer.pricing","action":"App\Http\Controllers\Footer\FooterController@pricing"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofox-for-nonprofits","name":"footer.nonprofits","action":"App\Http\Controllers\Footer\FooterController@nonProfits"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"wofox-for-education","name":"footer.education","action":"App\Http\Controllers\Footer\FooterController@education"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"content-calendar","name":"events.day_events","action":"App\Http\Controllers\Schedule\CalenderController@events"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"watch-demo","name":"watch-demo","action":"App\Http\Controllers\HomeController@watchDemo"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"changelog","name":"changelog.view","action":"App\Http\Controllers\Help\HelpController@ChangeLog"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"integrations","name":"footer.integration","action":"App\Http\Controllers\Footer\FooterController@integrations"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"roadmap","name":"footer.roadmap","action":"App\Http\Controllers\Footer\FooterController@roadmap"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"{template_category}\/{slug}\/{pin_type?}\/{search_name?}","name":"category","action":"App\Http\Controllers\Category\CategoryController@category"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"{template_category}","name":"menu","action":"App\Http\Controllers\Category\CategoryController@category"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"dashboard","name":"sidebar.design.recent","action":"App\Http\Controllers\HomeController@recent"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"projects","name":"collaborate.dashboard","action":"App\Http\Controllers\CollaborateController@index"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"team","name":"team","action":"App\Http\Controllers\TeamController@index"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"assets\/dashboard","name":"assets","action":"App\Http\Controllers\Editor\User\UserAssetController@index"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"tools\/watermark","name":"tools","action":"App\Http\Controllers\Tool\ToolsController@index"},{"host":"wofox.test","methods":["GET","HEAD"],"uri":"content-calendar\/calendar","name":"event","action":"App\Http\Controllers\CalenderController@index"}],
            prefix: '',

            route : function (name, parameters, route) {
                route = route || this.getByName(name);

                if ( ! route ) {
                    return undefined;
                }

                return this.toRoute(route, parameters);
            },

            url: function (url, parameters) {
                parameters = parameters || [];

                var uri = url + '/' + parameters.join('/');

                return this.getCorrectUrl(uri);
            },

            toRoute : function (route, parameters) {
                var uri = this.replaceNamedParameters(route.uri, parameters);
                var qs  = this.getRouteQueryString(parameters);

                if (this.absolute && this.isOtherHost(route)){
                    return "//" + route.host + "/" + uri + qs;
                }

                return this.getCorrectUrl(uri + qs);
            },

            isOtherHost: function (route){
                return route.host && route.host != window.location.hostname;
            },

            replaceNamedParameters : function (uri, parameters) {
                uri = uri.replace(/\{(.*?)\??\}/g, function(match, key) {
                    if (parameters.hasOwnProperty(key)) {
                        var value = parameters[key];
                        delete parameters[key];
                        return value;
                    } else {
                        return match;
                    }
                });

                // Strip out any optional parameters that were not given
                uri = uri.replace(/\/\{.*?\?\}/g, '');

                return uri;
            },

            getRouteQueryString : function (parameters) {
                var qs = [];
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        qs.push(key + '=' + parameters[key]);
                    }
                }

                if (qs.length < 1) {
                    return '';
                }

                return '?' + qs.join('&');
            },

            getByName : function (name) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                        return this.routes[key];
                    }
                }
            },

            getByAction : function(action) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].action === action) {
                        return this.routes[key];
                    }
                }
            },

            getCorrectUrl: function (uri) {
                var url = this.prefix + '/' + uri.replace(/^\/?/, '');

                if ( ! this.absolute) {
                    return url;
                }

                return this.rootUrl.replace('/\/?$/', '') + url;
            }
        };

        var getLinkAttributes = function(attributes) {
            if ( ! attributes) {
                return '';
            }

            var attrs = [];
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    attrs.push(key + '="' + attributes[key] + '"');
                }
            }

            return attrs.join(' ');
        };

        var getHtmlLink = function (url, title, attributes) {
            title      = title || url;
            attributes = getLinkAttributes(attributes);

            return '<a href="' + url + '" ' + attributes + '>' + title + '</a>';
        };

        return {
            // Generate a url for a given controller action.
            // laroute.action('HomeController@getIndex', [params = {}])
            action : function (name, parameters) {
                parameters = parameters || {};

                return routes.route(name, parameters, routes.getByAction(name));
            },

            // Generate a url for a given named route.
            // laroute.route('routeName', [params = {}])
            route : function (route, parameters) {
                parameters = parameters || {};

                return routes.route(route, parameters);
            },

            // Generate a fully qualified URL to the given path.
            // laroute.route('url', [params = {}])
            url : function (route, parameters) {
                parameters = parameters || {};

                return routes.url(route, parameters);
            },

            // Generate a html link to the given url.
            // laroute.link_to('foo/bar', [title = url], [attributes = {}])
            link_to : function (url, title, attributes) {
                url = this.url(url);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given route.
            // laroute.link_to_route('route.name', [title=url], [parameters = {}], [attributes = {}])
            link_to_route : function (route, title, parameters, attributes) {
                var url = this.route(route, parameters);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given controller action.
            // laroute.link_to_action('HomeController@getIndex', [title=url], [parameters = {}], [attributes = {}])
            link_to_action : function(action, title, parameters, attributes) {
                var url = this.action(action, parameters);

                return getHtmlLink(url, title, attributes);
            }

        };

    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return laroute;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = laroute;
    }
    else {
        window.laroute = laroute;
    }

}).call(this);

