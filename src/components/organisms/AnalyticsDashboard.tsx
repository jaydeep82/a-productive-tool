import { BarChart2, Clock, CheckCircle } from 'lucide-react';
import { ProductivityChart } from '@/components/molecules/ProductivityChart';

// Metric Card Component
function MetricCard({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: string, unit: string }) {
    return (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-lg flex items-center justify-between transition-all duration-300 hover:shadow-2xl">
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                <div className="text-4xl font-extrabold tracking-tight text-foreground">
                    {value}
                    <span className="text-xl font-normal text-muted-foreground ml-1">{unit}</span>
                </div>
            </div>
            {/* Decorative icon wrapper */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                {icon}
            </div>
        </div>
    );
}

/**
 * Organism component displaying key productivity metrics and charts.
 */
export function AnalyticsDashboard() {
    return (
        <section className="flex flex-col gap-10 pt-16" aria-labelledby="analytics-heading">
            <header className="flex flex-col gap-3">
                <BarChart2 size={36} className="text-primary" aria-hidden="true" />
                <h2 id="analytics-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
                    Productivity Analytics
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Visualize your performance across key metrics this week. Data is automatically refreshed hourly to ensure precision.
                </p>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard 
                    icon={<CheckCircle size={22} />}
                    title="Tasks Completed (7D)"
                    value="34"
                    unit="total"
                />
                <MetricCard 
                    icon={<Clock size={22} />}
                    title="Total Focused Time (7D)"
                    value="25.6"
                    unit="hrs"
                />
                <MetricCard 
                    icon={<BarChart2 size={22} />}
                    title="Productivity Score"
                    value="8.5"
                    unit="/10"
                />
            </div>

            {/* Chart Area */}
            <div className="grid grid-cols-1 gap-6">
                <ProductivityChart />
            </div>
        </section>
    );
}
