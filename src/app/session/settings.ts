export interface Session {
  id: string;
  session_save_date: string;
  session_share_asset_id?: string;
  session_share_asset_index?: string;
}
export interface User {
  id?: string;
  user_income?: number;
  user_job_title?: string;
  user_name?: string;
  user_session_id?: string;
}

export interface Job {
  name: string;
  income: number;
}

export const Jobs = [
  {
    name: '10000',
    income: 10000,
  },
  {
    name: '20000',
    income: 20000,
  },
  {
    name: '30000',
    income: 30000,
  },
  {
    name: '40000',
    income: 40000,
  },
  {
    name: '50000',
    income: 50000,
  },
  {
    name: '60000',
    income: 60000,
  },
  {
    name: '70000',
    income: 70000,
  },
  {
    name: '80000',
    income: 80000,
  },
  {
    name: '90000',
    income: 90000,
  },
  {
    name: '100000',
    income: 100000,
  },
  {
    name: '125000',
    income: 125000,
  },
  {
    name: '150000',
    income: 150000,
  },
  {
    name: '175000',
    income: 175000,
  },
  {
    name: '200000',
    income: 200000,
  },
  {
    name: '250000',
    income: 250000,
  },
  {
    name: '300000',
    income: 300000,
  },
  {
    name: '350000',
    income: 350000,
  },
  {
    name: '400000',
    income: 400000,
  },
  {
    name: '450000',
    income: 450000,
  },
  {
    name: '500000',
    income: 500000,
  },
];
