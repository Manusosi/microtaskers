export interface Database {
  public: {
    Tables: {
      user_wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          balance: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          balance?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          budget: number;
          rate_per_action: number;
          total_actions: number;
          countries: string[] | null;
          auto_rate: boolean;
          status: 'active' | 'paused' | 'completed' | 'cancelled';
          is_featured: boolean;
          is_premium: boolean;
          payment_status: 'pending' | 'paid' | 'failed';
          payment_method: string;
          payment_transaction_id: string;
          total_cost: number;
          advertiser_id: string;
          created_at: string;
          updated_at: string;
          available_seats: number;
          completed_submissions: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: string;
          budget: number;
          rate_per_action: number;
          total_actions: number;
          countries?: string[] | null;
          auto_rate: boolean;
          status?: 'active' | 'paused' | 'completed' | 'cancelled';
          is_featured: boolean;
          is_premium: boolean;
          payment_status?: 'pending' | 'paid' | 'failed';
          payment_method: string;
          payment_transaction_id: string;
          total_cost: number;
          advertiser_id: string;
          created_at?: string;
          updated_at?: string;
          available_seats?: number;
          completed_submissions?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string;
          budget?: number;
          rate_per_action?: number;
          total_actions?: number;
          countries?: string[] | null;
          auto_rate?: boolean;
          status?: 'active' | 'paused' | 'completed' | 'cancelled';
          is_featured?: boolean;
          is_premium?: boolean;
          payment_status?: 'pending' | 'paid' | 'failed';
          payment_method?: string;
          payment_transaction_id?: string;
          total_cost?: number;
          advertiser_id?: string;
          created_at?: string;
          updated_at?: string;
          available_seats?: number;
          completed_submissions?: number;
        };
      };
      job_submissions: {
        Row: {
          id: string;
          job_id: string;
          worker_id: string;
          proof_url: string | null;
          status: 'pending' | 'approved' | 'rejected';
          feedback: string | null;
          created_at: string;
          updated_at: string;
          payment_status: 'pending' | 'paid' | 'failed';
          payment_amount: number;
        };
        Insert: {
          id?: string;
          job_id: string;
          worker_id: string;
          proof_url?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          feedback?: string | null;
          created_at?: string;
          updated_at?: string;
          payment_status?: 'pending' | 'paid' | 'failed';
          payment_amount: number;
        };
        Update: {
          id?: string;
          job_id?: string;
          worker_id?: string;
          proof_url?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          feedback?: string | null;
          created_at?: string;
          updated_at?: string;
          payment_status?: 'pending' | 'paid' | 'failed';
          payment_amount?: number;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: 'deposit' | 'withdrawal' | 'job_posting' | 'task_payment';
          status: 'pending' | 'completed' | 'failed';
          payment_method: string;
          transaction_id: string;
          job_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          type: 'deposit' | 'withdrawal' | 'job_posting' | 'task_payment';
          status?: 'pending' | 'completed' | 'failed';
          payment_method: string;
          transaction_id: string;
          job_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          type?: 'deposit' | 'withdrawal' | 'job_posting' | 'task_payment';
          status?: 'pending' | 'completed' | 'failed';
          payment_method?: string;
          transaction_id?: string;
          job_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 