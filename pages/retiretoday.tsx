import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardHeader, Container, FormControl, MenuItem, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "../src/Link";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from "../components/Layout";
import planner, { getReturnPercentage } from "../src/planner";
import Head from "next/head";
import Graph from "../components/Graph";
import { ExpandMore } from "@mui/icons-material";
import ReturnTable from "../components/ReturnTable";
import ExplainGraph from "../components/ExplainGraph";


export default function RetireToday() {
  const [age, setAge] = useState('30');
  const [expense, setExpense] = useState('25000');
  const [inflation, setInflation] = useState(6);
  const ages = [];
  for (let i = 18; i < 71; i++) {
    ages.push(i);
  }
  const { savings, ageArray, contrubutions, expenseWithInflation } =
    planner.getFinancialPlan(85, parseInt(age || '0'), parseInt(expense || '0'), 0, parseInt(age || '0'), 0, inflation);
  const data = ageArray.map(a => ({
    name: a,
    savings: (savings.get(a) || 0) < 0 ? 0 : savings.get(a),
  }));
  const expenseData = ageArray.map(a => ({
    name: a,
    'Yearly Expense With Inflation': expenseWithInflation.get(a)
  }));

  return <Layout>
    <Head>
      <title>Retire today</title>
    </Head>
    <Container maxWidth="md" sx={{ mt: 4, p: 4 }}>
      <Stack direction="column" spacing={8}>
        <Box><Typography variant="h3">Can You Retire Today?</Typography></Box>
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
            helperText={`${+expense * 12} per year`}
            onChange={e => setExpense(e.target.value)} />
        </Box>
        <Graph data={expenseData} title={`This is how your expense of ${expense} will grow over time with ${inflation}% inflation`} lines={[{ key: 'Yearly Expense With Inflation', color: '#ff0000' }]} />
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
          <Typography variant="subtitle2" gutterBottom component="span" >That means, if you have </Typography>
          <Typography variant="h3" gutterBottom color="primary" component="span">{planner.formatToString(savings.get(+age) || 0)} </Typography>
          <Typography variant="subtitle2" component="span"> You can retire today. </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Do not have {planner.formatToString(savings.get(+age) || 0)} now?</Typography>
          <Typography> Don't worry. We have a <Link href={`/financialplanner?age=${age}&expense=${expense}`}><a>detailed financial planner</a></Link> so that you can tweak some values and findout when you can retire and how much you have to save.</Typography>
        </Box>
        <Graph data={data} title={`Here is how your ${planner.formatToString(savings.get(+age) || 0)} will last over the years`} lines={[{ key: 'savings', color: "#8884d8" }]} />
        <ExplainGraph retireToday saving={(savings.get(+age) || 0)} />
        <Box>
          <Button variant="contained" noLinkStyle component={Link} href={`/financialplanner?age=${age}&expense=${expense}`}>Plan my financial freedom in detail</Button>
        </Box>
      </Stack>
    </Container>
  </Layout>;
}