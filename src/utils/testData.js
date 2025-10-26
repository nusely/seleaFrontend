// Test Data Utilities for Sealia
// This file helps test different states of the application

export const clearAllData = () => {
  localStorage.removeItem('sealia-agreements')
  localStorage.removeItem('sealia-templates')
  localStorage.removeItem('sealia-clients')
  console.log('All data cleared! Refresh the page to see empty states.')
}

export const addSampleData = () => {
  const sampleAgreements = [
    {
      id: 1,
      title: "Photography Service Contract",
      clientName: "John Doe",
      clientEmail: "john@example.com",
      status: "signed",
      verifyId: "SEALIA-001",
      createdAt: "2024-01-20T10:00:00Z",
      signedAt: "2024-01-21T14:30:00Z",
      expiresAt: "2024-02-20T10:00:00Z",
      templateId: 1,
      content: "I, John Doe, agree to hire Jane Smith for photography services...",
      signatures: [
        { signer: "John Doe", signedAt: "2024-01-21T14:30:00Z", method: "biometric" },
        { signer: "Jane Smith", signedAt: "2024-01-21T14:35:00Z", method: "biometric" }
      ]
    },
    {
      id: 2,
      title: "Web Development Project",
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      status: "pending",
      verifyId: "SEALIA-002",
      createdAt: "2024-01-18T14:30:00Z",
      signedAt: null,
      expiresAt: "2024-02-18T14:30:00Z",
      templateId: 2,
      content: "This agreement is between Jane Smith and Tech Solutions for web development...",
      signatures: []
    }
  ]

  const sampleTemplates = [
    { id: 1, name: "Photography Contract", uses: 15, lastUsed: "2024-01-20" },
    { id: 2, name: "Freelance Project", uses: 8, lastUsed: "2024-01-14" }
  ]

  localStorage.setItem('sealia-agreements', JSON.stringify(sampleAgreements))
  localStorage.setItem('sealia-templates', JSON.stringify(sampleTemplates))
  console.log('Sample data added! Refresh the page to see the data.')
}

// Add to window for easy testing in browser console
if (typeof window !== 'undefined') {
  window.clearAllData = clearAllData
  window.addSampleData = addSampleData
}

