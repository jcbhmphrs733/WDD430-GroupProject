# 🚀 Team Member Setup Checklist

## Prerequisites
- [ ] Node.js 18+ installed
- [ ] Git configured with your account
- [ ] Code editor (VS Code recommended)

## Setup Steps
- [ ] Clone the repository
- [ ] Run `pnpm install`
- [ ] Copy `.env.example` to `.env.local`
- [ ] **Get environment variables from team lead**
- [ ] Verify setup with `pnpm run dev`
- [ ] Test database connection by viewing the app

## Getting Environment Variables

### Secure Methods (choose one):
- [ ] **Bitwarden**: Get access to shared team vault
- [ ] **OneTimeSecret**: Get secure link from team lead
- [ ] **Video call**: Screen share during team meeting
- [ ] **In-person**: View variables on team lead's screen

### ❌ Never Accept Credentials Via:
- Email attachments
- Discord/Slack messages
- Text messages
- Screenshots
- Unencrypted file sharing

## Verification
Run these commands to verify your setup:

```bash
# Install dependencies
pnpm install

# Type check
pnpm run type-check

# Start development server
pnpm run dev
```

## Need Help?
- **Primary Contact**: [Your Name] - [Your Email]
- **Backup Contact**: [TA/Professor if applicable]
- **Team Slack**: #wdd430-project
- **Office Hours**: [When/Where]

## Security Reminders
- ✅ Never commit `.env.local`
- ✅ Never share credentials in public channels
- ✅ Use secure methods for credential sharing
- ✅ Report any security concerns immediately
