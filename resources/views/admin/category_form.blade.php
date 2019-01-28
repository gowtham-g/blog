<tr>
    @if($is_parent == 1)<td>{{ $category->name }}</td>@else<td></td>@endif
    @if($is_parent == 1)<td>-</td>@else<td class="admin_subcategory">{{ $category->name }}</td>@endif
    <td class="" width="200px">
        <div class="admin_subcategory">
            {{ $category->description }}
        </div>
    </td>
    <td><i class="fa {{ $category->icon}} fa-lg" style="color: {{ $category->color }}"></i> </td>
    <td>{{ $category->display_disable }}</td>
    <td class="">{{ $category->display_date }}</td>
    <td class="">{{ $category->user_post }}</td>
    <td class="">{{ $category->category_active }}</td>
    <td width="250px" >
        <div class="admin_subcategory">
            <div class="col-lg input_field_sections">
                {{Form::select('state_id',$helpState, $category->help_state->pluck('id'),array('class' =>'form-control chzn-select', 'tabindex' => '8','multiple', 'data-category-id' => $category->id))}}
            </div>
        </div>
    </td>
        <td class="">
            <a  class="pr">
                <span class="badge badge-pill badge-danger">{{ $category->helps_count }}</span></a>
        </td>
    <td class="">
        <div class="admin_subcategory">
            <a href="{{ route('admin.category.preview', ['helpCategory' => $category->slug]) }}" class="fa fa-eye btn btn-labeled" data-toggle="tooltip" data-placement="top" title="View"></a>
            <a class="fa fa-pencil btn btn-labeled" href="{{ route('admin.category.edit', ['helpCategory' => $category->slug]) }}" data-toggle="tooltip" data-placement="top" title="Edit"></a>
            <a class="fa fa-trash btn btn-labeled" data-toggle="tooltip" data-placement="top" ng-click="adminCtrl.DeleteCategory('{{$category->slug}}')"}} title="Delete"></a>
        </div>
    </td>
</tr>


