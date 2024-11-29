'use client'
import { useState } from "react";

const overtimeRates = {
  6: 53000, // Tarif lembur untuk level 6
  5: 80000, // Tarif lembur untuk level 5
  "<5": 65000, // Tarif lembur untuk level kurang dari 5
};

export default function Home() {
    const [level, setLevel] = useState("6");
  const [hours, setHours] = useState("1.0"); // Mengubah ke string agar bisa menerima format desimal
  const [total, setTotal] = useState(0);

  const calculateOvertime = () => {
    const rate = overtimeRates[level]; // Mengambil tarif berdasarkan level
    const [wholeHours, minutes] = hours.split('.'); // Memisahkan jam dan menit
    const totalHours = Number(wholeHours) + (Number(minutes) / 60); // Menghitung total jam
    setTotal(totalHours * rate); // Menghitung total lembur
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      calculateOvertime(); // Jalankan kalkulasi ketika tombol Enter ditekan
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Overtime Calculator <br/> <span className="text-red-600 mb-0">Steradian</span> <br/><small className="text-sm text-gray-400">(beta version)</small>
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
            onChange={(e) => setHours(e.target.value)}
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
            <p>Total Overtime Pay:</p>
            <p className="text-orange-500 text-xl">
              Rp {total.toLocaleString("id-ID")}
            </p>
            <small className="mt-5 text-[8px]"><span className="text-red-500 text-sm">*</span>perhitungan ini hanyalah simulasi, jika ada perbedaan hitungan bisa hubungi pihak management</small>
          </div>
        )}
      </div>
    </div>
  );
}
