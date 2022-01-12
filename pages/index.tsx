import { Button, Card, CardActions, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '../src/Link';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Layout>
      <Head>
      <title>Financial Planner</title>
    </Head>
      <Container component="main" sx={{ mt: 8, mb: 2, bgcolor: '#fafafa' }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ textDecoration: 'line-through' }}>
              Retirement
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom >
              Financial Freedom
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Find out when you can stop working for money
            </Typography>
            <Typography variant="body1">Get rich by understanding how money works & investing in income-producing assets.</Typography>
            <Box sx={{ mt: 8 }} >
              <Button variant='contained' component={Link} href="/retiretoday" >Start Planning Now</Button>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} sx={{ mt: 3 }}>
            <Image src='/images/hero.jpg' width={500} height={500} layout='responsive' />
          </Grid>
        </Grid>
        <Card>
          <CardContent>
            <Typography variant='h5' component={'h2'}>
              👨 Jeff is 30 years old.
            </Typography>
            <Typography variant='body1'>
              He spends 25000 per month now. By investing 36117 per month and increase that amount by 5% every year,
            </Typography>
            <Typography variant='h5' component="h5">He can stop working for money at the age of 45.</Typography>
          </CardContent>
          <CardActions>
            <Button variant='outlined' component={Link} noLinkStyle href="/financialplanner?age=30&expense=25000" >Find out yours</Button>
          </CardActions>
        </Card>
      </Container>
    </Layout>
  );
}
