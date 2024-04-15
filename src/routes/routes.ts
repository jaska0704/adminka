import { nanoid } from "@reduxjs/toolkit";
import { Home } from "../pages/home/home";
import { CategoryCreate } from "../pages/category/category-create";
import { CategoryEdit } from "../pages/category/category-edit";
import { CategoryList } from "../pages/category/category-list";
import { BrandCreate } from "../pages/brand/brand-create";
import { BrandEdit } from "../pages/brand/brand-edit";
import { BrandList } from "../pages/brand/brand-list";
import { SubCategoryCreate } from "../pages/sub-category/sub-category-create";
import { SubCategoryEdit } from "../pages/sub-category/sub-category-edit";
import { SubCategoryList } from "../pages/sub-category/sub-category-list";
import { AttributeCreate } from "../pages/attribute/attribute-create";
import { AttributeEdit } from "../pages/attribute/attribute-edit";
import { AttributeList } from "../pages/attribute/attribute-list";
import { ProductCreate } from "../pages/product/product-create";
import { ProductEdit } from "../pages/product/product-edit";
import { ProductList } from "../pages/product/product-list";



interface Routes {
    component : React.FC;
    id: string;
    path?: string;
}

export const mainPages: Routes[] = [
    {
        id: nanoid(),
        component: Home,
    },
    {
        id: nanoid(),
        component: CategoryCreate,
        path: "category-create",
    },
    {
        id: nanoid(),
        component: CategoryEdit,
        path: "category-edit/:id",
    },
    {
        id: nanoid(),
        component: CategoryList,
        path: "category-list",
    },
    {
        id: nanoid(),
        component: SubCategoryCreate,
        path: "sub-category-create",
    },
    {
        id: nanoid(),
        component: SubCategoryList,
        path: "sub-category-list",
    },
    {
        id: nanoid(),
        component: SubCategoryEdit,
        path: "sub-category-edit/:id",
    },
    {
        id: nanoid(),
        component: BrandList,
        path: "brand-list",
    },
    {
        id: nanoid(),
        component: BrandCreate,
        path: "brand-create",
    },
    {
        id: nanoid(),
        component: BrandEdit,
        path: "brand-edit/:id",
    },
    {
        id: nanoid(),
        component: AttributeEdit,
        path: "attribut-edit/:id",
    },
    {
        id: nanoid(),
        component: AttributeCreate,
        path: "attribute-create",
    },
    {
        id: nanoid(),
        component: AttributeList,
        path: "attribute-list",
    },
    {
        id: nanoid(),
        component: ProductList,
        path: "product-list",
    },
    {
        id: nanoid(),
        component: ProductEdit,
        path: "product-edit/:id",
    },
    {
        id: nanoid(),
        component: ProductCreate,
        path: "product-create",
    },
]