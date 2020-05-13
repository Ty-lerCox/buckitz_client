export interface Session {
  id: string;
  session_save_date: string;
}
export interface User {
  id?: string;
  user_income?: number;
  user_job_title?: string;
  user_name?: string;
  user_session_id?: string;
}
