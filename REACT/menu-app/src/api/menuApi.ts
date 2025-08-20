import axios from "axios";
import type { Menu } from "../types/menu";

const api = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: false
});

export const loadMenus = async function(searchKeyword:{type?:string, taste?:string}) {
    // const response = await api.get("/menus");
    return api.get<Menu[]>("/menus", {params: searchKeyword});
};