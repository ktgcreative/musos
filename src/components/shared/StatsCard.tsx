type StatsCardProps = {
    title: string;
    value: string;
    subtext: string;
    icon: React.ReactNode;
    gradientFrom: string;
    gradientTo: string;
    subtextColor?: string;
};

export default function StatsCard({
    title,
    value,
    subtext,
    icon,
    gradientFrom,
    gradientTo,
    subtextColor = 'text-[#b3b3b3]'
}: StatsCardProps) {
    return (
        <div className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-2xl p-6 backdrop-blur-sm border border-white/5`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#b3b3b3]">{title}</h3>
                {icon}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className={`text-sm ${subtextColor}`}>{subtext}</p>
        </div>
    );
} 