export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface PhotoPayload {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const testFixtures = {
  newPost: {
    title: 'Testovací příspěvek',
    body: 'Toto je testovací obsah příspěvku',
    userId: 1,
  } as PostPayload,
  updatedPost: {
    id: 1,
    title: 'Aktualizovaný příspěvek',
    body: 'Aktualizovaný obsah příspěvku',
    userId: 1,
  } as PostPayload,
  patchPost: {
    title: 'Částečně aktualizovaný příspěvek',
  } as Partial<PostPayload>,
  newPhoto: {
    albumId: 1,
    title: 'Testovací fotografie',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  } as PhotoPayload,
  updatedPhoto: {
    id: 1,
    albumId: 1,
    title: 'Aktualizovaná fotografie',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  } as PhotoPayload,
  patchPhoto: {
    title: 'Částečně aktualizovaná fotografie',
  } as Partial<PhotoPayload>,
};
