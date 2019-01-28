<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Model\Help\HelpState;
use App\Model\Help\HelpCategory;
use App\Model\Help\HelpTag;
use App\Model\Help\Help;
use App\Traits\FileTrait;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostRequest;
use App\Http\Requests\CategoryRequest;

class HelpController extends Controller
{
    use FileTrait;
    public function index_admin()
    {
        return view('admin.index');
    }
    public function dashboard()
    {
        $helpState=HelpState::get()->pluck('name','id');
        $helpCategory=HelpCategory::whereNull('parent_id')->with('help_state','childCategories')->withcount('helps')->orderBy('order_by')->paginate(10);
        return view('admin.category_view',compact('helpCategory','helpState'));
    }
    public function addPost()
    {
        $category=HelpCategory::where('is_active', 1)->whereNull('parent_id')->pluck('name','slug');
        $helpCategory=HelpCategory::with('help_state')->withcount('helps')->paginate(10);
        return view('admin.create.add_post.post_create', compact('helpCategory', 'category'));
    }
    public function create()
    {
        $categories=$this->categoryList();
        return view('admin.create.category_create',compact('categories'));
    }
    public function store(CategoryRequest $request)
    {
        HelpCategory::create($request->all());
        if(request()->ajax()){
            return response()->json(['success' => true]);
        }else{
            return back()->with(['success' => 'Category created successfully.']);
        }
    }
    public function Categorydelete(HelpCategory $helpCategory)
    {
        return view('admin.popup.category_popup',compact('helpCategory'));
    }
    public function deleteCat(HelpCategory  $helpCategory)
    {
        $helpCategory->delete();
         return back()->with(['error' => 'Category deleted successfully.']);
    }
    public function edit(HelpCategory $helpCategory)
    {
        $categories = $this->categoryList();
        return view('admin.edit.category_edit', compact('helpCategory', 'categories'));
    }
    private function categoryList()
    {
        return HelpCategory::get()->pluck('name','id');
    }
    public function  update(HelpCategory $helpCategory,Request $request)
    {
        $helpCategory->update($request->all());
        return response()->json(['success' =>  'Category update successfully.']);
    }
    /**
     * @param HelpCategory $Category
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function poststore(PostRequest $request)
    {
        $category = HelpCategory::where('slug',$request->category)->first();
        $file = $request->file('image');
        $file_name = md5(Carbon::now()->format('YmdHis'));
        $extension = $file->getClientOriginalExtension();
        $new_directory = $this->directory_manipulate($file_name);
        $file_name .= '.' . $extension;
        $file->storeAs($new_directory, $file_name, 'helpFile');
        $file_path = Storage::disk('helpFile')->url('/');
        $imageName = $file_path.$new_directory . $file_name;
        $approved_at = Carbon::now()->format('Y-m-d h:i:s');
        $help  = Help::create(array_merge(
            $request->only(['title', 'description', 'help_state_id']),
            [
                'img'=>$imageName,
                'user_id' => auth()->id(),
                'approved_at' => $approved_at,
                'approved_by' => auth()->id() ,
                'help_category_id' => $category->id,
                'help_tag_id' =>$request->helptags_id[0],
            ]));
        $help->helpPivot()->sync($request->helptags_id);
        if($category->is_user_post == 0){
            User::increment('announcement_count');
        }
        return back()->with(['success' => 'Help post created successfully.']);
    }
    public function preview(HelpCategory $helpCategory)
    {
        $helps = $helpCategory->helps()->with(['helpState'])
            ->when(request()->has('state'), function ($query){
                $query->where('help_state_id', request('state'));
            })
            ->when(request()->has('title'), function ($query){
                $query->where('title', 'LIKE', '%'.request('title').'%');
            })->latest()->paginate();
        $helpStates = $helpCategory->help_state->pluck('name');
        return view('admin.Category_post_view', compact('helps', 'helpCategory', 'helpStates'));
    }
    public function statechange(Request $request)
    {
        $helpCategory = HelpCategory::find($request->category_id);
        $helpCategory->help_state()->sync($request->state_ids);
        return response()->json(['success' => 'State added successfully.']);
    }
    public function getStateApi(Request $request)
    {
        $helpStates = $request->all();
        $value = [];
            foreach ($helpStates['data'] as $State){
                $help = HelpCategory::where('slug',$State)->with('help_state')->get();
                foreach ($help as $helpstate)
                {
                    $datas = $helpstate->help_state;
                    foreach ($datas as $data){
                        $value[] = $data;
                    }
                }
            }
        return $value;
    }
    public function getTagApi(Request $request)
    {
        $helpTag = HelpTag::get();
        return $helpTag;
    }
    public function  category_preview_edit(HelpCategory $helpCategory){
        return view('admin.edit.category_edit', compact('helpCategory'));
    }
    public function fileUpload(Request $request)
    {
        $file = $request->file('upload_image');
        $file_name = md5(Carbon::now()->format('YmdHis'));
        $extension = $file->getClientOriginalExtension();
        $new_directory = $this->directory_manipulate($file_name);
        $file_name .= '.' . $extension;
        $file->storeAs($new_directory, $file_name, 'helpFile');
        $file_path = Storage::disk('helpFile')->url('/');
        $image = ['', 'jpg', 'gif', 'svg', 'png'];
        $video = ['', 'mp4'];
        $result = ''; $extension_status= false;
        if (array_search($extension, $image)) {
            $result = '<img class="' . $request->get('css') . '" width="' . $request->get('width') . '" height="' . $request->get('height') . '" src="' . $file_path.$new_directory . $file_name . '" />';
            $extension_status = true;
        }
        if (array_search($extension, $video)) {
            $result = '<video controls class="' . $request->get('css') . '" width="' . $request->get('width') . '" height="' . $request->get('height') . '" ><source src="' . $file_path.$new_directory . $file_name . '" type="video/mp4"></video>';
            $extension_status = true;
        }
        if($extension_status) {
            return response()->json(['result' => $result]);
        } else {
            return response()->json(['message' => "Extension not allowed"],422);
        }
    }
    public function categoryModelview($name)
    {
        return view('admin.popup.' .$name);
    }
}
