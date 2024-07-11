<?php

// app/Http/Controllers/MenuItemController.php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|string', // Changed to string
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buat data menu item baru
        $menuItem = MenuItem::create([
            'id' => $request->id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'price' => $request->price,
            'image' => $request->image, // Directly assign the base64 string
            'description' => $request->description,
        ]);

        return response()->json(['menuItem' => $menuItem], 201);
    }

    public function index()
    {
        $menuItems = MenuItem::all();
        return response()->json($menuItems);
    }
    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return response()->json(['message' => 'Menu item deleted successfully'], 200);
    }
    public function update(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'id' => 'nullable|numeric',
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'image' => 'nullable|string', // Assuming image is sent as base64 string
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the menu item
        $menuItem = MenuItem::find($request->id);

        if (!$menuItem) {
            return response()->json(['message' => 'Menu item not found'], 404);
        }

        // Update the menu item
        if ($request->has('category_id')) {
            $menuItem->category_id = $request->category_id;
        }
        if ($request->has('name')) {
            $menuItem->name = $request->name;
        }
        if ($request->has('price')) {
            $menuItem->price = $request->price;
        }
        if ($request->has('image')) {
            $menuItem->image = $request->image;
        }
        if ($request->has('description')) {
            $menuItem->description = $request->description;
        }

        $menuItem->save();

        return response()->json(['message' => 'Menu item updated successfully', 'menuItem' => $menuItem], 200);
    }
}
