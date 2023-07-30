import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import AuthProvider from "./components/providers/AuthProvider";
import RentModal from "./components/modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone using nextjs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <RegisterModal />
                <LoginModal />
                <RentModal />
                <AuthProvider>
                    <Navbar />
                </AuthProvider>
                {children}
            </body>
        </html>
    );
}
