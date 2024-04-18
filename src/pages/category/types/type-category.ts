import type { UploadFile } from "antd";

export interface TypeCategory {
  id: number;
  title: string;
  image?: {
    file: File;
    fileList: UploadFile;
  };
  parent: string;
}

export interface attributType {
  items: {
    attribute_id: number | null;
    title: string;
    values: {
      value: string;
      value_id: number | undefined;
    }[];
  }[];
  category_id: number | undefined;
}

export interface AttributType {
  attributes: {
    attribute_id: null;
    title: string;
    values: {
      value: string;
      value_id: null;
    }[];
  }[];
  category_id: number | undefined;
}

export interface SubCategory {
  id: number;
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  parent: {
    id: number;
  };
  children: {
    id: number;
    title: string;
    image: string;
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
    parent: number;
    children: {
      image: string;
      id: number;
      title: string;
    }[];
  }[];
}

export interface CategoriesType {
  id: number;
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  parent: string;
  children: {
    id: number;
    title: string;
    parent: {
      id?: number;
    };
  };
}

export interface TypeProduct {
  title: string;
  image?: {
    file: File;
    fileList: FileList;
  };
  id?: number;
  is_available: boolean;
  is_new: boolean;
  price: string;
  category: string;
}
export interface typeBanner {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    created_at: string;
    description: string;
    id: number;
    image: string;
    title: string;
    updated_at: string;
  }[];
}

export interface TypeBanner {
  description: string;
  id: number;
  image: {
    file: File;
    fileList: UploadFile;
  };
  title: string;
}

export interface BrandType {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    image: string;
  }[]
}

export interface brand {
  id: number;
  image: {
    file: File;
    fileList: UploadFile;
  };
  title: string;
}

export interface types {
  title: string;
  image: string;
  id: number;
}

export interface CategoryListType {
  id: number;
  title: string;
  image: string;
}
[];