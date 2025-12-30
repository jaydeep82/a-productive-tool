'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

// Define the shape of the data points
interface DataPoint {
  name: string;
  tasks_completed: number;
  focus_hours: number;
}

// Sample data for the chart
const data: DataPoint[] = [
  { name: 'Mon', tasks_completed: 4, focus_hours: 3.5 },
  { name: 'Tue', tasks_completed: 7, focus_hours: 5.1 },
  { name: 'Wed', tasks_completed: 6, focus_hours: 4.8 },
  { name: 'Thu', tasks_completed: 10, focus_hours: 6.2 },
  { name: 'Fri', tasks_completed: 5, focus_hours: 4.0 },
  { name: 'Sat', tasks_completed: 2, focus_hours: 1.5 },
  { name: 'Sun', tasks_completed: 1, focus_hours: 0.8 },
];

/**
 * Custom Tooltip component for enhanced hover visualization.
 * @param active - Whether the tooltip is currently active (hovering)
 * @param payload - The data series for the hovered point
 * @param label - The data key label (e.g., 'Mon', 'Tue')
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-card/90 border border-border shadow-xl rounded-lg backdrop-blur-sm text-sm transition-all duration-150">
        <p className="font-semibold mb-1 text-foreground">{`Day: ${label}`}</p>
        {payload.map((item: any) => (
          <p key={item.name} style={{ color: item.stroke || 'currentColor' }}>
            {`${item.name}: `}
            <span className="font-medium text-foreground ml-1">{item.value} {item.unit}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Renders a responsive line chart showing weekly productivity metrics.
 */
export function ProductivityChart() {
  // Use CSS variables for chart colors to ensure theme consistency (Tailwind/Shadcn approach)
  const primaryColor = 'hsl(var(--primary))';
  const accentColor = 'hsl(var(--accent-foreground))';
  const mutedForeground = 'hsl(var(--muted-foreground))';
  const borderColor = 'hsl(var(--border))';

  return (
    <div className="w-full h-96 bg-card rounded-2xl p-6 border border-border shadow-lg">
      <h4 className="text-xl font-semibold mb-6 text-foreground">Weekly Productivity Overview</h4>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }} // Adjusted left margin for smaller screens
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke={borderColor} /> 
          
          {/* XAxis showing days */}
          <XAxis 
            dataKey="name" 
            stroke={mutedForeground} 
            padding={{ left: 10, right: 10 }} 
          />
          
          {/* YAxis for Tasks Completed (Left) */}
          <YAxis 
            yAxisId="left" 
            stroke={mutedForeground} 
            tickCount={5}
          />
          
          {/* YAxis for Focus Hours (Right) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke={mutedForeground} 
            domain={[0, 7]}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '14px' }} />

          {/* Line 1: Tasks Completed */}
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="tasks_completed" 
            stroke={primaryColor} 
            activeDot={{ r: 8, strokeWidth: 2 }} 
            name="Tasks Completed"
            unit=""
            strokeWidth={2}
          />

          {/* Line 2: Focus Hours */}
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="focus_hours" 
            stroke={accentColor} 
            activeDot={{ r: 8, strokeWidth: 2 }} 
            name="Focus Hours"
            unit="hrs"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
