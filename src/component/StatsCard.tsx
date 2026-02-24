import { Icon } from '@iconify/react';
import React from 'react'

const StatCard = ({ title, amount, trend, color, icon }: any) => (
    <div
        className={`bg-[#ffff] p-8 rounded-2xl border-l-4 shadow-xl relative group`}
        style={{ borderColor: color }}
    >
        <div className="flex justify-between items-start mb-6">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
                {title}
            </p>
            <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${color}1A`, color: color }}
            >
                <Icon icon={icon} className="text-2xl" />
            </div>
        </div>
        <p className="text-[#856671] text-4xl font-black mb-2 tracking-tight">
            {amount}
        </p>
        <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color }}
        >
            {trend}
        </p>
    </div>
);

export default StatCard;