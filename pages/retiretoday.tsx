import { Button, Card, CardHeader, Container, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "../src/Link";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from "../components/Layout";
import planner from "../src/planner";
import Head from "next/head";


export default function RetireToday() {
  const [age, setAge] = useState('30');
  const [expense, setExpense] = useState('25000');
  const ages = [];
  for (let i = 18; i < 71; i++) {
    ages.push(i);
  }
  const { savings, ageArray, contrubutions, expenseWithInflation } = planner.getFinancialPlan(85, parseInt(age || '0'), parseInt(expense || '0'), 0, parseInt(age || '0'), 0);
  const data = [{
    name: +age - 1,
    savings: 0,
    'Yearly Expense With Inflation': 0
  }, ...ageArray.filter(a => a % 5 === 0).map(a => ({
    name: a,
    savings: planner.toLakhs(savings.get(a) || 0),
    'Yearly Expense With Inflation': planner.toLakhs(expenseWithInflation.get(a)||0)
  }))];

  return <Layout>
    <Head>
      <title>Retire today</title>
    </Head>
    <Container maxWidth="md" sx={{ mt: 4, p: 4 }}>
      <Stack direction="column" spacing={8}>
        <Box><Typography variant="subtitle1">Check where your are in the journey to financial freedom</Typography></Box>
        <Box>
          <Typography>Please select your age</Typography>
          <FormControl variant="standard" fullWidth>
            <Select
              value={age}
              label="Age"
              variant="standard"
              onChange={e => setAge(e.target.value)}
            >
              {ages.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography>My expense per month is</Typography>
          <TextField
            variant="standard"
            value={expense}
            fullWidth
            onChange={e => setExpense(e.target.value)} />
        </Box>
        <Typography variant="h4">If you have {planner.formatToString(savings.get(+age) || 0)}. You can retire today.</Typography>
        <Card elevation={0}>
          <CardHeader title="Here is how your savings will last over the years" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis mirror tickFormatter={value => `${value} Lac`}/>
              <Tooltip formatter={(value: any) => `${value} Lac`} />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Yearly Expense With Inflation" stroke="#ff0000" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Box>
          <Typography>Do not have that much now? Don't worry. Lets find out when can you stop working if you start saving today.</Typography>
        </Box>
        <Box>
          <Button variant="contained" LinkComponent={Link} href="/financialplanner">Plan my financial freedom</Button>
        </Box>
      </Stack>
    </Container>
  </Layout>;
}