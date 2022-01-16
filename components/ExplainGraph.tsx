import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import planner from "../src/planner";
import ReturnTable from "./ReturnTable";
import * as ga from '../lib/ga';

export default function ExplainGraph({ saving, retireToday }: { saving: number; retireToday?: boolean }) {
  return <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      onClick={() =>
        ga.event({
          action: "graph explanation clicked",
          params: {}
        })
      }
    >
      <Typography>But How? Explain the above graph</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {retireToday ? `You will be investing your ${planner.formatToString(saving)} and withdrawing your expenses yearly.`
          : 'You will be invesing monthly till your retirement. You will be withdrawing your expenses yearly in your life. '}
        As you age, you will move some amount to less riskier assets and hence your return expectation will be less.
        We have taken returns according to below table.</Typography>
      <ReturnTable />
      <Typography>Your amount will grow in the initial years as the return is greater than the expenses.
        Due to inflation, expense will grow over the years and eventually empty the savings.
      </Typography>
    </AccordionDetails>
  </Accordion>
}