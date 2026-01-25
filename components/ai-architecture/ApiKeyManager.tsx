'use client'

import { useState, useCallback, useMemo, useSyncExternalStore } from 'react'
import { Key, Eye, EyeOff, Check, X, ExternalLink, AlertCircle } from 'lucide-react'
import { AI_PROVIDER_META } from '@/types/ai-architecture'
import type { AIProvider } from '@/types/ai-architecture'

const API_KEY_STORAGE_PREFIX = 'frankx_hub_'
const ALL_PROVIDERS: AIProvider[] = ['anthropic', 'openai', 'google', 'oci']

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function emitStorageChange() {
  window.dispatchEvent(new Event('storage'))
}

interface ApiKeyManagerProps {
  providers?: AIProvider[]
  selectedProvider?: AIProvider
  onProviderChange?: (provider: AIProvider) => void
  onKeyChange?: (provider: AIProvider, key: string | null) => void
  compact?: boolean
}

export function useApiKey(provider: AIProvider) {
  const storageKey = `${API_KEY_STORAGE_PREFIX}${provider}`

  const key = useSyncExternalStore(
    subscribeStorage,
    () => localStorage.getItem(storageKey),
    () => null
  )

  const saveKey = useCallback((newKey: string) => {
    localStorage.setItem(`${API_KEY_STORAGE_PREFIX}${provider}`, newKey)
    emitStorageChange()
  }, [provider])

  const clearKey = useCallback(() => {
    localStorage.removeItem(`${API_KEY_STORAGE_PREFIX}${provider}`)
    emitStorageChange()
  }, [provider])

  return { key, saveKey, clearKey, isLoaded: true }
}

export function useAllApiKeys() {
  const anthropic = useSyncExternalStore(subscribeStorage, () => localStorage.getItem(`${API_KEY_STORAGE_PREFIX}anthropic`), () => null)
  const openai = useSyncExternalStore(subscribeStorage, () => localStorage.getItem(`${API_KEY_STORAGE_PREFIX}openai`), () => null)
  const google = useSyncExternalStore(subscribeStorage, () => localStorage.getItem(`${API_KEY_STORAGE_PREFIX}google`), () => null)
  const oci = useSyncExternalStore(subscribeStorage, () => localStorage.getItem(`${API_KEY_STORAGE_PREFIX}oci`), () => null)

  const keys: Record<AIProvider, string | null> = useMemo(
    () => ({ anthropic, openai, google, oci }),
    [anthropic, openai, google, oci]
  )

  const saveKey = useCallback((provider: AIProvider, key: string) => {
    localStorage.setItem(`${API_KEY_STORAGE_PREFIX}${provider}`, key)
    emitStorageChange()
  }, [])

  const clearKey = useCallback((provider: AIProvider) => {
    localStorage.removeItem(`${API_KEY_STORAGE_PREFIX}${provider}`)
    emitStorageChange()
  }, [])

  const clearAll = useCallback(() => {
    ALL_PROVIDERS.forEach(p => {
      localStorage.removeItem(`${API_KEY_STORAGE_PREFIX}${p}`)
    })
    emitStorageChange()
  }, [])

  return { keys, saveKey, clearKey, clearAll, isLoaded: true }
}

function KeyInput({
  provider,
  onSave,
  onClear,
  currentKey,
}: {
  provider: AIProvider
  onSave: (key: string) => void
  onClear: () => void
  currentKey: string | null
}) {
  const [inputValue, setInputValue] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isEditing, setIsEditing] = useState(!currentKey)
  const meta = AI_PROVIDER_META[provider]

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim())
      setInputValue('')
      setIsEditing(false)
    }
  }

  const handleClear = () => {
    onClear()
    setIsEditing(true)
    setInputValue('')
  }

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-400' },
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    red: { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400' },
  }
  const colors = colorMap[meta.color]

  if (!isEditing && currentKey) {
    return (
      <div className={`flex items-center justify-between rounded-lg border ${colors.border} ${colors.bg} p-3`}>
        <div className="flex items-center gap-2">
          <Check className={`h-4 w-4 ${colors.text}`} />
          <span className="text-sm text-white">{meta.name}</span>
          <span className="text-xs text-slate-500">
            {showKey ? currentKey : `••••••••${currentKey.slice(-4)}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1 text-slate-400 hover:text-white"
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-red-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">{meta.name}</label>
        <a
          href={meta.keyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 text-xs ${colors.text} hover:underline`}
        >
          Get API Key
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="flex gap-2">
        <input
          type={showKey ? 'text' : 'password'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Enter your ${meta.name} API key`}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-white/20 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        <button
          onClick={() => setShowKey(!showKey)}
          className="rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5 hover:text-white"
        >
          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <button
          onClick={handleSave}
          disabled={!inputValue.trim()}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${colors.bg} ${colors.text} hover:opacity-80`}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export function ApiKeyManager({
  providers = ['anthropic', 'openai', 'google', 'oci'],
  selectedProvider,
  onProviderChange,
  onKeyChange,
  compact = false,
}: ApiKeyManagerProps) {
  const { keys, saveKey, clearKey, isLoaded } = useAllApiKeys()

  const handleSave = (provider: AIProvider, key: string) => {
    saveKey(provider, key)
    onKeyChange?.(provider, key)
  }

  const handleClear = (provider: AIProvider) => {
    clearKey(provider)
    onKeyChange?.(provider, null)
  }

  if (!isLoaded) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-10 rounded bg-white/10" />
        </div>
      </div>
    )
  }

  const availableProviders = providers.filter(p => keys[p])

  if (compact) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Key className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-white">API Keys</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {providers.map((provider) => {
            const meta = AI_PROVIDER_META[provider]
            const hasKey = !!keys[provider]
            const isSelected = selectedProvider === provider

            return (
              <button
                key={provider}
                onClick={() => hasKey && onProviderChange?.(provider)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-all ${
                  isSelected
                    ? 'border-violet-500/50 bg-violet-500/20 text-violet-400'
                    : hasKey
                    ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                    : 'border-white/10 text-slate-500 cursor-not-allowed'
                }`}
                disabled={!hasKey}
              >
                {hasKey ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {meta.shortName}
              </button>
            )
          })}
        </div>
        {availableProviders.length === 0 && (
          <p className="mt-2 text-xs text-slate-500">
            Add an API key below to get started
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
          <Key className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-white">API Keys (BYOK)</h3>
          <p className="text-sm text-slate-400">
            Keys are stored in your browser only. Never sent to our servers.
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-xs text-amber-200/80">
          Your API keys are stored in localStorage and used only for API calls during your session.
          We recommend using API keys with spending limits set in your provider dashboard.
        </p>
      </div>

      <div className="space-y-4">
        {providers.map((provider) => (
          <KeyInput
            key={provider}
            provider={provider}
            onSave={(key) => handleSave(provider, key)}
            onClear={() => handleClear(provider)}
            currentKey={keys[provider]}
          />
        ))}
      </div>
    </div>
  )
}

export default ApiKeyManager
