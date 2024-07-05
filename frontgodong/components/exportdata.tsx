import axios from 'axios';
import React from 'react'
import * as XLSX from "xlsx";
import { Button } from './ui/button';
export default function exportdata(props : string) {
    const onGetExportProduct = async (title = 'ExportedData', worksheetname = 'Sheet1') => {
        try {
          const response = await axios.get(`http://godongbackend.test/api/${props}`);
    
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            const { columns, data } = response.data;
    
            // Buat data dalam bentuk AoA (Array of Arrays)
            const worksheetData = [columns, ...data.map(item => columns.map(col => item[col]))];
    
            // Buat workbook dan worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
            XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    
            // Simpan workbook sebagai file Excel
            XLSX.writeFile(workbook, `${title}.xlsx`);
            console.log(`Exported data to ${title}.xlsx`);
          } else {
            console.log("#==================Export Error: No data found");
          }
        } catch (error: any) {
          console.log("#==================Export Error", error.message);
        } finally {
        }
      };
    
  return (
    <Button variant="ghost" {...props} onClick={() => onGetExportProduct()}></Button>
  )
}
