@php
    if(!isset($active))
        $active = "";
@endphp

<div class="sidemenu" id="assetScrollHeight">
    <ul class="unstyled">
        <li class="@if($active=="admin.dashboard") {{'active'}} @endif"><a href="{{route('admin.dashboard')}}"><span class="sidemenu_icon dashboard"></span> Forum</a> </li>
    </ul>
    <div class="pa tutoriBtn " >
        <div class="dropdown tutorial_dropdown">
            <div class="dropdown-toggle cur" data-toggle="dropdown"><p class="dc" data-title="Guided tour" data-container="body" data-placement="top" bs-tooltip><span class="cur dashboard-info"><i class="fa fa-info" aria-hidden="true"></i></span></p></div>
            <div class="dropdown-menu box_shadow ">
                <ul class="tutorial_drop" role="menu">
                    <li><a ng-click="showDesignsIntro()">Dashboard</a></li>
                    <li><a ng-click="showProjectDashIntro()">Project</a></li>
                    <li><a ng-click="showProjectIntro()">Project view</a></li>
                    <li><a ng-click="showTeamIntro()">Team</a></li>
                    <li><a ng-click="showAssetsIntro()">Asset</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>