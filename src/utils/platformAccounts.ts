import { supabase } from '../configs/supaClient';

/**
 * Enum values for the `platform_name` column in `platform_accounts`.
 * Must match the Supabase `platform` enum: github, leetcode, linkedin, hackerrank, kaggle
 */
export type PlatformName = 'github' | 'leetcode' | 'linkedin' | 'hackerrank' | 'kaggle';

export interface PlatformAccountRow {
  user_id: string;
  platform_name: PlatformName;
  username: string;
  profile_url: string;
}

/**
 * Extracts the username from a profile URL for a given platform.
 * Falls back to the full URL path tail if no pattern matches.
 */
export function extractUsername(platform: PlatformName, url: string): string {
  if (!url) return '';

  try {
    // Normalise to a real URL for parsing
    const normalised = url.startsWith('http') ? url : `https://${url}`;
    const parsed = new URL(normalised);
    const segments = parsed.pathname.split('/').filter(Boolean);

    switch (platform) {
      case 'linkedin':
        // linkedin.com/in/username
        if (segments[0] === 'in' && segments[1]) return segments[1];
        return segments[0] ?? '';

      case 'github':
        // github.com/username
        return segments[0] ?? '';

      case 'kaggle':
        // kaggle.com/username
        return segments[0] ?? '';

      case 'leetcode':
        // leetcode.com/u/username OR leetcode.com/username
        if (segments[0] === 'u' && segments[1]) return segments[1];
        return segments[0] ?? '';

      case 'hackerrank':
        // hackerrank.com/username OR hackerrank.com/profile/username
        if (segments[0] === 'profile' && segments[1]) return segments[1];
        return segments[0] ?? '';

      default:
        return segments[0] ?? '';
    }
  } catch {
    // URL parsing failed — return trimmed input
    return url.trim();
  }
}

/**
 * Maps the frontend ExtractedLinks state to an array of platform account rows
 * ready for Supabase insertion.
 * Only includes platforms that have a non-empty URL.
 */
export function buildPlatformRows(
  userId: string,
  links: Record<string, string>
): PlatformAccountRow[] {
  // Map from frontend field names → DB platform_name enum values
  const mapping: Record<string, PlatformName> = {
    github: 'github',
    leetcode: 'leetcode',
    linkedin: 'linkedin',
    hackerrank: 'hackerrank',
    kaggle: 'kaggle',
  };

  const rows: PlatformAccountRow[] = [];

  for (const [field, platformName] of Object.entries(mapping)) {
    const url = links[field]?.trim();
    if (!url) continue;

    // Ensure the URL has a scheme so it stores consistently
    const profileUrl = url.startsWith('http') ? url : `https://${url}`;

    rows.push({
      user_id: userId,
      platform_name: platformName,
      username: extractUsername(platformName, url),
      profile_url: profileUrl,
    });
  }

  return rows;
}

/**
 * Saves platform accounts into Supabase.
 * Uses a delete-then-insert strategy:
 *  1. Remove all existing rows for this user
 *  2. Insert fresh rows only for platforms with a non-empty URL
 * This avoids the need for a unique constraint and cleanly handles
 * platforms whose links were removed.
 */
export async function savePlatformAccounts(
  userId: string,
  links: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const rows = buildPlatformRows(userId, links);

  // Step 1: Delete all existing platform accounts for this user
  const { error: deleteError } = await supabase
    .from('platform_accounts')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    console.error('Supabase delete error:', deleteError);
    return { success: false, error: deleteError.message };
  }

  // Step 2: Insert only the platforms that have a URL
  if (rows.length === 0) {
    return { success: true }; // all links were empty — nothing to insert
  }

  const now = new Date().toISOString();
  const rowsWithTimestamps = rows.map((r) => ({
    ...r,
    created_at: now,
    updated_at: now,
  }));

  const { error: insertError } = await supabase
    .from('platform_accounts')
    .insert(rowsWithTimestamps);

  if (insertError) {
    console.error('Supabase insert error:', insertError);
    return { success: false, error: insertError.message };
  }

  return { success: true };
}
