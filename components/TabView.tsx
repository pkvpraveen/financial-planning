import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as ga from '../lib/ga'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabView({tabOne, tabTwo, tabThree, screen}: {
  tabOne: React.ReactNode;
  tabTwo: React.ReactNode;
  tabThree: React.ReactNode;
  screen: string;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function countEvent(tab: string, screen: string){
    ga.event({
      action: `clicked on tab ${tab} on screen ${screen}`,
      params: {}
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Plan" onClick={() => countEvent('Plan', screen)} {...a11yProps(0)} />
          <Tab label="Explain" onClick={() => countEvent('Explain', screen)} {...a11yProps(1)} />
          <Tab label="Advanced" onClick={() => countEvent('Advanced', screen)} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {tabOne}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tabTwo}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tabThree}
      </TabPanel>
    </Box>
  );
}
