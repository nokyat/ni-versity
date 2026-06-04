// Ni-Token Wallet Vault & Transaction Logic
// In a full production environment, this connects directly to Firebase Cloud Firestore.

// Mock Database for Wallet Balances
let vaultDB = {
  'u2': { name: 'Student A', balance: 150 }, // Starting with 150 Ni-Tokens
  'u3': { name: 'Instructor B', balance: 800 },
  'vault': { platformRevenue: 1250 }
};

const PLATFORM_FEE_PERCENTAGE = 0.10; // 10% cut goes to the Admin Vault

export const WalletService = {
  
  /**
   * Fetches the current balance of a specific user.
   */
  getBalance: async (userId) => {
    // Simulating network delay to Firebase
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!vaultDB[userId]) throw new Error("User wallet not found");
    return vaultDB[userId].balance;
  },

  /**
   * Securely processes a course enrollment transaction.
   * Deducts from student, pays teacher, and routes the commission to the platform vault.
   */
  processEnrollment: async (studentId, teacherId, coursePrice) => {
    // Simulating secure Firebase Cloud Function environment
    await new Promise(resolve => setTimeout(resolve, 800));

    const studentWallet = vaultDB[studentId];
    const teacherWallet = vaultDB[teacherId];

    // 1. Verification Phase
    if (!studentWallet) throw new Error("Student wallet missing.");
    if (!teacherWallet) throw new Error("Teacher wallet missing.");
    if (studentWallet.balance < coursePrice) {
      throw new Error("Insufficient Ni-Tokens. Please recharge your wallet.");
    }

    // 2. Math Phase
    const platformCut = coursePrice * PLATFORM_FEE_PERCENTAGE;
    const teacherCut = coursePrice - platformCut;

    // 3. Execution Phase (Atomic Transaction)
    studentWallet.balance -= coursePrice;
    teacherWallet.balance += teacherCut;
    vaultDB['vault'].platformRevenue += platformCut;

    return {
      success: true,
      message: `Successfully enrolled! ${coursePrice} Ni-Tokens deducted.`,
      newBalance: studentWallet.balance,
      receipt: {
        paid: coursePrice,
        teacherReceived: teacherCut,
        platformFee: platformCut
      }
    };
  }
};
