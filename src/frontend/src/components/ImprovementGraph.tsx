import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MockTest } from '../backend';
import { formatDate } from '../utils/dateUtils';

interface ImprovementGraphProps {
  data: MockTest[];
}

export default function ImprovementGraph({ data }: ImprovementGraphProps) {
  const chartData = data.map((test) => ({
    name: test.name,
    date: formatDate(test.date),
    score: Number(test.score),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs" />
        <YAxis domain={[0, 100]} className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
