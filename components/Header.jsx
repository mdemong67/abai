'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Events', href: '#events' },
        { label: 'Community', href: '#community' },
        { label: 'Contact', href: '#contact' },
    ];
    return (<motion.header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <nav className="px-4 sm:px-6 lg:px-8 border border-blue-600">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/abai-logo.png" alt="ABAI Logo" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" priority/>
              <span className="hidden sm:inline font-bold text-sm sm:text-lg text-[#6B1C23]">
                ABAI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (<motion.a key={item.label} href={item.href} className="text-gray-700 font-medium hover:text-[#6B1C23] transition-colors text-sm lg:text-base" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                {item.label}
              </motion.a>))}
            <motion.button className="px-6 py-2 bg-[#6B1C23] text-white rounded-lg font-semibold hover:bg-[#8B2C33] transition-colors text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Join Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }}>
            {isOpen ? (<FiX className="w-6 h-6 text-[#6B1C23]"/>) : (<FiMenu className="w-6 h-6 text-[#6B1C23]"/>)}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div className="md:hidden overflow-hidden" animate={{ height: isOpen ? 'auto' : 0 }} transition={{ duration: 0.3 }}>
          <div className="px-2 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (<motion.a key={item.label} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm" onClick={() => setIsOpen(false)} whileHover={{ x: 8 }}>
                {item.label}
              </motion.a>))}
            <motion.button className="w-full px-4 py-2 bg-[#6B1C23] text-white rounded-lg font-semibold text-sm mt-2" onClick={() => setIsOpen(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Join Us
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </motion.header>);
}
