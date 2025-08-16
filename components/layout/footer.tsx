import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Truck, Shield, Headphones } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold text-white">Winjhen Shop</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for quality electronics, accessories, and gaming products. 
              Serving both retail customers and resellers with competitive pricing and excellent service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>support@winjhenshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>Manila, Philippines</span>
              </div>
            </div>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="hover:text-orange-400 transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="hover:text-orange-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/size-guide" className="hover:text-orange-400 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/help/track-order" className="hover:text-orange-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Reseller Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Reseller Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/reseller/catalog" className="hover:text-orange-400 transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/reseller/bulk-orders" className="hover:text-orange-400 transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/reseller/wholesale-pricing" className="hover:text-orange-400 transition-colors">
                  Wholesale Pricing
                </Link>
              </li>
              <li>
                <Link href="/reseller/credit-application" className="hover:text-orange-400 transition-colors">
                  Credit Application
                </Link>
              </li>
              <li>
                <Link href="/reseller/support" className="hover:text-orange-400 transition-colors">
                  Reseller Support
                </Link>
              </li>
              <li>
                <Link href="/reseller/partnership" className="hover:text-orange-400 transition-colors">
                  Partnership Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company & Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-orange-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-orange-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-orange-400 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm">Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CreditCard className="h-5 w-5 text-purple-500" />
                <span className="text-sm">Multiple Payment Options</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Headphones className="h-5 w-5 text-orange-500" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Winjhen Shop. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ in Philippines</span>
              <span>•</span>
              <span>ISO 9001:2015 Certified</span>
              <span>•</span>
              <span>DTI Registered Business</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
