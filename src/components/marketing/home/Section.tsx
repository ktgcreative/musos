type SectionProps = {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
};

export default function Section({ children, className = "", containerClassName = "" }: SectionProps) {
    return (
        <section className={`py-24 px-4 relative ${className}`}>
            <div className={`max-w-7xl mx-auto relative z-10 ${containerClassName}`}>
                {children}
            </div>
            {/* Consistent gradient overlay for sections */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/10" />
        </section>
    );
} 