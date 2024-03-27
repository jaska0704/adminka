import type { UploadFile } from "antd";

export interface TypeCategory {
  title: string;
  image?: {
    file: File;
    fileList: UploadFile;
  };
}

export interface TypeCategoryList {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    image: string;
    children: {
      image: string;
      id: number;
      title: string;
    }[];
  }[];
}
