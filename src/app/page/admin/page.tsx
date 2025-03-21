"use client";
import { useState } from "react";
import { Home, Users, Settings, Menu } from "lucide-react";
import SidebarAdmin from "@/app/components/admin/SidebarAdmin/SidebarAdmin";
import NavbarAdmin from "@/app/components/admin/NavbarAdmin/NavbarAdmin";
import CategoryCard from "@/app/components/admin/CategoryCard/CategoryCard";



export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">


      <SidebarAdmin />

      {/* Main Content */}
      <main className="flex-1 p-6 pt-6 lg:pt-16">
        {/* Navbar */}
        <NavbarAdmin />


        {/* Categories Section */}
        <section className="mt-10">
          <CategoryCard />
        </section>
      </main>
    </div>
  );
}
