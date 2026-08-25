import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface DeviceFingerprint {
  anonymousId: string;
  ipAddress: string;
  userAgent: string;
  cookieHash: string;
  timestamp: string;
}

export interface KnownIdentifier {
  email?: string;
  phone?: string;
  externalCustomerId?: string;
}

export interface ResolvedIdentityGraph {
  canonicalProfileId: string;
  knownIdentifiers: KnownIdentifier;
  linkedAnonymousIds: string[];
  confidenceScore: number;
  mergeReason: string;
  firstSeenAt: string;
  lastActiveAt: string;
}

@Injectable()
export class IdentityResolutionService {
  private readonly logger = new Logger(IdentityResolutionService.name);

  // In-memory identity graph index for fast resolution
  private readonly identityIndex = new Map<string, ResolvedIdentityGraph>();
  private readonly anonymousLookup = new Map<string, string>(); // anonymousId -> canonicalProfileId

  stitchVisitorIdentity(
    fingerprint: DeviceFingerprint,
    known?: KnownIdentifier,
  ): ResolvedIdentityGraph {
    this.logger.debug(`Resolving visitor identity for anonymousId: ${fingerprint.anonymousId}`);

    // Check if known email or phone is already linked to a profile
    let canonicalId: string | undefined;

    if (known?.email) {
      const normalizedEmail = known.email.trim().toLowerCase();
      for (const [id, profile] of this.identityIndex.entries()) {
        if (profile.knownIdentifiers.email?.toLowerCase() === normalizedEmail) {
          canonicalId = id;
          break;
        }
      }
    }

    if (!canonicalId && known?.phone) {
      for (const [id, profile] of this.identityIndex.entries()) {
        if (profile.knownIdentifiers.phone === known.phone) {
          canonicalId = id;
          break;
        }
      }
    }

    // Check if anonymousId was previously linked
    if (!canonicalId && this.anonymousLookup.has(fingerprint.anonymousId)) {
      canonicalId = this.anonymousLookup.get(fingerprint.anonymousId);
    }

    if (canonicalId && this.identityIndex.has(canonicalId)) {
      const existing = this.identityIndex.get(canonicalId)!;
      if (!existing.linkedAnonymousIds.includes(fingerprint.anonymousId)) {
        existing.linkedAnonymousIds.push(fingerprint.anonymousId);
      }
      if (known?.email) existing.knownIdentifiers.email = known.email;
      if (known?.phone) existing.knownIdentifiers.phone = known.phone;
      if (known?.externalCustomerId) existing.knownIdentifiers.externalCustomerId = known.externalCustomerId;
      existing.lastActiveAt = fingerprint.timestamp || new Date().toISOString();
      this.anonymousLookup.set(fingerprint.anonymousId, canonicalId);
      return existing;
    }

    // Create new identity cluster
    const newProfileId = `cprofile_${crypto.randomBytes(12).toString('hex')}`;
    const newProfile: ResolvedIdentityGraph = {
      canonicalProfileId: newProfileId,
      knownIdentifiers: known || {},
      linkedAnonymousIds: [fingerprint.anonymousId],
      confidenceScore: known?.email ? 1.0 : 0.75,
      mergeReason: known?.email ? 'DETERMINISTIC_EMAIL_MATCH' : 'PROBABILISTIC_DEVICE_MATCH',
      firstSeenAt: fingerprint.timestamp || new Date().toISOString(),
      lastActiveAt: fingerprint.timestamp || new Date().toISOString(),
    };

    this.identityIndex.set(newProfileId, newProfile);
    this.anonymousLookup.set(fingerprint.anonymousId, newProfileId);

    return newProfile;
  }

  getProfile(canonicalProfileId: string): ResolvedIdentityGraph | null {
    return this.identityIndex.get(canonicalProfileId) || null;
  }
}
