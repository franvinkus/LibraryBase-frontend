"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

interface UpdateManageProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  bookingId: number | null;
  currentStatus: string | null;
}

export default function UpdateManageUser({ isOpen, onClose, userId, bookingId, currentStatus }: UpdateManageProps) {
  const [selectedOption, setSelectedOption] = useState<"Borrow" | "Return">(currentStatus === "pending" ? "Borrow" : "Return");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Borrow", "Return"] as const;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User session expired! Please login again.");
        setLoading(false);
        return;
      }

      // Pilih endpoint berdasarkan opsi yang dipilih
      const endpoint = selectedOption === "Borrow" ? `${API_BASE_URL}/api/Borrow/${userId}/${bookingId}/Borrow` : `${API_BASE_URL}/api/Borrow/${userId}/${bookingId}/Return`;

      const response = await axios.put(endpoint, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: `Status successfully updated to ${selectedOption}`,
          icon: "success",
        }).then(() => {
          onClose(); // Tutup modal
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update status. Please try again.");
      Swal.fire({
        title: "Error!",
        text: "Failed to update status",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Update Booking Status</h3>

        <div className="mb-4">
          <p className="font-medium">User ID: {userId}</p>
          <p>Booking ID: {bookingId}</p>
          <p>Current Status: {currentStatus}</p>
        </div>

        <div className="relative w-full mb-4" ref={dropdownRef}>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Update to:
            </label>

            <button
              type="button"
              className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loading}
            >
              <span className="truncate">{selectedOption}</span>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`} />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${selectedOption === option ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" onClick={handleUpdate} disabled={loading}>
            {loading ? "Processing..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
