"use client";
import { useState, useEffect } from "react";

/**
 * Simple toast component. Renders a message and disappears after a short timeout.
 * The `message` prop is optional – a default placeholder is shown if omitted.
 */
export default function Toast({ message = "Notification" }: { message?: string }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
        </div>
    );
}
