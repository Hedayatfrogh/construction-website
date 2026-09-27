"use client"

import { motion } from "framer-motion"
import { Inbox, Search } from "lucide-react"

export function EmptyState({ searchQuery = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center"
    >
      {searchQuery ? (
        <>
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="text-gray-400" size={20} />
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">No results found</h3>
          <p className="text-sm md:text-base text-gray-500 max-w-md">
            We couldn't find any contacts matching "{searchQuery}". Try adjusting your search terms.
          </p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Inbox className="text-gray-400" size={20} />
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">Your inbox is empty</h3>
          <p className="text-sm md:text-base text-gray-500 max-w-md">
            When you receive new contact form submissions, they will appear here.
          </p>
        </>
      )}
    </motion.div>
  )
}
