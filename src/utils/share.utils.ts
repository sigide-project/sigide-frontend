const BRAND_MESSAGE = `Sigide connects people who've lost items with those who've found them. Our community-powered platform makes reuniting with your belongings simple, secure, and stress-free.`;
const CALL_TO_ACTION = `👉 Think this might belong to someone you know? Share it or take a look!`;

interface ShareMessageParams {
  title?: string;
  description?: string;
  url: string;
}

export function buildShareMessage({ title, description, url }: ShareMessageParams): string {
  const heading = title || 'Lost & Found Item';
  const body = description || 'Check out this item on Sigide';

  return `${heading}

${body}

${BRAND_MESSAGE}

${CALL_TO_ACTION}

🔗 ${url}`;
}
