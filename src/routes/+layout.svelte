<script>
    import { onMount } from "svelte";
    import { auth } from "$lib/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import Navbar from "$lib/components/Navbar.svelte";

    import "../app.css";
    import { goto } from "$app/navigation";
    import { user } from "$lib/user";

    onMount(() => {
        onAuthStateChanged(auth, (currentUser) => {
            $user = currentUser;
            if (!currentUser) {
                goto("/login");
            } else {
                goto("/dashboard");
            }
        });
    });
</script>

<Navbar />

<slot />
