import { Button, Card, CardHeader, Container, FormControl, MenuItem, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from "../components/Layout";
import planner from "../src/planner";


export default function FinancialPlanner() {
  const [age, setAge] = useState('30');
  const [expense, setExpense] = useState('25000');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [yearlyIncrement, setYearlyIncrement] = useState(0);
  const [ageOfDeath, setAgeOfDeath] = useState(85);
  const [ageOfRetirement, setAgeOfRetirement] = useState(60);
  const ages = [];
  for (let i = 18; i < 71; i++) {
    ages.push(i);
  }
  const { savings, ageArray, contrubutions, expenseWithInflation } = planner.getFinancialPlan(ageOfDeath,
    parseInt(age || '0'),
    parseInt(expense || '0'),
    parseInt(initialInvestment || '0'),
    ageOfRetirement,
    yearlyIncrement);
  const data = ageArray.filter(a => a % 5 === 0).map(a => ({
    name: a,
    savings: planner.toLakhs(savings.get(a) || 0),
    'Yearly Expense With Inflation': planner.toLakhs(expenseWithInflation.get(a) || 0)
  }));

  return <Layout>
    <Head>
      <title>Financial Freedom Calculator</title>
    </Head>
    <Container maxWidth="md" sx={{ mt: 4, p: 4 }}>
      <Stack direction="column" spacing={8}>
        <Box><Typography variant="subtitle1">Let us find out how much you need to save</Typography></Box>
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
        <Box>
          <Typography>I have this much amount with me for my retirement</Typography>
          <TextField
            variant="standard"
            value={initialInvestment}
            fullWidth
            onChange={e => setInitialInvestment(e.target.value)} />
        </Box>
        <Typography variant="h4">You need to save {((contrubutions.get(+age) || 0) / 12).toFixed(0)} monthly to retire at the age of {ageOfRetirement} years.</Typography>
        
        <Box>
          <Typography gutterBottom>I can increase this every year by {yearlyIncrement}%</Typography>
          <Slider
            defaultValue={0}
            value={yearlyIncrement}
            onChange={(e, newValue: any) => setYearlyIncrement(newValue)}
            valueLabelDisplay="auto"
            step={1}
            marks={[{ value: 0, label: '0%' }, { value: 10, label: '10%' }]}
            min={0}
            max={10}
          />
        </Box>
        <Box>
          <Typography gutterBottom>I want to retire at the age of {ageOfRetirement} years</Typography>
          <Slider
            defaultValue={0}
            value={ageOfRetirement}
            onChange={(e, newValue: any) => setAgeOfRetirement(newValue)}
            valueLabelDisplay="auto"
            step={1}
            marks={[{ value: +age, label: `${age} years` }, { value: 70, label: '70 years' }]}
            min={+age}
            max={70}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Life Expetency {ageOfDeath} years</Typography>
          <Slider
            defaultValue={85}
            value={ageOfDeath}
            onChange={(e, newValue: any) => setAgeOfDeath(newValue)}
            valueLabelDisplay="on"
            step={1}
            marks={[{ value: 60, label: '60 years' }, { value: 100, label: '100 years' }]}
            min={60}
            max={100}
          />
        </Box>
        <Card elevation={0}>
          <CardHeader title="Here is how your savings will last over the years" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis mirror tickFormatter={value => `${value} Lac`} />
              <Tooltip formatter={(value: any) => `${value} Lac`} />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Yearly Expense With Inflation" stroke="#ff0000" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Stack>
    </Container>
  </Layout>;
}