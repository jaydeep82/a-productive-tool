"use client"
import { useState, useEffect } from "react"

/**
 * Simple command palette that opens on Cmd+K (or Ctrl+K) and displays a list of navigation links.
 * For demo purposes it includes Home, Dashboard, Settings.
 */
export default function CommandPalette() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen(prev => !prev)
            }
            if (e.key === "Escape") {
                setOpen(false)
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    if (!open) return null
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 w-80 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Command Palette</h2>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                    <li><a href="/settings" className="hover:underline">Settings</a></li>
                </ul>
            </div>
        </div>
    )
}
