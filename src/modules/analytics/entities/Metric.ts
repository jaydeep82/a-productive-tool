export interface ProductivityMetric {
    id: string;
    label: string;
    value: number;
    trend: number; // percentage
    unit: string;
}

export const mockMetrics: ProductivityMetric[] = [
    { id: '1', label: 'Tasks Completed', value: 24, trend: 12, unit: '' },
    { id: '2', label: 'Efficiency Score', value: 92, trend: 5, unit: '%' },
    { id: '3', label: 'Focus Time', value: 6.5, trend: -2, unit: 'h' },
];
