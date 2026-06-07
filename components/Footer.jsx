'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
export default function Footer() {
    const footerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (<footer className="bg-[#1A1815] text-white">
      {/* Main Footer Content */}
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={footerVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center sm:items-start">
            <Image src="/images/abai-logo.png" alt="ABAI Logo" width={60} height={60} className="w-14 h-14 mb-4"/>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">ABAI</h3>
            <p className="text-gray-300 text-sm text-center sm:text-left">
              All Bangladeshi Association of Ireland
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 border-b border-[#D4AF37] pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {[
            { label: 'About Us', href: '#about' },
            { label: 'Events', href: '#events' },
            { label: 'Community', href: '#community' },
            { label: 'Blog', href: '#blog' },
        ].map((link) => (<li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 border-b border-[#D4AF37] pb-2">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <FiMapPin className="w-4 h-4 flex-shrink-0"/>
                <span>Dublin, Ireland</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiPhone className="w-4 h-4 flex-shrink-0"/>
                <a href="tel:+353123456789" className="hover:text-[#D4AF37] transition-colors">
                  +353 1 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiMail className="w-4 h-4 flex-shrink-0"/>
                <a href="mailto:info@abai.ie" className="hover:text-[#D4AF37] transition-colors">
                  info@abai.ie
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-4 border-b border-[#D4AF37] pb-2">Follow Us</h4>
            <div className="flex gap-4">
              {[
            { icon: FiFacebook, label: 'Facebook', href: '#' },
            { icon: FiTwitter, label: 'Twitter', href: '#' },
            { icon: FiMail, label: 'Email', href: '#' },
        ].map((social) => {
            const Icon = social.icon;
            return (<motion.a key={social.label} href={social.href} className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#1A1815] transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label={social.label}>
                    <Icon className="w-5 h-5"/>
                  </motion.a>);
        })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-white/10"/>

      {/* Bottom Footer */}
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-300 text-xs sm:text-sm">
          <p>
            &copy; 2024 All Bangladeshi Association of Ireland. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>);
}
