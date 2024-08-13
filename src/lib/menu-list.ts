import { FolderOpen, LayoutGrid, Package } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Ma boutique",
          active: pathname.includes("/admin"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Gestion de la boutique",
      menus: [
        {
          href: "",
          label: "Produits",
          active: pathname.includes("/admin/produits"),
          icon: Package,
          submenus: [
            {
              href: "/admin/produits",
              label: "Tous les produits",
              active: pathname === "/admin/produits",
            },
            {
              href: "/admin/produits/nouveau",
              label: "Ajouter un produits",
              active: pathname === "/admin/produits/nouveau",
            },
          ],
        },
        {
          href: "",
          label: "Catégories",
          active: pathname.includes("/admin/categories"),
          icon: FolderOpen,
          submenus: [
            {
              href: "/admin/categories",
              label: "Toute les categories",
              active: pathname === "/admin/categories",
            },
            {
              href: "/admin/categories/nouvelle",
              label: "Ajouter une categorie",
              active: pathname === "/admin/categories/nouvelle",
            },
          ],
        },
      ],
    },
  ];
}
