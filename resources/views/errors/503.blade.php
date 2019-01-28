<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="https://fonts.googleapis.com/css?family=Rajdhani:400,700" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style>
        .container{
            width: 1000px;
            margin: 0 auto;
        }
        *{
            padding: 0;
            margin: 0;
        }
        body{
            font-family: 'Rajdhani', sans-serif;
            margin:0px;
            font-size: 17px;
            color: #464646;
            line-height: 20px;
        }
        .navbar-height{
            height:48px;
            border-bottom:1px solid #f4f6f6;
        }
        .top-space{
            padding:10px 0 0;
        }
        .text-gradient{
            background: linear-gradient(to right,#ff6a00,#ee0979);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .logo{
            padding-top: 6px;
        }
        /* .content-para{
             float:left;
             width:70%;
         }*/
        .content-img{
            /* float:right;
             margin-left: 70px;*/
        }
        .content-para{
            /*    padding-top:170px;*/
            left: 200px;
            top: 200px;
            position: absolute;
            bottom: 0;
            /*       background: url(/assets/img/Maintenance-bg-text.png) no-repeat center center;
                   background-size: contain;*/
            /*   height: 100%;
               width: 100%;*/
        }
        .content-para h2{
            padding-bottom: 20px;
            font-size: 50px;
            color: #fff;
            letter-spacing: 1px;
            text-shadow: 0 2px 4px #672333;
            font-weight: 600;
        }
        .content-para p{
            font:normal 18px/25px 'Rajdhani', sans-serif;
            text-shadow: 0 0 0 #464646;
            /* padding-bottom: 15px;*/
            font-size: 17px;
            margin-top: 10px;
            color: #fff;
        }
        .content-img{
            max-width: 100%;
        }
        .maintanence-bg{
            background: linear-gradient(135deg, #fc5914 0%, #f11b63 100%);
            height: 100vh;
            position: relative;
            overflow: hidden;
        }
        .maintain-bg-img{
            background: url(/assets/img/maintenancBg.png) no-repeat center center;
            background-size: contain;
            height: 100%;
            width: 100%;
        }
        .maintanence-head{
            font-size: 80px;
            letter-spacing: 1px;
            text-shadow: 0 2px 4px #672333;
            font-weight: 700;
            margin: 0px 0 10px;
            color: #fff;
            text-transform: uppercase;
            line-height: 1.1;
        }
        .maintanence-logo{
            background: url(/assets/img/logo_white.png) no-repeat top left;
            width: 135px;
            height: 50px;
            display: block;
            margin-bottom: 30px;
        }
        ._social-follow {
            margin-top: 0px;
            padding: 0;
        }
        ._social-follow li {
            display: inline-block;
            margin-right: 2px;
        }
        .unstyled li {
            list-style: none;
        }
        ._social-follow li a {
            border-radius: 50%;
            height: 30px;
            width: 30px;
            line-height: 34px;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            -webkit-transform: perspective(1px) translateZ(0);
            transform: perspective(1px) translateZ(0);
            -webkit-transition: color 0.3s;
            transition: color 0.3s;
            background: #fff;
        }
        ._social-follow li a:hover{
            box-shadow: 0 1px 4px rgba(0,0,0,.9);
        }
        .fa {
            display: inline-block;
            font: normal normal normal 14px/1 FontAwesome;
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color:#1b69b6;
        }
        .fa-facebook-f:before, .fa-facebook:before {
            content: "\F09A";
        }
        .estimate-time{
            padding-top:30px;
        }
        @media (max-width: 768px){
            .content-img{
                float: none;
                margin-left: 0px;
            }
            .content-para{
                padding-top: 60px;
            }
            .dc{
                text-align: center;
            }
            .maintain-bg-img{
                padding-top: 280px;
                margin-left: -80px;
            }
            .maintanence-head{
                font-size: 72px;
            }
            .content-para h2{
                font-size: 40px;
            }
            .maintanence-logo{
                margin:0 auto;
            }
        }
        @media (max-width: 475px){
            .maintanence-head {
                font-size: 50px;
            }
            .content-para h2{
                font-size: 30px;
            }
        }
        @media (max-width: 1440px){
            .content-para{
                left: 50px;
                width: 500px;
            }
        }
        @media (max-width: 1023px) and (min-width: 967px){
            .content-para{
                left: 0px;
                width: 500px;
            }
        }
        @media (max-width: 967px){
            .content-para{
                left: 0px;
                width: fit-content;
                right: 0;
                margin: auto;
                top: 0px;
                text-align: center;
            }
        }

    </style>
</head>
<body>
{{--<div class="navbar-height">
    <div class="container">
        <nav class="navbar navbar-light bg-faded">
            <h1 class="logo"><img src="{{ asset_url('assets/img/logo.png') }}" alt="WoFox" title="WoFox"></h1>
        </nav>
    </div>
</div>--}}
{{--@php  $data = maintenance_history(isset($node)? 1 : 0); @endphp--}}

<div class="">
    {{--    <div class="container">--}}
    <div class="maintanence-bg">
        <div class="maintain-bg-img">
            {{-- <img src="{{ asset_url('assets/img/maintenance-bg.png') }}" title="under maintenance" alt="under maintenance"
                  class="content-img">--}}
        </div>
        <div class="content-para dc">
            <span class="maintanence-logo"></span>
            <h1 class="maintanence-head">Maintenance</h1>
            <h2>In Progress</h2>
           {{-- <p class="">{!! $data['description']  !!}</p>--}}
            <p class="ft-box ft-social">
            <ul class="unstyled _social-follow">
                <li><a href="https://www.facebook.com/WofoxApp/" target="_blank" class="hvr-sweep-to-right pr"  title="facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/WofoxApp/" target="_blank" class="hvr-sweep-to-right pr"  title="twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/wofoxapp/" target="_blank" class="hvr-sweep-to-right pr" title="instagram"><i class="fa fa-instagram"></i></a></li>
                <li><a href="https://pinterest.com/WofoxApp/" target="_blank" class="hvr-sweep-to-right pr" title="pinterest"><i class="fa fa-pinterest"></i></a></li>
                <li><a href="https://wofox.tumblr.com/" target="_blank" class="hvr-sweep-to-right pr" title="tumblr"><i class="fa fa-tumblr"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCQwAwUvpE2Uik92Jtx02fTw" target="_blank" class="hvr-sweep-to-right pr" title="youtube"><i class="fa fa-youtube"></i></a></li>
            </ul>
            </p>
        </div>
    </div>
    {{--</div>--}}
</div>

</body>
</html>