'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, User, Briefcase, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  onPrint?: () => void
}

const MobileMenu = ({ onPrint }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: User, label: '个人信息', href: '#intro' },
    { icon: Briefcase, label: '工作经验', href: '#experience' },
    { icon: Award, label: '技能评价', href: '#skills' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.div
        className="fixed top-4 left-4 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 md:hidden"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">菜单</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <nav className="space-y-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.href}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => scrollToSection(item.href)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800 font-medium">{item.label}</span>
                      </motion.button>
                    )
                  })}
                </nav>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      onPrint?.()
                      setIsOpen(false)
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    打印简历
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu