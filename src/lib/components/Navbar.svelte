<script>
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase";
    import { signOut } from "firebase/auth";
</script>

<nav class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div class="text-lg font-bold">Lab Booking System</div>
    <div class="space-x-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/bookings">Bookings</a>
        <a href="/locations">Locations</a>
        <a href="/equipment">Equipment</a>
        <button
            on:click={() => {
                signOut(auth);
                goto("/login");
            }}
        >
            Sign Out
        </button>
    </div>
</nav>

<style>
    /* Add your styles here */
</style>
