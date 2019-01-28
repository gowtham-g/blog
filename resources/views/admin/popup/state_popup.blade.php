<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" ng-controller="adminController as adminCtrl">
    <div class="modal-dialog modal_small hor_bdr_before delete-popup" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Are you sure?</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i
                            class="icomoon icomoon-times"></i></button>
            </div>
            <ajax-loader-md ng-show="recent.design_md_loader"></ajax-loader-md>
            <div class="modal-body">
                <div class="ajax_load" ng-show="auth.ajax_loader"></div>

                <div>
                    <h4 class="bot-space bot-mspace"> If you delete these designs, you can't get them back! </h4>
                    <div class="dr">


                        <button class="btn btn-default right-mspacesm" ng-click="adminCtrl.deleteState({{$helpState->id}})"
                                id="dusk_click_delete_design_js">Delete</button>
                        <button class="btn btn-primary" ng-click="adminCtrl.cancel()"
                                id="dusk_click_delete_cancel_design_js">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


