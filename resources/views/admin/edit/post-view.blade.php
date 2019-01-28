<div class="modal" id="post-view-modal" role="dialog" aria-labelledby="modalLabelbounce">
    <div class="modal-dialog modal-lg collabrate_board" role="document">
        <div class="modal-content"  ng-click="helpPost.fn.zoneClick()">
            <div class="modal-header collaborate_btn">
                <h4 class="modal-title">
                    <div class="help-title" ng-click="$event.stopPropagation()">
                        <div ng-if="!helpPost.edit.title" ng-click="helpPost.fn.editTitle(true)">
                            <p class="no-mar"><span ng-bind="adminCtrl.helpPost.help.title">Help Title</span><span class="left-spacesm"><i class="fa fa-edit"></i></span>
                                <button class="btn btl-labeled btn-sm" ng-click="helpPost.fn.deletePost()">Delete</button></p>
                        </div>
                        <div ng-if="helpPost.edit.title">
                            <input type="text" class="form-control pull-left collobrate_popup"
                                   ng-model="helpPost.model.title">
                            <div class="dr top-spacesm">
                                <button type="button btn-default btn-sm" class="btn btn-default btn-sm"
                                        ng-click="helpPost.fn.updateTitle()">Save
                                </button>
                                <button type="button" class="btn btn-close btn-sm"
                                        ng-click="helpPost.fn.editTitle(false)">Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </h4>
                {{--<div class="dropdown">--}}
                {{--<button class="dropdown-toggle" data-toggle="dropdown"></button>--}}
                {{--<div class="dropdown-menu">--}}
                {{--<div ng-click="helpPost.fn.deletePost()">Delete</div>--}}
                {{--</div>--}}
                {{--</div>--}}
                <button type="button" class="close"  datadismissmodal="post-view-modal" aria-label="Close">
                    <span aria-hidden="true"><i class="icomoon icomoon-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-9">
                        <div ng-click="$event.stopPropagation()">
                            <div  ng-if="!helpPost.edit.description" ng-click="helpPost.fn.editDescription(true)" class="help-description">
                                <p ng-bind-html="helpPost.help.description | unsafe">Help Description</p>
                            </div>
                            <div ng-show="helpPost.edit.description">
                                <textarea class="ckeditor" ckeditor  placeholder="description"  ng-model="helpPost.model.description" rows="15"></textarea>
                                <div class="dr top-spacesm">
                                    <button type="button btn-default btn-sm" class="btn btn-default btn-sm"
                                            ng-click="helpPost.fn.updateDescription()">Save
                                    </button>
                                    <button type="button" class="btn btn-close btn-sm"
                                            ng-click="helpPost.fn.editDescription(false)">Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="help-status">
                            <div ng-if="!helpPost.edit.status">
                                <div class="clearfix">
                                    <div class="pull-left"><label>Status:&nbsp;</label> </div>
                                    <div class="pull-left">
                                        <span class="complete_space hor-spacesm" ng-style="{background: helpPost.help.help_state.color_code}" ng-bind="helpPost.help.help_state.name"></span>
                                        <a class="fa fa-pencil" ng-click="$event.stopPropagation();helpPost.fn.editStatus(true)"></a>

                                    </div>
                                </div>

                            </div>
                            <div ng-click="$event.stopPropagation();" ng-show="helpPost.edit.status">
                                <select ng-model="helpPost.model.status" ng-change="helpPost.fn.changeStatus()" ng-options="status.name for status in helpPost.cat_statuses track by status.id">
                                </select>
                            </div>
                        </div>

                        <div class="help-comments">
                            <div class="m-t-35">
                                <div class="bg-white">
                                    <h4 class="p-d-10 chat_bottom">Comments</h4>
                                    <div class="chat-conversation p-d-10 m-t-25">
                                        <ul class="conversation-list">
                                            <li class="clearfix" ng-repeat="comment in (helpPost.help.help_comments| orderBy:'id') track by comment.id " ng-class="{odd : comment.is_admin_post}">
                                                <div class="chat-avatar">
                                                    <img ng-src="@{{ comment.user.profile_image }}" alt="@{{ comment.user.user_name }}">

                                                </div>
                                                <div class="conversation-text">
                                                    <div class="ctext-wrap">
                                                        <p ng-bind="comment.user.user_name" class="userName">User name</p>
                                                        <div class="bot-space" ng-bind-html="comment.description | unsafe">
                                                            Comment decription
                                                        </div>
                                                        <p class="date"><i>@{{ comment.created_at }}</i></p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <form id="main_input_box" ng-submit="helpPost.fn.postComment(post_new_comment)" name="post_new_comment" novalidate>
                                            <div class="row">
                                                <div class="col-12 m-b-15">
                                                    <div class="">
                                                        <textarea class="ckeditor form-control chat-input custom_textbox" ckeditor  placeholder="Enter your text"  id="custom_textbox" ng-model="helpPost.model.comment" rows="15" required></textarea>
                                                        <div class="ver-space dr">
                                                            <button class="btn btn-primary waves-effect waves-light" type="submit" ng-disabled="post_new_comment.$invalid">
                                                                submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="help-status-timeline">
                            <div class="bot-mspace">
                                <h2 class="nameDetails">Status history</h2>
                                <div class="help_searchbxMain">
                                    <ul class="unstyled statusHistory">
                                        <li class="pr state_active" ng-repeat="status in helpPost.help.help_history">
                                            <div class="statusHistoryCont space box_shadow">
                                                <p class="pr arrow_left"><span
                                                            class="pa arrow"></span></p>
                                                <p class="statusHistIocn pa" ng-class="status.slug">
                                                    <span ng-style="{'background-color': status.color_code}"></span>
                                                </p>
                                                <div class="row">
                                                    <div class="col-md-7">
                                                        <p class="postedStatus bot-spacesm" ng-bind="status.sort_note"></p>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p class="postedBy dr"></p>
                                                    </div>
                                                </div>
                                                <p class="postedStatusInner bot-spacesm">
                                                    <span class="hor-spacesm" ng-style="{'background-color': status.color_code}" ng-bind="status.name"></span>
                                                </p>
                                            </div>
                                            <p class="help_cmtedname">
                                                <a ng-bind="helpPost.help.user.name"></a>
                                                <span class="profileUsername" ng-bind="'@'+helpPost.help.user.user_name"></span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ URL::asset('assets/js/ckeditor/angular-ckeditor.min.js') }}"></script>
<script type="text/javascript" src="{{asset('assets/js/ckeditor/ckeditor.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/ckeditor/config.js')}}"></script>
<script> angular.module("wofoxApp").requires.push('ckeditor');</script>