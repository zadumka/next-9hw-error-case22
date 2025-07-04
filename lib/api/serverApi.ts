import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import axios from 'axios';

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const { data } = await axios.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export interface FetchNotesProps {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const cookieStore = await cookies();
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const data = await axios.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await axios.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
