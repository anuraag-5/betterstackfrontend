"use server";

export const signUpUser = async (username: string, password: string) => {
    const res = await fetch("http://localhost:3001/api/user/signup", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if(res.ok){
        const user = await res.json() as { user_id: string, success: boolean };
        return user;
    }

    return { user_id: "User already exists", success: false };
}