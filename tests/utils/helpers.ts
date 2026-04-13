export function generateRandomEmail(prefix = 'test', domain = 'example.com'): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${prefix}${randomPart}@${domain}`;
}

export function generateRandomPassword(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
