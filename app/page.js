'use client'
import { useState } from "react";

const overtimeRates = {
  6: 53000, // Tarif lembur untuk level 6
  5: 80000, // Tarif lembur untuk level 5
  "<5": 65000, // Tarif lembur untuk level kurang dari 5
};

export default function Home() {
  const [level, setLevel] = useState("6");
  const [hours, setHours] = useState("1.3"); // Input dalam format desimal
  const [salary, setSalary] = useState(0); // Input gaji
  const [total, setTotal] = useState(0);
  const [bpjsKetenagakerjaan, setBpjsKetenagakerjaan] = useState(0);
  const [bpjsKesehatan, setBpjsKesehatan] = useState(0);

  const calculateOvertime = () => {
    const rate = overtimeRates[level]; // Ambil tarif berdasarkan level
    const overtimePay = hours * rate; // Hitung total lembur

    const rawSalary = parseInt(salary.toString().replace(/[^\d]/g, ""), 10); // Konversi gaji ke angka
    const bpjsKetenagakerjaan = rawSalary * 0.03; // Potongan BPJS Ketenagakerjaan (3%)
    const bpjsKesehatan = rawSalary * 0.01; // Potongan BPJS Kesehatan (1%)
    const salaryAfterDeduction = rawSalary - bpjsKetenagakerjaan - bpjsKesehatan; // Gaji setelah potongan
    const totalPay = salaryAfterDeduction + overtimePay; // Total gaji setelah dikurangi dan ditambah lembur

    setTotal(totalPay); // Simpan total di state
    setBpjsKetenagakerjaan(bpjsKetenagakerjaan); // Simpan nilai BPJS Ketenagakerjaan
    setBpjsKesehatan(bpjsKesehatan); // Simpan nilai BPJS Kesehatan
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      calculateOvertime(); // Jalankan kalkulasi ketika tombol Enter ditekan
    }
  };

  const handleHoursChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/(\.\d{2})\d+$/, "$1"); // Hanya ambil satu angka setelah titik
    setHours(formattedValue);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Overtime Calculator <br /> <span className="text-red-600 mb-0">Steradian</span> <br /><small className="text-sm text-gray-400">(beta version)</small>
        </h2>
        <div className="mb-4">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Select Employee Level:
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="<5">&lt;5</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Enter Salary (Rp):
          </label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, ""); // Hanya angka
              const formattedValue = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(value); // Format ke Rupiah
              setSalary(formattedValue); // Simpan nilai format Rupiah ke state
            }}
            onBlur={() => {
              const rawValue = parseInt(salary.replace(/[^\d]/g, ""), 10); // Ambil angka asli
              setSalary(rawValue || 0); // Jika kosong, set ke 0
            }}
            className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="hours"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Overtime Hours (e.g.,1.0 for 1 hour, 1.30 for 1 hour 30 minutes):
          </label>
          <input
            type="text"
            id="hours"
            onKeyDown={handleKeyDown}
            value={hours}
            onChange={handleHoursChange} // Menggunakan fungsi ini untuk memformat input
            className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={calculateOvertime}
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Calculate
        </button>
        {total > 0 && (
          <div className="mt-4 text-center font-bold text-gray-700">
            <p>Total Pay After Deductions + Overtime:</p>
            <p className="text-orange-500 text-xl">
              Rp {total.toLocaleString("id-ID")}
            </p>
            <div className="mt-2 text-sm text-gray-600">
              <p>BPJS Ketenagakerjaan (3%): Rp {bpjsKetenagakerjaan.toLocaleString("id-ID")}</p>
              <p>BPJS Kesehatan (1%): Rp {bpjsKesehatan.toLocaleString("id-ID")}</p>
            </div>
            <small className="mt-5 text-[8px]"><span className="text-red-500 text-sm">*</span> Perhitungan ini hanyalah simulasi, jika ada perbedaan hitungan bisa hubungi pihak management</small>
          </div>
        )}
      </div>
    </div>
  );
}
