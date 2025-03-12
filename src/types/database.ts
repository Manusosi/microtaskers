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
        };
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          worker_id: string;
          status: 'pending' | 'approved' | 'rejected' | 'completed';
          proof_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          worker_id: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
          proof_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          worker_id?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'completed';
          proof_url?: string | null;
          created_at?: string;
          updated_at?: string;
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