import { Button, Container, Slider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import ExplainGraph from "../components/ExplainGraph";
import Graph from "../components/Graph";
import Layout from "../components/Layout";
import TabView from "../components/TabView";
import Link from "../src/Link";
import planner from "../src/planner";
import * as ga from '../lib/ga'


export default function RetireToday() {
  const [age, setAge] = useState(30);
  const [expense, setExpense] = useState(25000);
  const [inflation, setInflation] = useState(6);
  const ages = [];
  for (let i = 18; i < 71; i++) {
    ages.push(i);
  }
  const { savings, ageArray, contrubutions, expenseWithInflation } =
    planner.getFinancialPlan(85, age, expense, 0, age, 0, inflation);
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
    <Container component="main" sx={{ mt: 1, px: 0, mb: 2, bgcolor: '#fafafa' }} maxWidth="md">
      <Box mx={1}><Typography variant="h5">Can I Retire Today?</Typography></Box>
      <TabView
        screen="retire today"
        tabOne={<>
          <Stack direction="column" spacing={4}>
            <Box mx={1}>
              <Typography>Please select your age</Typography>
              <Slider
                defaultValue={30}
                value={age}
                onChange={(e, newValue: any) => setAge(newValue)}
                valueLabelDisplay="on"
                step={1}
                marks={[{ value: 20, label: '20 years' }, { value: 70, label: '70 years' }]}
                min={20}
                max={70}
                onChangeCommitted={(e, value) => {
                  ga.event({
                    action: "retire today age",
                    params: {
                      value
                    }
                  })
                }}
              />
            </Box>
            <Box>
              <Typography>My expense per month is ₹ {`${expense}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Typography>
              <Slider
                value={expense}
                onChange={(e, newValue: any) => {
                  setExpense(newValue)
                }}
                valueLabelDisplay="auto"
                defaultValue={25000}
                step={1}
                marks={[{ value: 10000, label: `10k` }, { value: 200000, label: `2 lac` }]}
                min={10000}
                max={200000}
                onChangeCommitted={(e, value) => {
                  ga.event({
                    action: "retire today expense",
                    params: {
                      value
                    }
                  })
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom component="span" >That means, if I have </Typography>
              <Typography variant="h4" gutterBottom color="primary" component="span">{planner.formatToString(savings.get(+age) || 0)} </Typography>
              <Typography variant="subtitle2" component="div"> I can retire today. </Typography>
            </Box>
          </Stack>
        </>}
        tabTwo={<>
          <Stack direction="column" spacing={4}>
            <Box>
              <Typography variant="subtitle2" gutterBottom component="span" >That means, if I have </Typography>
              <Typography variant="h4" gutterBottom color="primary" component="span">{planner.formatToString(savings.get(+age) || 0)} </Typography>
              <Typography variant="subtitle2" component="div"> I can retire today. </Typography>
            </Box>
            <Graph data={expenseData} title={`This is how your expense of ${`${expense}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} will grow over time with ${inflation}% inflation`} lines={[{ key: 'Yearly Expense With Inflation', color: '#ff0000' }]} />
            <Graph data={data} title={`Here is how your ${planner.formatToString(savings.get(+age) || 0)} will last over the years`} lines={[{ key: 'savings', color: "#8884d8" }]} />
            <ExplainGraph retireToday saving={(savings.get(+age) || 0)} />
          </Stack>
        </>}
        tabThree={<>
          <Stack direction="column" spacing={4}>
            <Box>
              <Typography variant="subtitle2" gutterBottom component="span" >That means, if I have </Typography>
              <Typography variant="h4" gutterBottom color="primary" component="span">{planner.formatToString(savings.get(+age) || 0)} </Typography>
              <Typography variant="subtitle2" component="div"> I can retire today. </Typography>
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
          </Stack>
        </>}
      />
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Stack direction="column" spacing={4}>
          <Box>
            <Typography variant="subtitle2">Do not have {planner.formatToString(savings.get(+age) || 0)} now?</Typography>
            <Typography> Don't worry. We have a <Link href={`/financialplanner?age=${age}&expense=${expense}`}><a onClick={() => {
              ga.event({
                action: "start planning now link",
                params: {}
              })
            }}>detailed financial planner</a></Link> for you to tweak some values and findout when you can retire and how much you need to save.</Typography>
          </Box>

          <Box>
            <Button variant="contained" onClick={() => {
              ga.event({
                action: "detail planner button",
                params: {}
              })
            }} noLinkStyle component={Link} href={`/financialplanner?age=${age}&expense=${expense}`}>Plan my financial freedom in detail</Button>
          </Box>
        </Stack>
      </Container>
    </Container>
  </Layout>;
}