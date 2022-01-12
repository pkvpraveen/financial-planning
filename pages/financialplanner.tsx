import { Container, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useEffect, useState } from "react";
import ExplainGraph from "../components/ExplainGraph";
import Graph from "../components/Graph";
import Layout from "../components/Layout";
import planner from "../src/planner";


export default function FinancialPlanner() {
  const [age, setAge] = useState(30);
  const [expense, setExpense] = useState('25000');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [yearlyIncrement, setYearlyIncrement] = useState(0);
  const [ageOfDeath, setAgeOfDeath] = useState(85);
  const [ageOfRetirement, setAgeOfRetirement] = useState(60);
  const [inflation, setInflation] = useState(6);
  useEffect(() => {
    const passedAge = new URLSearchParams(window.location.search)?.get('age') || '';
    const passedExpense = new URLSearchParams(window.location.search)?.get('expense');
    if (passedAge) {
      setAge(+passedAge);
    }
    if (passedExpense) {
      setExpense(passedExpense);
    }
  }, []);
  const { savings, ageArray, contrubutions, expenseWithInflation } = planner.getFinancialPlan(ageOfDeath,
    +age,
    +expense,
    parseInt(initialInvestment || '0'),
    ageOfRetirement,
    yearlyIncrement, inflation);
  const data = ageArray.map(a => ({
    name: a,
    savings: (savings.get(a) || 0) < 0 ? 0 : savings.get(a) || 0,
  }));
  const expenseData = ageArray.map(a => ({
    name: a,
    'Yearly Expense With Inflation': expenseWithInflation.get(a)
  }));

  return <Layout>
    <Head>
      <title>Financial Freedom Calculator</title>
    </Head>
    <Container maxWidth="md" sx={{ mt: 4, p: 4 }}>
      <Stack direction="column" spacing={8}>
        <Box><Typography variant="h3">Retirement Calculator</Typography></Box>
        <Box>
          <Typography>My current age is {age} and I want to retire at age {ageOfRetirement}</Typography>
          <Slider
            value={[age, ageOfRetirement]}
            onChange={(e, newValue: any) => {
              setAge(newValue[0]);
              setAgeOfRetirement(newValue[1]);
            }}
            valueLabelDisplay="auto"
            step={1}
            marks={[{ value: 20, label: `20 years` }, { value: 70, label: `70 years` }]}
            min={20}
            disableSwap
            max={70}
          />
        </Box>
        <Box>
          <Typography>My expense per month is</Typography>
          <TextField
            variant="standard"
            value={expense}
            fullWidth
            helperText={`${+expense * 12} per year`}
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
        <Box>
          <Typography variant="subtitle2" gutterBottom component="span" >You need to save </Typography>
          <Typography variant="h3" gutterBottom color="primary" component="span">
            {((contrubutions.get(+age) || 0) / 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
          <Typography variant="subtitle2" component="span"> to retire at the age of {ageOfRetirement} years.. </Typography>
        </Box>
        <Box>
          <Typography gutterBottom>What if I can increase my monthly investment every year by {yearlyIncrement}%</Typography>
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
        <Box>
          <Graph data={expenseData} title={`This is how your expense of ${expense} will grow over time with ${inflation}% inflation`}
            lines={[{ key: 'Yearly Expense With Inflation', color: '#ff0000' }]} />
        </Box>
        <Box>
          <Typography gutterBottom>Inflation {inflation}%</Typography>
          <Slider
            defaultValue={6}
            value={inflation}
            onChange={(e, newValue: any) => setInflation(newValue)}
            valueLabelDisplay="auto"
            step={1}
            marks={[{ value: 0, label: '0%' }, { value: 10, label: '10%' }]}
            min={0}
            max={10}
          />
        </Box>
        <Box>
          <Graph data={data} title={`Here is how your savings will grow and shrink over the years`}
            lines={[{ key: 'savings', color: "#8884d8" }]} />
        </Box>
        <ExplainGraph saving={(savings.get(+age) || 0)} />
      </Stack>
    </Container>
  </Layout>;
}