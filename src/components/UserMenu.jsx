import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { User, Settings, LogOut, Package, LayoutDashboard } from "lucide-react";

export default function UserMenu({ user, isOpen, onClose, onLogout }) {
  const menuRef = useRef(null);

  // বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* ইউজার ইনফো */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
        <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-inner">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            user?.name?.charAt(0).toUpperCase()
          )}
        </div>
        <div className="overflow-hidden">
          <h4 className="font-semibold text-gray-900 text-base truncate">{user?.name}</h4>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
      </div>

      {/* মেনু অপশনসমূহ */}
      <div className="py-2 space-y-1">       
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors font-medium"
        >
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </Link>
      </div>

      {/* লগআউট */}
      <div className="pt-2 border-t border-gray-100">
        <button
          onClick={() => {
            onClose();
            if (onLogout) onLogout();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}