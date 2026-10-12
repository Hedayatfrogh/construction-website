# Backend setup

Install dependencies with `npm install`, configure the environment, then start
the API with `npm start` (or `npm run dev` locally).

## Contact email

Contact submissions are saved to MongoDB before email is attempted. To deliver
them, configure these variables in `config.env` locally or in the backend
hosting provider's server-side environment settings:

- `SMTP_HOST`
- `SMTP_PORT` (usually `587`; use `465` for implicit TLS)
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL` (the administrator's receiving inbox)
- `EMAIL_FROM` (optional; defaults to `SMTP_USER`)

For Gmail, use `smtp.gmail.com` with a Google App Password, not the account
password. Keep credentials in the backend host's secret/environment settings;
never put them in frontend variables or commit them. Restart or redeploy the
backend after changing the variables. A contact API response with status 503
means MongoDB saved the message but email was not confirmed as delivered.

Host-provided environment variables take precedence over local files. When
running locally, non-empty values from `.env` take precedence over
`config.env`; empty entries do not mask values in the fallback file.
