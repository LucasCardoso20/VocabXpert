import { appStorage } from '../../../storage/appStorage';
import apiClient from '../../../api/client';

export type ReviewStatus = 'DUE' | 'NEW' | 'LEARNING' | 'SCHEDULED';

export type ReviewDashboardItem = {
  id: string;
  word: string;
  translation: string | null;

  status: ReviewStatus;

  repetitions: number;
  streak: number;
  interval: number;

  lastOutcome: 'KNOWN' | 'UNKNOWN' | null;
  lastReviewedAt: string | null;
  nextDueAt: string | null;
};

export type ReviewDashboard = {
  ok: true;
  summary: {
    totalVocabs: number;
    dueNow: number;
    newVocabs: number;
    learning: number;
    scheduled: number;
  };
  items: ReviewDashboardItem[];
};

async function getAuthHeaders() {
  const userId = await appStorage.getItem('x-user-id');

  if (!userId) {
    throw new Error('USER_ID_NOT_FOUND');
  }

  return {
    'x-user-id': userId,
  };
}

/**
 * GET /reviews/dashboard?listId=...
 */
export async function fetchReviewDashboard(
  listId: string
): Promise<ReviewDashboard> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.get<ReviewDashboard>(
    '/reviews/dashboard',
    {
      params: { listId },
      headers,
      timeout: 20000,
    }
  );

  return data;
}