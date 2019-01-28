<?php

namespace App\Http\Controllers;
use App\Model\Help\HelpState;
use Illuminate\Http\Request;
use App\Http\Requests\StateRequest;

class StateController extends Controller
{
    public function index(){
        $helpState = HelpState::paginate(5);
        return view('admin.state_list',compact('helpState'));
    }
    public function create(){
        return view('admin.create.state.state');
    }
    public function store(StateRequest $request){
        HelpState::create($request->all());
        return back()->with(['success' => 'State created successfully.']);
    }
    public function edit(HelpState $helpState){
        return view('admin.edit.state_edit', compact('helpState'));
    }
    public function update(HelpState $helpState,StateRequest $request){
        $helpState->update($request->only('name','color_code', 'order_by'));
        return back()->with(['success' => 'State updated successfully.']);
    }
    public function popupdelete(HelpState $helpState){
        return view('admin.popup.state_popup',compact('helpState'));
    }
    public function destroy(HelpState $helpState){
        $helpState->delete();
        return back()->with(['error' => 'State deleted successfully.']);
    }
}
