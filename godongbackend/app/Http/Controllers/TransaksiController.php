<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\transaksi;
class TransaksiController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|integer',
            'no_telepon' => 'required|string|max:20',
            'alamat' => 'required|string|max:100',
            'item' => 'required|json',
            'total'=>'required|integer'
        ]);

        $transaksi = new Transaksi();
        $transaksi->id_user = $request->id_user;
        $transaksi->no_telepon = $request->no_telepon;
        $transaksi->alamat = $request->alamat;
        $transaksi->item = $request->item;
        $transaksi->total = $request->total;
        $transaksi->save();

        return response()->json($transaksi, 201);
    }

    public function index()
    {
        $transaksi = Transaksi::all();
        return response()->json($transaksi);
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();

        return response()->json(['message' => 'Transaksi deleted successfully'], 200);
    }
    public function statistics()
    {
        $totalPenjualan = Transaksi::sum('total');
        $jumlahOrder = Transaksi::count();
        $jumlahClient = Transaksi::distinct('id_user')->count('id_user');

        return response()->json([
            'total_penjualan' => $totalPenjualan,
            'jumlah_order' => $jumlahOrder,
            'jumlah_client' => $jumlahClient
        ]);
    }
    public function getTransactionsByDateRange(Request $request)
{
    $request->validate([
        'from' => 'required|date',
        'to' => 'required|date',
    ]);

    $transactions = Transaksi::whereBetween('tanggal', [$request->from, $request->to])->get();

    return response()->json($transactions);
}
}