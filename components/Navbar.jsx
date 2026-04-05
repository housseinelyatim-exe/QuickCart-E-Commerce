"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { BagIcon, BoxIcon, CartIcon } from "../assets/assets";

// Simple inline SVG icon for "Home" menu item (replaces importing the full Home page component)
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);

const Navbar = () => {
    const { isSeller, router, user } = useAppContext();
    const { openSignIn } = useClerk();

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
            <Image
                className="cursor-pointer w-28 md:w-32"
                onClick={() => router.push("/")}
                src={assets.logo}
                alt="logo"
            />
            <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                <Link href="/" className="hover:text-gray-900 transition">
                    Home
                </Link>
                <Link href="/all-products" className="hover:text-gray-900 transition">
                    Shop
                </Link>
                <Link href="/" className="hover:text-gray-900 transition">
                    About Us
                </Link>
                <Link href="/" className="hover:text-gray-900 transition">
                    Contact
                </Link>
                {isSeller && (
                    <button
                        onClick={() => router.push("/seller")}
                        className="text-xs border px-4 py-1.5 rounded-full"
                    >
                        Seller Dashboard
                    </button>
                )}
            </div>

            <ul className="hidden md:flex items-center gap-4">
                <Image
                    className="w-4 h-4"
                    src={assets.search_icon}
                    alt="search icon"
                />
                {user ? (
                    <>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label={"Home"}
                                    labelIcon={<HomeIcon />}
                                    onClick={() => router.push("/")}
                                />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label={"Products"}
                                    labelIcon={<BoxIcon />}
                                    onClick={() => router.push("/all-products")}
                                />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label={"Cart"}
                                    labelIcon={<CartIcon />}
                                    onClick={() => router.push("/cart")}
                                />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label={"My Orders"}
                                    labelIcon={<BagIcon />}
                                    onClick={() => router.push("/my-orders")}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="flex items-center gap-2 hover:text-gray-900 transition"
                    >
                        <Image src={assets.user_icon} alt="user icon" />
                        Account
                    </button>
                )}
            </ul>

            <div className="flex items-center md:hidden gap-3">
                {isSeller && (
                    <button
                        onClick={() => router.push("/seller")}
                        className="text-xs border px-4 py-1.5 rounded-full"
                    >
                        Seller Dashboard
                    </button>
                )}
                <button
                    onClick={openSignIn}
                    className="flex items-center gap-2 hover:text-gray-900 transition"
                >
                    <Image src={assets.user_icon} alt="user icon" />
                    Account
                </button>
            </div>
        </nav>
    );
};

export default Navbar;