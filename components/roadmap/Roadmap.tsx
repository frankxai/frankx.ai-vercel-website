'use client'

import { useState, useEffect } from 'react'
import roadmap from '@/data/specs-roadmap.json'
import { clsx } from 'clsx'

export default function Roadmap() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-heading-1 font-bold text-white">Roadmap</h1>
        <p className="mt-4 text-body text-neutral-400">{roadmap.vision}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Pillars</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {roadmap.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-heading-5 font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-body-sm text-neutral-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Milestones</h2>
        <div className="mt-6 space-y-8">
          {roadmap.milestones.map((milestone) => (
            <div key={milestone.quarter} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-heading-5 font-semibold text-white">{milestone.quarter}</h3>
              <p className="mt-2 text-body-sm text-neutral-400">{milestone.focus}</p>
              <ul className="mt-4 space-y-2">
                {milestone.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start">
                    <span className="text-primary-400 mr-2">&#10003;</span>
                    <span className="text-body-sm text-neutral-400">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Rituals</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {roadmap.rituals.map((ritual) => (
            <div key={ritual.name} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-heading-5 font-semibold text-white">{ritual.name}</h3>
              <p className="mt-2 text-body-sm text-neutral-400">{ritual.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <span>{ritual.cadence}</span>
                <span>{ritual.owner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Signals</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {roadmap.signals.map((signal) => (
            <div key={signal.name} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-heading-5 font-semibold text-white">{signal.name}</h3>
              <p className="mt-2 text-body-sm text-neutral-400">{signal.metric}</p>
              <p className="mt-2 text-body-sm text-neutral-400">{signal.target}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Next Actions</h2>
        <div className="mt-6 space-y-4">
          {roadmap.nextActions.map((action) => (
            <div key={action.title} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-heading-5 font-semibold text-white">{action.title}</h3>
              <p className="mt-2 text-body-sm text-neutral-400">{action.note}</p>
              <div className="mt-4">
                <span
                  className={clsx(
                    'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                    action.status === 'blocked' && 'bg-error-500 text-white',
                    action.status === 'in-progress' && 'bg-warning-500 text-white',
                    action.status === 'shipping' && 'bg-success-500 text-white',
                    action.status === 'done' && 'bg-success-500 text-white'
                  )}
                >
                  {action.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
