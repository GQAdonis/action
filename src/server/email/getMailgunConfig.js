export const getMailgunApiConfig = () => ({
  apiKey: process.env.MAILGUN_API_KEY || null,
  domain: process.env.MAILGUN_DOMAIN || 'mail.parabol.co'
});

export const getMailgunOptions = () => ({
  from: process.env.MAILGUN_FROM || ''
});
