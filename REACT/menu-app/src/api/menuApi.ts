import axios, { AxiosError } from "axios";
import type { Menu, MenuCreate, MenuUpdate } from "../types/menu";
import { store } from "../store/store";

// redux store에서 accessToken 꺼내오기.
const getAccessToken = () => {
    return store.getState().auth.accessToken;
};

const api = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: true
});


// axios의 추가 기능 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (err:AxiosError) => {
        const originalRequest = err.config;

        // api 서버로부터 응답받은 상태코드가 401인 경우 refresh 토큰을 활용한 accessToken 재발급
        if (err.response?.status === 401) {
            try {
                const response = await axios.post(`http://localhost:8081/api/auth/refresh`, {}, {
                    withCredentials: true
                });
                console.log(response);
    
                // 응답 성공시 재발급받은 accessToken을 다시 메모리에 저장.
    
                // 기존 요청 재시도.
            } catch (refreshError) {
                // 토큰 갱신 실패시 처리코드
            }
        }

        return Promise.reject(err);
    }
);

export const loadMenus = async function(searchKeyword:{type?:string, taste?:string}) {
    // const response = await api.get("/menus");
    return api.get<Menu[]>("/menus", {params: searchKeyword});
};

export const searchMenus = async function(searchKeyword:{type:string, taste:string}) {
    const response = await api.get<Menu[]>("/menus", {
        params: {
            ...searchKeyword
        }
    });

    return response.data;
};

export const deleteMenu = async (id:number) => {
    const response = await api.delete(`/menus/${id}`);
    return response;
};
export const getMenu = async (id:number) => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
};
export const createMenu = async (newMenu:MenuCreate) => {
    const response = await api.post('/menus', newMenu);
    return response;
};
export const updateMenu = async (id:number, newMenu:MenuUpdate) => {
    const response = await api.put(`/menus/${id}`, newMenu);
    return response.data;
};