import { ProductivityMetric } from '../entities/Metric';

export function MetricCard({ metric }: { metric: ProductivityMetric }) {
    const isPositive = metric.trend >= 0;

    return (
        <div className="p-6 rounded-xl border border-border bg-card glass">
            <div className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</div>
            <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">
                    {metric.value}
                    <span className="text-lg font-normal text-muted-foreground ml-1">{metric.unit}</span>
                </div>
                <div className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{metric.trend}%
                </div>
            </div>
        </div>
    );
}
