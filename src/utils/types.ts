export type TPhoto = {
  id: number | string;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number | string;
  description?: string;
};

export type TPhotoUpdate = {
  id: number | string;
  description: string;
};
