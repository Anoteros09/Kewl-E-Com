import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-neutral1 h-16">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link className="text-white text-2xl" href="/">
          KEWL<span className="text-base">.com</span>
        </Link>
        <ul className="flex">
          <Link href="/" className="mr-4">
            <li className="text-white mr-4">Home</li>
          </Link>
          <Link href="/order" className="mr-4">
            <li className="text-white mr-4">Order</li>
          </Link>
          <Link href="/contact-us" className="mr-4">
            <li className="text-white mr-4">Contact Us</li>
          </Link>
          <Link href="/profile" className="mr-4">
            <li className="text-white mr-4">Profile</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
