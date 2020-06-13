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
    name: 'Software Engineer I',
    income: 82000,
  },
  {
    name: 'Software Engineer II',
    income: 100000,
  },
  {
    name: 'Software Engineer III',
    income: 110000,
  },
  {
    name: 'Software Engineer Senior',
    income: 120000,
  },
];
