<script>
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import { collection, getDocs } from "firebase/firestore";
    import BookingForm from "$lib/components/BookingForm.svelte";
    import { user } from "$lib/user";

    let locations = [];
    let equipments = [];

    onMount(async () => {
        const locSnapshot = await getDocs(collection(db, "locations"));
        locSnapshot.forEach((doc) => {
            locations.push({ id: doc.id, ...doc.data() });
        });

        const eqSnapshot = await getDocs(collection(db, "equipment"));
        eqSnapshot.forEach((doc) => {
            equipments.push({ id: doc.id, ...doc.data() });
        });
    });
</script>

<div class="p-4">
    <h1 class="text-2xl mb-4">Create a Booking</h1>
    <BookingForm {locations} {equipments} />
</div>

<style>
    /* Add your styles here */
</style>
