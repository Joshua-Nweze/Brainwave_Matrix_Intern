import { defineStore } from "pinia";
import { useAuthStore } from "./useAuth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { IBlog } from "@/types/BlogTypes";

interface BlogState {
    blogs: IBlog[] | null;
	myBlogs: IBlog[] | null;
    page: number;
	otherBlogs: IBlog[] | null | string;
	allRetrieved: boolean;
}

interface BlogData {
	id: string;
	title: string;
	thumbnail: string;
	category: string;
	body: string;
}

export const useBlogStore = defineStore("blog", {
    state: (): BlogState => ({
        blogs: null,
		myBlogs: null,
        page: 0,
		otherBlogs: null,
		allRetrieved: false
    }),

    actions: {
        async getBlogs() {
            try {
                const req = await fetch(`${import.meta.env.VITE_API_HOST}/api/get-blogs?p=${this.page}`);
                const res = await req.json();

                const newBlogs: IBlog[] = res.msg;
				this.allRetrieved = res.allRetrieved

				// console.log(res.allRetrieved)
				if (this.allRetrieved) {
                    return;
                }

                if (!this.blogs) {
					this.blogs = newBlogs.filter(newBlog => !this.blogs?.find(blog => blog.id === newBlog.id));
				} else {
					newBlogs.forEach(newBlog => {
						if (!this.blogs?.find(blog => blog.id === newBlog.id)) {
							this.blogs?.push(newBlog);
						}
					});
				}

                this.page++; 

            } catch (error) {
                console.error('Error fetching blogs:', error);
                // Handle error state if needed
            }
        },

		async getBlog(id: string): Promise<any> {
			let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/get-blog?id=${id}`);
            let res = await req.json();

			// get other blogs to recommend
			this.getOtherBlogs(id)

			return res.msg
		},

		async getOtherBlogs(exclude: string){
			await this.getBlogs()
			if (this.blogs) {
				const filteredArray = (this.blogs as any).filter((item: IBlog) => item._id !== exclude);

				const randomBlogs = [];
			
				// Generate random indices until we have 6 unique items
				while (randomBlogs.length < 6 && filteredArray.length > 0) {
					// Generate random index
					const randomIndex = Math.floor(Math.random() * filteredArray.length);
			
					// Add item at randomIndex to randomItems array
					randomBlogs.push(filteredArray[randomIndex]);
			
					// Remove selected item from filteredArray to prevent duplicates
					filteredArray.splice(randomIndex, 1);
				}

				this.otherBlogs = randomBlogs
			} else {
				this.otherBlogs = 'Nothing to show'
			}
		},

		async getUserBlogs() {
			let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)

            let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/my-blogs?id=${user.value?._id}`);
            let res = await req.json();

			this.page ++

			this.myBlogs = res.msg
        },

		async likeBlog(blogId: string){	
			let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)
			console.log(user.value)

			if (user.value) {
				let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/like`, {
					method: 'PATCH',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						blogId,
						userId: user.value._id
					})
				});

				let res = await req.json()

				return {
					msg: res.msg,
					status: req.status
				}
			} else {
				return {
					msg: "Log in or create account to like blog.",
					status: 401
				} 
			}
		},

		async commentBlog(blogId: string, comment: string){	
			let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)

			comment = comment.trim()

			if (comment == "" || !comment) {
				return {
					msg: "Comment must not be empty",
					status: 401
				}
			}

			if (user.value) {
				let profilePic: any
				if (user.value.profilePic) {
					profilePic = user.value.profilePic.imageBase64
				} else {
					profilePic = null
				}

				let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/comment`, {
					method: 'PATCH',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						blogId,
						comment,
						id: user.value._id,
						name: `${user.value.firstName} ${user.value.lastName}`,
						profilePic
					}),
					credentials: 'include'

				});

				let res = await req.json()

				return {
					msg: res.msg,
					status: req.status
				}
			} else {
				return {
					msg: "Log in or create account to comment.",
					status: 401
				} 
			}
		},

		async deleteBlogComment(blogId: string, commentId: string){	
			let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)

			if (user.value) {
				let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/delete-comment`, {
					method: 'DELETE',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						blogId,
						commentId,
						userId: user.value._id
					})
				});

				let res = await req.json()
				console.log(res)

				return {
					msg: res.msg,
					status: req.status
				}
			}
		},

		async postBlog(blogData: any){

			let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/create`, {
				method: 'POST',
				body: blogData
			});

			let res = await req.json()

			await this.getBlogs()

			return {
				msg: res.msg,
				status: req.status
			}

		},

		async deleteBlog(blogId: string){
			let authStore = useAuthStore()
			let { user } = storeToRefs(authStore)

			let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/delete`, {
				method: 'DELETE',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					blogId,
					id: user.value?._id
				})
			});

			let res = await req.json()

			return {
				msg: res.msg,
				status: req.status
			}
		},

		async editBlog(data: any){
			let req = await fetch(`${import.meta.env.VITE_API_HOST}/api/blog/edit`, {
				method: 'PATCH',
				body: data
			});
			let res = await req.json()

			return {
				msg: res.msg,
				status: req.status
			}
		}
    },
});