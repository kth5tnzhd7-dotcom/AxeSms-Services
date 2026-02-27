// In-memory database - Replace with real DB in production
export const db = {
  users: [
    {
      id: 'admin_1',
      email: 'admin@axesms.services',
      name: 'Admin',
      password: 'hashed_admin@123', // In production, this would be bcrypt hashed
      phone: '+919876543210',
      role: 'admin',
      balance: 99999,
      createdAt: new Date('2025-01-01'),
      verified: true,
    },
    {
      id: 'user_1',
      email: 'demo@axesms.services',
      name: 'Rahul Sharma',
      password: 'hashed_demo@123',
      phone: '+919876543211',
      role: 'user',
      balance: 2450,
      createdAt: new Date('2025-01-15'),
      verified: true,
    },
  ],
  transactions: [
    {
      id: 'txn_1',
      userId: 'user_1',
      type: 'credit',
      amount: 500,
      description: 'Wallet Top-up',
      createdAt: new Date('2025-02-01'),
      status: 'completed',
    },
    {
      id: 'txn_2',
      userId: 'user_1',
      type: 'debit',
      amount: 50,
      description: 'SMS Campaign',
      createdAt: new Date('2025-02-15'),
      status: 'completed',
    },
  ],
  campaigns: [
    {
      id: 'camp_1',
      userId: 'user_1',
      name: 'Welcome Campaign',
      type: 'sms',
      status: 'completed',
      recipients: 150,
      sent: 145,
      delivered: 142,
      failed: 3,
      createdAt: new Date('2025-02-10'),
    },
  ],
};
