"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

export default function RentModal() {
    const rentModal = useRentModal();

    return (
        <Modal
            title="Airbnb your home"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            actionLabel="Submit"
            onSubmit={rentModal.onClose}
        />
    );
}
