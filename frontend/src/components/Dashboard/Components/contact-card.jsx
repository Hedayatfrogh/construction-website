"use client"

import { motion } from "framer-motion"
import { Mail, MailOpen, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ContactCard({ contact, onClick }) {
  const { firstName, lastName, email, company, createdAt, isRead } = contact

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer border-l-4 ${
        isRead ? "border-gray-200" : "border-[#FF8A00]"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
        </div>
        <div className="text-gray-400">
          {isRead ? <MailOpen size={18} /> : <Mail size={18} className="text-[#FF8A00]" />}
        </div>
      </div>

      <p className="text-sm text-gray-600 truncate mb-3">{email}</p>

      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={14} className="mr-1" />
        <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
      </div>
    </motion.div>
  )
}
