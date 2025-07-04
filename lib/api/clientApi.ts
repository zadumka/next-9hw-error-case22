import { NewNoteContent, Note } from '@/types/note';
import { User } from '@/types/user';
import { nextServer } from './api';
import { FetchNotesProps, FetchNotesResponse } from './serverApi';

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res;
};

export const login = async (data: AuthRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res;
};

export const register = async (data: AuthRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  await nextServer.get('/auth/session');
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get('/users/me');
  return res;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch('/users/me', data);
  return res;
};

export const createNote = async (newNote: NewNoteContent) => {
  const response = await nextServer.post<Note>('/notes', newNote);
  return response;
};
