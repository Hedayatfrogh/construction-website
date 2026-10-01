"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { DashboardSidebar } from "./Components/dashboard-sidebar";
import { ContactCard } from "./Components/contact-card";
import { ContactDetailModal } from "./Components/contact-detail-modal";
import { EmptyState } from "./Components/empty-state";

export default function Dashboard() {
  const { api } = useAuth();
  const { t } = useLanguage();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const websiteId = "azad_noori";
      try {
        const res = await api.get(`/messages/${websiteId}`);
        setContacts(
          res.data.data?.map((contact) => ({
            ...contact,
            id: contact.id,
          })) || []
        );
        setError(null);
      } catch (error) {
        setError(t("dashboard.failedToLoad"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const handleOpenContact = async (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);

    if (!contact.isRead) {
      try {
        await api.patch(`/messages/${contact.id}`, { isRead: true });
        const updatedContacts = contacts.map((c) =>
          c.id === contact.id ? { ...c, isRead: true } : c
        );
        setContacts(updatedContacts);
      } catch (error) {
        alert(t("dashboard.failedToMarkRead"));
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.firstName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.lastName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.company || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = contacts.filter((contact) => !contact.isRead).length;

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar unreadCount={unreadCount} />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0"
            >
              {t("dashboard.title")}
              {unreadCount > 0 && (
                <span className="ml-2 bg-[#FF8A00] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {t("dashboard.newBadge", unreadCount)}
                </span>
              )}
            </motion.h1>

            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder={t("dashboard.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <svg
                className="animate-spin h-8 w-8 text-[#FF8A00] mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600 mt-2">{t("dashboard.loading")}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#FF8A00] text-white rounded-lg"
              >
                {t("dashboard.retry")}
              </button>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredContacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ContactCard
                      contact={contact}
                      onClick={() => handleOpenContact(contact)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState searchQuery={searchQuery} />
          )}
        </div>
      </main>

      <ContactDetailModal
        isOpen={isModalOpen}
        contact={selectedContact}
        onClose={handleCloseModal}
      />
    </div>
  );
}
