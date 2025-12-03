'use client'

import { useEffect, useState, useRef } from 'react'

interface LocalStorageTextareaProps {
    storageKey: string
    placeholder?: string
    label?: string
    className?: string
    prefill?: string
}

export default function LocalStorageTextarea({
    storageKey,
    placeholder,
    label,
    className = '',
    prefill
}: LocalStorageTextareaProps) {
    const [value, setValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fullKey = `workshop.v1.${storageKey}`

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(fullKey)
        if (saved) {
            setValue(saved)
        }
    }, [fullKey])

    // Handle prefill updates (e.g. from "Load Example" button)
    useEffect(() => {
        if (prefill !== undefined && prefill !== value) {
            // Only update if prefill is different (and not just empty string vs undefined)
            // This is a bit tricky, usually we want to respect user input.
            // But if the parent explicitly passes a new prefill string (triggered by a button), we should use it.
            // For now, we'll rely on the parent to manage the "prefill" prop change or use a custom event.
            // Actually, a better pattern for "Load Example" is to expose a method or use a context, 
            // but to keep it simple, we'll listen for a custom window event or just let the parent force it via key change?
            // Let's stick to the simple "listen to prop" but be careful not to overwrite user typing.
            // A safer way: The parent component will handle the "Load Example" logic by writing to localStorage directly
            // and then dispatching a storage event or forcing a re-render.
            // Let's implement a storage event listener.
        }
    }, [prefill])

    // Listen for storage events (to sync across tabs or when parent updates LS)
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === fullKey && e.newValue !== null) {
                setValue(e.newValue)
            }
        }

        // Custom event for same-tab updates
        const handleCustomUpdate = (e: CustomEvent) => {
            if (e.detail.key === fullKey) {
                setValue(e.detail.value)
            }
        }

        window.addEventListener('storage', handleStorage)
        window.addEventListener('local-storage-update', handleCustomUpdate as EventListener)

        return () => {
            window.removeEventListener('storage', handleStorage)
            window.removeEventListener('local-storage-update', handleCustomUpdate as EventListener)
        }
    }, [fullKey])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value
        setValue(newVal)
        localStorage.setItem(fullKey, newVal)

        // Auto-resize
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }

    // Auto-resize on value change
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [value])

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="font-semibold text-slate-200">{label}</label>}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full min-h-[120px] rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
        </div>
    )
}
