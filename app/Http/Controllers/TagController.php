<?php

namespace App\Http\Controllers;

use App\Model\Help\HelpTag;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{
    public function index(){
        $helpTag = HelpTag::paginate(10);
        return view('admin.tag_view',compact('helpTag'));
    }
    public function  create(){
        return view('admin.create.tag.tag');
    }
    public function store(TagRequest $request){
        HelpTag::create($request->all());
        return back()->with(['success' => 'Tag created successfully.']);
    }
    public function edit(HelpTag $helpTag){
        return view('admin.edit.tag_edit', compact('helpTag'));
    }
    public function update(HelpTag $helpTag,TagRequest $request){
        $helpTag->update($request->only('name'));
        return back()->with(['success' => 'Tag updated successfully.']);
    }
    public function popupView(HelpTag $helpTag){
        return view('admin.popup.tag_popup',compact('helpTag'));
    }
    public function delete(HelpTag $helpTag){
        $helpTag->delete();
        return back()->with(['success'=>'Tag Delete successfully']);
    }
}
