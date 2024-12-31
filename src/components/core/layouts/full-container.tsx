import React from "react";

export default function FullContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen">
            {children}
        </div>
    );
}
