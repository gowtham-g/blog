#Wofox Blog setup

## Server Set-up

> **Note:** This is production server setup procedure.

Please use below server setup for production.

### Production ENV Important Content
```
APP_NAME='WofoxBlog'
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:GYxb6PKfGd196j3a9aJV051GxeQBKGLChR7fWFeNZdQ= //the first server boot time only generate and it's used in editor to session
APP_LOG_LEVEL=debug
APP_URL=https:https://www.http://blog.netaxis.co

DB_HOST=XXX.XXX.X.X
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=user_name
DB_PASSWORD=password

MAIL_DRIVER=smtp
MAIL_HOST=null
MAIL_PORT=null
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null


dateTimeFormat='DD MMM YYYY, hh:mm'
```

### Composer setup
```
composer install --optimize-autoloader
```

### database setup
```php
php artisan migrate //I have unable to db:seed because the db size is very height, I ll posted in spearate path with out git. path: \\192.168.7.150\editor-ui\Server Migration\date_wise.sql
```
### database seed
```
php artisan db:seed 
(or)
php artisan db:seed --class=AdminUserSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=RoleTableDataSeeder
php artisan db:seed --class=PermissionsTableDataSeeder
php artisan db:seed --class=RoleUserTableDataSeeder
php artisan db:seed --class=PointTableSeeder
```
### optimize
```
php artisan config:cache
php artisan route:cache
php artisan view:cache
php composer dumpautoload -o
php artisan optimize
```

### npm setup
```php
npm run production //it minify the script with versioning
```


## Packages
Below packages are need to server side

### Production purpose
```
"php": ">=7.0.0",
"artesaos/seotools": "^0.12.0",
"cviebrock/eloquent-sluggable": "^4.4",
"doctrine/dbal": "^2.5",
"fideloper/proxy": "~3.3",
"intervention/image": "^2.4",
"ixudra/curl": "^6.16",
"jenssegers/agent": "^2.6",
"laravel/framework": "5.5.*",
"laravel/socialite": "^3.0",
"laravel/tinker": "~1.0",
"laravelcollective/html": "^5.3.0",
"league/commonmark": "^0.17.0",
"league/flysystem-aws-s3-v3": "^1.0",
"lord/laroute": "^2.4",
"mews/captcha": "^2.2",
"roumen/sitemap": "2.7.2",
"torann/json-ld": "^0.0.12",
"zizaco/entrust": "^1.8",
"nicolaslopezj/searchable": "^1.9"
```

>  **php** :  Core Language
>  
>  **artesaos/seotools** :  For SEO setup. Helpful to pass the data from controller to view. 
>  
>  **cviebrock/eloquent-sluggable** :  Easy creation of slugs for Eloquent models in Laravel.
>  
>  **doctrine/dbal** :  support for alter datatype in table. Enum alter not support the base laravel version.
>  
>  **fideloper/proxy** :   For handling sessions when behind load balancers or other intermediaries.
>  
>  **intervention/image** :  Image resolution and resizing.  
>  
>  **ixudra/curl** :  The package provides an easy interface for sending cURL requests from your PHP web application.  
>  
>  **jenssegers/agent** :  For get the browser version. User for analytic and alert purpose. 
>  
>  **laravel/framework** :  Base Framework package.
>  
>  **laravel/socialite** :  OAuth: get the token from social website. like facebook, gmail.
>  
>  **laravel/tinker** :   Help to run the code in command prompt.
>  
>  **laravelcollective/html** :  Modern form generator in view.
>  
>  **league/commonmark** :  To convert markdown content into preview & html content .
>  
>  **league/flysystem-aws-s3-v3** :  Object storage technology use to store and retrieve the image.
>  
>  **lord/laroute** :  For generate the route for js to use in angular.
>  
>  **mews/captcha** :  To create a captcha image dynamicaly.
>  
>  **roumen/sitemap** :  To generate dynamic sitemap for videos,images & posts.
>  
>  **torann/json-ld** :  To create a dynamic structure data for each page.
>  
>  **zizaco/entrust** :  This is middleware for ACL (Access control list). Permission and role management.
> 
>  **nicolaslopezj/searchable** : To giving priorities to each field for the table and it's relations.
>



### Development purpose
```
"barryvdh/laravel-debugbar": "^3.1",
"filp/whoops": "~2.0",
"fzaninotto/faker": "~1.4",
"mockery/mockery": "~1.0",
"phpunit/phpunit": "~6.0"
```
>  **barryvdh/laravel-debugbar** :  Help to inspect the controller and route call
>  
>  **filp/whoops** : That handle errors and exceptions.
>  
>  **fzaninotto/faker** :  Generate the fake data for testing and other purpose.
>  
>  **mockery/mockery** : Help to unit testing
> 
>  **phpunit/phpunit** :  Test the developed code
> 

### Production dependency
```
"angular-messages": "^1.7.2",
"angular-socialshare": "^2.3.11",
"angularjs-toaster": "^2.2.0",
"cropit": "^0.5.1",
"moment": "^2.22.2",
"moment-timezone": "^0.5.21",
"select2": "^4.0.6-rc.1",
"simplemde": "^1.11.2",
"sweetalert2": "^7.25.6",
"swiper": "^4.3.5",
"tempusdominus-bootstrap-4": "^5.0.1",
"ui-bootstrap4": "^3.0.3"
"popper.js": "^1.14.3",
"sass-loader": "^7.0.3",
```
>  **angular-messages** :  Used to validate the form (Error Message). 
>
>  **angular-socialshare** :  Used to social share functionality.
>
>  **angularjs-toaster** :  used to show the toast message.
>
>  **cropit** :  Used to crop the image.
>
>  **moment** :  Used to access all the date and time parsing and manipulation functionality.
>
>  **moment-timezone** : Used to change the default time zone.
>
>  **select2** : Used to select the multiple data (Eg: Tags).
>
>  **simplemde** : Used the markdown Editor.
>
>  **sweetalert2** : Used to alert and confirmation message in popup.
>
>  **swiper** : Used to swipe the cards in mobile.
>
>  **tempusdominus-bootstrap-4** : Used  the date picker.
>
>  **ui-bootstrap4** : Used to show the pagination .
>
>  **popper.js** :  
>
>  **sass-loader** :  The sass-loader uses Sass's custom importer feature to pass all queries to the webpack resolving engine.


# Admin process

## Intially Create process in  Admin

```
  1.Tag Type
  
  2.Tag
  
  3.Post & Forum

```
