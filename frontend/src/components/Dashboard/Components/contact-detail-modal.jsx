"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Building, Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { useLanguage } from "../../../context/LanguageContext"

export function ContactDetailModal({ isOpen, contact, onClose }) {
  const { t } = useLanguage();
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!contact) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-900 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">{t("dashboard.modal.title")}</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00] text-xl md:text-2xl font-medium mx-auto md:mx-0">
                    {contact.firstName.charAt(0)}
                    {contact.lastName.charAt(0)}
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-gray-500 mb-3">{contact.company}</p>

                    <div className="flex items-center text-gray-600 mb-2 justify-center md:justify-start">
                      <Mail size={16} className="mr-2" />
                      <a href={`mailto:${contact.email}`} className="text-[#FF8A00] hover:underline">
                        {contact.email}
                      </a>
                    </div>

                    <div className="flex items-center text-gray-600 justify-center md:justify-start">
                      <Calendar size={16} className="mr-2" />
                      <span>{t("dashboard.modal.submittedOn", format(new Date(contact.createdAt), "MMMM d, yyyy 'at' h:mm a"))}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">{t("dashboard.modal.message")}</h4>
                  <p className="text-gray-600 whitespace-pre-line">{contact.description}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">{t("dashboard.modal.additionalInfo")}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <User size={16} className="mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">{t("dashboard.modal.fullName")}</p>
                        <p className="text-gray-700">
                          {contact.firstName} {contact.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building size={16} className="mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">{t("dashboard.modal.company")}</p>
                        <p className="text-gray-700">{contact.company}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail size={16} className="mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">{t("dashboard.modal.email")}</p>
                        <p className="text-gray-700">{contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Calendar size={16} className="mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">{t("dashboard.modal.submissionDate")}</p>
                        <p className="text-gray-700">{format(new Date(contact.createdAt), "PPP")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-4 md:p-6 border-t">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  {t("dashboard.modal.close")}
                </button>
                <button className="px-3 py-1.5 md:px-4 md:py-2 bg-[#FF8A00] text-white rounded-lg hover:bg-[#FF8A00]/90">
                  {t("dashboard.modal.markHandled")}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
