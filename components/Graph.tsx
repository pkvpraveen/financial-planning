import { Card, CardHeader } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import planner from '../src/planner';
interface Props {
  data: Array<{ name: any;[key: string]: any }>;
  title: string;
  lines: Array<{key: string; color: string}>;
}
export default function Graph({ data, title, lines }: Props) {
  return <Card elevation={0}>
    <CardHeader title={title} />
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval="preserveStartEnd" />
        <YAxis mirror tickFormatter={value => `${planner.formatToString(value)}`}  interval="preserveStartEnd"/>
        <Tooltip formatter={(value: number)=> `${planner.formatToString(value)}`} />
        {lines.map((line) => <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} activeDot={{ r: 8 }} />)}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </Card>;
}