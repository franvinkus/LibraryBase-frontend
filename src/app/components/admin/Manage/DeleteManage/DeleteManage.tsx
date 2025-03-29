"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface DeleteManageUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  bookingId: number | null;
  currentStatus: string | null;
  onSuccess?: () => void;
}

export default function DeleteManageUser({ isOpen, onClose, userId, bookingId, currentStatus, onSuccess }: DeleteManageUserProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
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

      // Konfirmasi sebelum membatalkan booking
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel this booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (!confirmResult.isConfirmed) {
        return;
      }

      // Endpoint DELETE untuk cancel booking
      const endpoint = `${API_BASE_URL}/api/Borrow/${userId}/${bookingId}/Cancel`;

      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await Swal.fire({
          title: "Cancelled!",
          text: "The booking has been cancelled successfully.",
          icon: "success",
        }).then(() => {
          if (onSuccess) {
            onSuccess();
          }
          onClose();
          window.location.reload();
        });
      }
    } catch (err) {
      console.error("Cancel error:", err);

      let errorMessage = "Failed to cancel booking. Please try again.";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }

      setError(errorMessage);
      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 text-black">Cancel Booking</h3>

        <div className="mb-6 space-y-3 text-black">
          <p className="font-medium">User ID: {userId}</p>
          <p>Booking ID: {bookingId}</p>
          <p>
            Current Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                currentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : currentStatus === "approved" ? "bg-green-100 text-green-800" : currentStatus === "rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {currentStatus}
            </span>
          </p>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="flex justify-end gap-2">
          <button type="button" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button onClick={handleDelete} className={`px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ${loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-900  "}`} disabled={loading}>
            {loading ? "Cancelling..." : "Cancel Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
