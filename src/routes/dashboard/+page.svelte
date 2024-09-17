<script>
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { user } from "$lib/user";
    import BookingCalendar from "$lib/components/BookingCalendar.svelte";

    let bookings = [];

    onMount(async () => {
        const currentUser = $user;
        if (currentUser) {
            const q = query(
                collection(db, "bookings"),
                where("userId", "==", currentUser.uid),
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() });
            });
        }
    });
</script>

<div class="p-4">
    <h1 class="text-2xl mb-4">Your Bookings</h1>
    <BookingCalendar {bookings} />
</div>

<style>
    /* Add your styles here */
</style>
