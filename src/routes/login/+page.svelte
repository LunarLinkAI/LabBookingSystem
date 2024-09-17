<script>
    import { goto } from "$app/navigation";
    import { auth, provider, db } from "$lib/firebase";
    import { signInWithPopup } from "firebase/auth";
    import { collection, doc, setDoc, getDoc } from "firebase/firestore";

    async function signIn() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDoc);
            if (!docSnap.exists()) {
                const name = prompt("Enter your name");
                await setDoc(userDoc, {
                    name: name || user.displayName,
                    email: user.email,
                });
            }
            goto("/");
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="flex items-center justify-center h-screen">
    <button on:click={signIn} class="px-4 py-2 bg-blue-500 text-white rounded">
        Sign in with Google
    </button>
</div>

<style>
    /* Add your styles here */
</style>
