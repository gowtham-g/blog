<div   ng-controller="adminPermissionRoleController" ng-init="adminPermissionRoleCtrl.roleInitialData()">
    <header class="admin-head">
        <div class="main-bar">
            <div class="row">
                <div class="col-lg-5 col-lg skin_txt m-b-15">
                    <h4 class="nav_top_align">
                        <div class="bot-mspace d-flex">
                            Role List
                            <span class="bg-info total-count"></span>
                        </div>
                    </h4>
                </div>
                <div class="col-sm-7 col-lg">
                    <div class="m-t-10">
                        <button class="btn btn-info float-right nav_breadcrumb_top_align right-mspace" ng-click="adminPermissionRoleCtrl.createPermissionRole('role')">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="outer">
        <div class="inner bg-container">
            <div class="card">
                <div class="card-header bg-white">
                    <div class="row">
                        <div class="col-lg-7 col-md-12">
                            <div class="d-flex">
                                <form class="header_input_search">
                                    <input type="text" placeholder="Search Role..." name="search" ng-model="searchRoleData">
                                    <button ng-click="adminPermissionRoleCtrl.searchRolePermission(searchRoleData,'role')">
                                        <span class="font-icon-search"></span>
                                    </button>
                                    <div class="overlay"></div>
                                </form>
                            </div>
                            <p class="errorMsg">@{{adminPermissionRoleCtrl.searchResultErr}}</p>
                            <p ng-hide="adminPermissionRoleCtrl.load">Loading....</p>
                        </div>
                        <div class="col-md-3">
                            <div class="d-flex">
                                <label for="username2" class="col-form-label form_lay_email2 right-mspace">Item per
                                    Page:</label>
                                <select id="MySelectOption" ng-model ="page" ng-change="adminPermissionRoleCtrl.itemsPerPageChange(adminPermissionRoleCtrl.currentPage,page,searchRoleData,'role')">
                                    @include('admin.user.item_per_page')
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped" ng-show="adminPermissionRoleCtrl.roleView" >
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>User</th>
                                <th class="table-option">option</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat=" role in adminPermissionRoleCtrl.rolePermissionData.data">
                                <td ng-if="adminPermissionRoleCtrl.dataType == 'search'"><span class="tag tag-mint">@{{adminPermissionRoleCtrl.itemsPerPage *(adminPermissionRoleCtrl.currentPage-1)+$index+1}}</span></td>
                                <td ng-if="adminPermissionRoleCtrl.dataType != 'search'"><span class="tag tag-mint">@{{adminPermissionRoleCtrl.itemsPerPage *(adminPermissionRoleCtrl.currentPage-1)+$index+1}}</span></td>
                                <td><span class="tag tag-mint">@{{ role.display_name }}</span></td>
                                <td><span class="tag tag-mint">@{{ role.description }}</span></td>
                                <td class="order">
                                    <ul>
                                        <li ng-repeat="user in role.user">
                                            @{{user.full_name}}
                                        </li>
                                    </ul>
                                </td>
                                <td class="table-option">
                                    <a href="" class="tag tag-mint bg-warning bg-block-view admin-subBtn  mr-1" ng-click="adminPermissionRoleCtrl.editPermissionRole(role.id,$index,'role')">
                                        <i class="fa fa-pencil"></i>
                                    </a>
                                    <a href="" class="tag tag-mint bg-danger bg-block-view admin-subBtn mr-1" ng-click="adminPermissionRoleCtrl.deletePermissionRole(role.id,$index,'role')">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                    <a href="" class="tag tag-mint bg-danger bg-block-view admin-subBtn mr-1" ng-click="adminPermissionRoleCtrl.addPermissionRole(role.id,$index,'role')">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>



