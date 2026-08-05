import { appStorage } from '../../../storage/appStorage';
import apiClient from '../../../api/client';

export type ProgressActivityItem = {
  date: string;
  reviews: number;
};

export type ProgressOverview = {
  ok: true;
  summary: {
    totalVocabs: number;
    newVocabs: number;
    dueNow: number;
    learning: number;
    scheduled: number;
    totalReviews: number;
    averageScore: number;
    currentStreak: number;
  };
  activity: ProgressActivityItem[];
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
 * GET /progress/overview
 */
export async function fetchProgressOverview(): Promise<ProgressOverview> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.get<ProgressOverview>(
    '/progress/overview',
    {
      headers,
      timeout: 20000,
    }
  );

  return data;
}