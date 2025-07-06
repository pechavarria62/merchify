'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Shop", href: "/shop" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export default function Topmenu() {
	const pathname = usePathname();

	return (
		<nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					{/* Replace with your logo image if you have one */}
					<span className="font-extrabold text-xl tracking-tight text-gray-900">
						Merchify
					</span>
				</Link>

				{/* Navigation Links */}
				<div className="flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`text-gray-800 hover:text-blue-600 transition font-medium ${
								pathname === link.href ? "underline underline-offset-4" : ""
							}`}
						>
							{link.name}
						</Link>
					))}
				</div>

				{/* Icons */}
				<div className="flex items-center gap-4">
					<Link
						href="/search"
						className="text-gray-700 hover:text-blue-600 transition"
					>
						<FaSearch size={20} />
					</Link>
					<Link
						href="/cart"
						className="text-gray-700 hover:text-blue-600 transition"
					>
						<FaShoppingBasket size={22} />
					</Link>
				</div>
			</div>
		</nav>
	);
}