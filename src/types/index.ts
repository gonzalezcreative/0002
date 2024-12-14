// Add to existing types
export interface PaymentSession {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  leadId: string;
  userId: string;
  createdAt: string;
}

export interface PaymentError {
  message: string;
  code?: string;
}