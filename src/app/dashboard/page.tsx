import { mockMetrics } from '@/modules/analytics/entities/Metric';
import { MetricCard } from '@/modules/analytics/components/MetricCard';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back. Here is your productivity overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockMetrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                ))}
            </div>

            <div className="p-8 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center gap-4 py-20">
                <div className="text-lg font-medium">No active tasks found</div>
                <p className="text-muted-foreground max-w-sm">
                    Integrate your calendar or task manager to see your daily schedule here.
                </p>
            </div>
        </div>
    );
}
