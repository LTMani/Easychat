export function ipToInt(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function isIpInCidr(ip: string, cidr: string): boolean {
  if (cidr === '*' || cidr === '0.0.0.0/0') return true;

  const [rangeIp, prefixLengthStr] = cidr.split('/');
  const prefixLength = prefixLengthStr ? parseInt(prefixLengthStr, 10) : 32;

  if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) return false;

  const mask = prefixLength === 0 ? 0 : (~0 << (32 - prefixLength)) >>> 0;
  const ipInt = ipToInt(ip);
  const rangeInt = ipToInt(rangeIp);

  return (ipInt & mask) === (rangeInt & mask);
}

export function isIpAllowed(ip: string, allowlist: string[]): boolean {
  if (!allowlist || allowlist.length === 0) return true; // Empty allowlist allows all
  return allowlist.some((cidr) => isIpInCidr(ip, cidr.trim()));
}
