import { defineStore } from "pinia";
import Cookies from "js-cookie";
import type { IUser } from '../types/UserTypes'

interface ProfilePic {
    path: string;
    imageBase64: string;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: ProfilePic;
}

interface IAuthState {
    token: any | null;
    user: User | null;
}

export const useAuthStore = defineStore("auth", {
    state: (): IAuthState => ({
        token: null,
        user: null,
    }),

    actions: {
        async login(email: string, password: string) {
            let req = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let res = await req.json();

            if (req.status == 200) {
                Cookies.set("token", res.token, { expires: 2 });
                await this.getUser(email);
            }

            return {
                msg: res.msg,
                status: req.status,
                token: res.token,
            };
        },

        async getUser(email: string) {
            let req = await fetch(
                `${
                    import.meta.env.VITE_API_HOST
                }/api/auth/get-user?email=${email}`
            );
            let res = await req.json();

            if (req.status == 200) {
                this.user = res.msg;
            } else {
                // TODO: logout function here
                this.user = null;
            }
        },

        async checkAuth() {
            let token = Cookies.get("token");

            let req = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/validate-token`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let res = await req.json();

            if (req.status == 200) {
                await this.getUser(res.msg);
            } else {
                this.user = null;
            }
            return res;
        },

        logout(){
            Cookies.remove("token")
            this.user = null
        },

        async createAccount(data: Partial<IUser>) {
            console.log(data)
            let req = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/create`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            );
            let res = await req.json()
            console.log(res)

            return {
                msg: res.msg,
                status: req.status,
            };
        },

        async getUserProfilePic(id: string) {
            let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/auth/get-user-dp?id=${id}`);
            let res = await req.json()
            
            if (req.status == 200) {
                return res.msg
            } else {
                return "Not found"
            }
        }
    },
});
