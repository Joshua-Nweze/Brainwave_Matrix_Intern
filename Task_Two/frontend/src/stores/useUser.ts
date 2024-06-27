import { defineStore } from "pinia";
import { useAuthStore } from "./useAuth";
import { storeToRefs } from "pinia";

export const useUserStore = defineStore("user", {
    // state: () => ({
    //     user: null,
    // }),

    actions: {
        async editAccount(data: any) {
            let req = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/edit`,
                {
                    method: "PATCH",
                    body: data,
                }
            );
            let res = await req.json();

            return {
                msg: res.msg,
                status: req.status
            };
        },

        async changePassword(currPassword: string, newPassword: string, confirmNewPassword: string) {
            let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)

            let req = await fetch(
                `${import.meta.env.VITE_API_HOST}/api/auth/change-password`,
                {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        currPassword,
                        newPassword,
                        confirmNewPassword,
                        userId: user.value?._id
                    }),
                }
            );
            let res = await req.json();

            return {
                status: req.status,
                msg: res.msg
            }
        },
        
    },
});
