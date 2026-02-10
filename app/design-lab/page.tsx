import Link from 'next/link';
import React from 'react';

export default function DesignLabIndex() {
    const labs = [
        { title: "Antigravity", path: "/design-lab/anti-gravity", desc: "System Governance & Tracking" },
        { title: "Components", path: "/design-lab/components", desc: "Atomic Design System" },
        { title: "Motion", path: "/design-lab/motion", desc: "Animation Studies" },
        { title: "Typography", path: "/design-lab/typography", desc: "Type Scale & Fonts" },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-12 font-mono">
            <h1 className="text-4xl mb-12 border-b border-white/10 pb-4">FrankX Design Lab</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {labs.map((lab) => (
                    <Link href={lab.path} key={lab.path} className="block group">
                        <div className="h-full p-6 rounded-xl border border-white/10 hover:border-purple-500 hover:bg-white/5 transition duration-300">
                            <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition">{lab.title}</h2>
                            <p className="text-sm text-neutral-400">{lab.desc}</p>
                            <div className="mt-4 text-xs text-neutral-600 group-hover:text-purple-500 transition">Enter Lab &rarr;</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
