const RETRYABLE_CODES = new Set(['PGRST504', '57014', '08006', '08001', '53300']);
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isRetryableError = (error) => {
  if (!error) return false;
  if (RETRYABLE_CODES.has(error.code)) return true;
  if (error.status && RETRYABLE_STATUS.has(error.status)) return true;
  const message = `${error.message || ''}`.toLowerCase();
  return (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('failed to fetch') ||
    message.includes('body stream already read')
  );
};

/** Retry transient Supabase query failures (network, 5xx, timeouts). */
export const runSupabaseQuery = async (queryFn, { retries = 2, baseDelayMs = 150 } = {}) => {
  let lastResult = { data: null, error: null };

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      lastResult = await queryFn();
    } catch (err) {
      lastResult = { data: null, error: err };
    }

    if (!lastResult.error) {
      return lastResult;
    }

    if (!isRetryableError(lastResult.error) || attempt === retries - 1) {
      return lastResult;
    }

    await delay(baseDelayMs * (attempt + 1));
  }

  return lastResult;
};

/** Fetch wrapper with retries for Supabase client global.fetch */
export const createRetryFetch = (retries = 2) => {
  return async (input, init) => {
    let lastError;

    for (let attempt = 0; attempt < retries; attempt += 1) {
      try {
        const response = await fetch(input, init);
        if (response.status >= 500 && attempt < retries - 1) {
          await delay(300 * (attempt + 1));
          continue;
        }
        return response;
      } catch (err) {
        lastError = err;
        if (attempt === retries - 1) throw err;
        await delay(300 * (attempt + 1));
      }
    }

    throw lastError;
  };
};

/** Auth getUser with retry — avoids redirecting to login during token refresh races. */
export const getAuthenticatedUser = async (supabaseClient) => {
  const { data: sessionData } = await runSupabaseQuery(
    () => supabaseClient.auth.getSession(),
    { retries: 2 }
  );

  if (sessionData?.session?.user) {
    return { user: sessionData.session.user, error: null };
  }

  const { data, error } = await runSupabaseQuery(
    () => supabaseClient.auth.getUser(),
    { retries: 3 }
  );

  return { user: data?.user ?? null, error };
};
