<?php

namespace App\Http\Controllers;
use App\Models\Contact;

use Illuminate\Http\Request;
use Schema;
class ContactController extends Controller
{
    function contact(Request $req){
        $contacts = new Contact;
        $contacts ->email=$req->input('email');
        $contacts ->message=$req->input('message');
        $contacts ->save();
        return $contacts;
    }
    public function index()
    {
        // Fetch all users from the database
        $users = Contact::all();

        // Return users as JSON response
        return response()->json($users);
    }   
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'contact not found'], 404);
        }

        $contact->delete();

        return response()->json(['message' => 'contact deleted successfully'], 200);
    }
    // public function getColumns()
    // {
    //     $columns = Schema::getColumnListing('contacts');
    //     $data = Contact::all();
    //     return response()->json([
    //         'columns' => $columns,
    //         'data' => $data
    //     ]);
    // }
}