<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Code;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Code::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required',
            'subtopic' => 'required',
            'title' => 'required',
            'explanation' => 'required',
            'tldr' => 'required',
            'code' => 'required',
        ]);
    
        $created = Code::create($data);
    
        return response()->json($created, 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Code::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'category' => 'required',
            'subtopic' => 'required',
            'title' => 'required',
            'explanation' => 'required',
            'tldr' => 'required',
            'code' => 'required',
        ]);
    
        $item = Code::findOrFail($id);
        $item->update($data);
    
        return response()->json($item, 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = Code::findOrFail($id);
        $item->delete();
    
        return response()->json(['message' => 'Deleted'], 200);
    }

    public function grouped()
    {
        $data = Code::orderBy('category')
                    ->orderBy('subtopic')
                    ->get()
                    ->groupBy('category');

        return response()->json($data);
    }

    
}
