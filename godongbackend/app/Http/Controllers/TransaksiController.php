<?php

namespace App\Http\Controllers;

use App\Models\detail_penjualan;
use App\Models\total_penjualan;
use Illuminate\Http\Request;
use App\Models\transaksi;

class TransaksiController extends Controller
{ 
    function generatefaktur() {
    $faktur = 'INV'.mt_rand(1000000000, 2000000000);
    while (total_penjualan::where('faktur', $faktur)->exists()) {
        $faktur ='INV'.mt_rand(1000000000, 2000000000);
    }

    return $faktur;
}
public function store(Request $request)
{
    $request->validate([
        'id_user' => 'required|integer',
        'no_telepon' => 'required|string|max:20',
        'alamat' => 'required|string|max:100',
        'sub_total' => 'required|numeric',
        'total' => 'required|numeric',
        'items' => 'required|array'
    ]);

    // Generate random faktur
    $faktur = $this -> generatefaktur();

    // Create total_penjualan record
    $transaksi = new total_penjualan();
    $transaksi->faktur = $faktur;
    $transaksi->id_user = $request->id_user;
    $transaksi->no_telepon = $request->no_telepon;
    $transaksi->alamat = $request->alamat;
    $transaksi->sub_total = $request->sub_total;
    $transaksi->total = $request->total;
    $transaksi->save();

    // Create detail_penjualan records
    foreach ($request->items as $item) {
        $detail = new detail_penjualan();
        $detail->faktur = $faktur;
        $detail->kode_menu = $item['kode_menu'];
        $detail->jumlah = $item['count'];
        $detail->total = $item['price'] * $item['count'];
        $detail->save();
    }
    return response()->json(['message' => 'Transaksi berhasil disimpan', 'faktur' => $faktur], 201);
}
public function index()
{
    $transaksi = total_penjualan::all();
    return response()->json($transaksi);
}

public function destroy($id)
{
    $transaksi = total_penjualan::findOrFail($id);
    $transaksi->delete();

    return response()->json(['message' => 'Transaksi deleted successfully'], 200);
}

public function statistics()
{
    $totalPenjualan = total_penjualan::sum('total');
    $jumlahOrder = total_penjualan::count();
    $jumlahClient = total_penjualan::distinct('id_user')->count('id_user');

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

    $transactions = total_penjualan::whereBetween('tanggal', [$request->from, $request->to])->get();

    return response()->json($transactions);
}
public function getTransactionByUser($id){
    $transaction = total_penjualan::where('id_user',$id)->get();
    return response()->json($transaction);
}
public function getTransactionByUserWithDetails($id)
{
    $transactions = total_penjualan::where('id_user', $id)->get();

    $transactionsWithDetails = $transactions->map(
        function ($transaction) {
        $details = detail_penjualan::where('faktur', $transaction->faktur)
            ->join('menu_items', 'detail_penjualan.kode_menu', '=', 'menu_items.kode_menu')
            ->select('detail_penjualan.*', 'menu_items.name as menu_name', 'menu_items.image')
            ->get();
        $transaction->details = $details;
        $transaction->main_item = $details->first();
        $transaction->other_items_count = $details->count() - 1;
        return $transaction;
    });

    return response()->json($transactionsWithDetails);
}
}
