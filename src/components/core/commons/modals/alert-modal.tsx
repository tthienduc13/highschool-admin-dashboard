"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Credenza open={isOpen} onOpenChange={onClose}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Are you sure?</CredenzaTitle>
                    <CredenzaDescription>
                        This action cannot be undone.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaFooter>
                    <Button
                        disabled={loading}
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Continue
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
