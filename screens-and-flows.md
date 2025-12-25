# Screens & Flows

## Screen Map (Sitemap)

- Auth
  - Login
  - Register
  - Forgot Password
- Home (Tab)
  - Next-Step Checklist
  - Account Snapshot
  - Notifications Preview
- KYC (Detail)
  - Upload Documents
  - Status + Rejection Reason
- Open Trading Account (Detail)
  - Account Type / Leverage / Base Currency
  - Real/Demo toggle
- Market (Tab)
  - Price Board
  - Favorites
  - Price Alerts
- Trade (Tab)
  - Market Order ticket
  - Open Positions list
  - Close order
- Wallet (Tab)
  - Deposit flow
  - Withdrawal flow
  - Transaction History + Timeline
- Rewards (Tab)
  - Missions
  - Points Wallet
  - Redeem Catalog
- News (Tab)
  - Market News
  - Economic Calendar
- Settings (Tab)
  - Language/Currency/Timezone
  - Support ticket + Chat
  - FAQ/Help Center
  - Terms/Privacy
- Notifications (Detail)
- Legacy / More (Tab)

## End-to-End User Flow (MVP)

1) Register/Login
2) Home → Next-Step Checklist
3) KYC submission (status updates)
4) Open trading account
5) Deposit → status tracking
6) Trade → open position → close position
7) Missions/Rewards
8) Alerts/News
9) Support ticket

## Edge Cases & Error Paths

- KYC rejected: show rejection reason + resubmit prompt
- Withdrawal blocked when KYC is not Approved
- Deposit/withdraw rejected: show reason and retry CTA
- Network fail on status refresh: retry pattern shown in Wallet
- Empty states: no positions, no alerts, no transactions, no notifications

## Screen States (Design-Ready)

- Auth: empty fields, validation error, forgot password confirmation
- Home: checklist states (pending/complete), notifications empty
- KYC: unverified, pending, approved, rejected + reason
- Account: pending, active, disabled
- Wallet: deposit/withdrawal pending/approved/rejected
- Trade: empty positions, filled positions, order validation error
- Market: price list updating, favorites empty/filled
- News: list loaded, high-impact placeholder
- Rewards: missions progress 0/50/100
- Settings: ticket created state
- Notifications: empty list, list filled

## Simulation Controls (Dev Panel)

- KYC status: Unverified/Pending/Approved/Rejected
- Deposit status: Pending/Approved/Rejected + reason
- Withdrawal status: Pending/Approved/Rejected + reason
- Positions: empty vs filled
- Alerts: enabled/disabled
- Trigger notification toast

