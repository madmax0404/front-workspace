// 메뉴 타입 정의
export interface Menu {
    id: number,
    restaurant: string,
    name: string,
    price: number,
    type: "kr" | "ch" | "jp" | "all",
    taste: "hot" | "mild" | "all"
}

export type MenuCreate = Omit<Menu, "id">;