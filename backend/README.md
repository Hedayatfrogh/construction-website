# Backend setup

Install dependencies with `npm install`, configure the environment, then start
the API with `npm start` (or `npm run dev` locally).

## Contact email

Contact submissions are validated, then saved to MongoDB and emailed to
`CONTACT_EMAIL`. If SMTP is not configured, the API returns 503 and nothing is
saved. Configure these variables in `config.env` locally or in the backend
hosting provider's server-side environment settings:

- `SMTP_HOST`
- `SMTP_PORT` (usually `587`; use `465` for implicit TLS)
- `SMTP_USER`
- `SMTP_PASS` (Gmail App Password; spaces are ignored)
- `SMTP_FROM` (optional From header; falls back to `EMAIL_FROM`, then `SMTP_USER`)
- `CONTACT_EMAIL` (the administrator's receiving inbox)
- `EMAIL_FROM` (optional alias for `SMTP_FROM`)

For Gmail, use `smtp.gmail.com` with a Google App Password, not the account
password. Keep credentials in the backend host's secret/environment settings;
never put them in frontend variables or commit them. Restart or redeploy the
backend after changing the variables. A contact API response with status 503
means delivery failed (misconfigured SMTP, SMTP error, or database unavailable).

Host-provided environment variables take precedence over local files. When
running locally, non-empty values from `.env` take precedence over
`config.env`; empty entries do not mask values in the fallback file.
