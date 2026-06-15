/**
 * Sistem Informasi SMP Diponegoro Sampang
 * Backend Apps Script untuk Integrasi Google Spreadsheet dengan Halaman Login
 * * Target Sheet:
 * 1. Sheet 'regsiswa' (Kolom wajib: Nama Siswa, Kelas, NIS)
 * 2. Sheet 'reggtk' (Kolom wajib: Nama GTK, Jabatan, NIK)
 */

function doGet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Ambil data dari sheet 'regsiswa'
    const sheetSiswa = ss.getSheetByName("regsiswa");
    const dataSiswa = sheetSiswa ? getSheetDataNormalized(sheetSiswa) : [];
    
    // Ambil data dari sheet 'reggtk'
    const sheetGtk = ss.getSheetByName("reggtk");
    const dataGtk = sheetGtk ? getSheetDataNormalized(sheetGtk) : [];
    
    // Bungkus output ke dalam satu objek JSON
    const responseData = {
      status: "success",
      timestamp: new Date().toISOString(),
      regsiswa: dataSiswa,
      reggtk: dataGtk
    };
    
    // Kembalikan output berupa JSON dengan header CORS yang diizinkan oleh Google
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Penanganan error jika terjadi masalah saat pembacaan data spreadsheet
    const errorResponse = {
      status: "error",
      message: error.toString()
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fungsi pembantu untuk membaca seluruh baris data pada sheet dan mengonversinya
 * menjadi objek JSON (Key-Value) berdasarkan baris pertama (Header).
 * Data dibersihkan dari spasi berlebih untuk mencegah kegagalan pencocokan login.
 */
function getSheetDataNormalized(sheet) {
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  if (values.length <= 1) {
    return []; // Kembalikan array kosong jika hanya ada header atau sheet kosong
  }
  
  // Baris pertama diasumsikan sebagai nama kolom/header
  const headers = values[0].map(h => String(h).trim());
  const formattedData = [];
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowObject = {};
    let hasData = false;
    
    for (let j = 0; j < headers.length; j++) {
      const cellValue = row[j];
      const headerName = headers[j];
      
      if (headerName !== "") {
        // Normalisasi teks: bersihkan spasi di awal/akhir jika bertipe string
        const cleanValue = typeof cellValue === "string" ? cellValue.trim() : cellValue;
        rowObject[headerName] = cleanValue;
        
        if (cleanValue !== "") {
          hasData = true; // Menandai jika baris ini benar-benar memiliki data (bukan baris kosong)
        }
      }
    }
    
    // Hanya masukkan baris yang memiliki setidaknya satu data terisi
    if (hasData) {
      formattedData.push(rowObject);
    }
  }
  
  return formattedData;
}