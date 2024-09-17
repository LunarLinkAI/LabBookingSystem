<script>
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import { collection, getDocs, addDoc } from "firebase/firestore";
    import BookingForm from "$lib/components/BookingForm.svelte";

    let locations = [];
    let newLocation = "";

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "locations"));
        querySnapshot.forEach((doc) => {
            locations.push({ id: doc.id, ...doc.data() });
        });
    });

    async function addLocation() {
        if (newLocation.trim() === "") return;
        const docRef = await addDoc(collection(db, "locations"), {
            name: newLocation.trim(),
        });
        locations.push({ id: docRef.id, name: newLocation.trim() });
        newLocation = "";
    }
</script>

<div class="p-4">
    <h1 class="text-2xl mb-4">Locations</h1>
    <div class="mb-4">
        <input
            type="text"
            bind:value={newLocation}
            placeholder="New Location"
            class="border px-2 py-1 mr-2"
        />
        <button
            on:click={addLocation}
            class="px-4 py-1 bg-green-500 text-white rounded"
        >
            Add
        </button>
    </div>
    <ul>
        {#each locations as location}
            <li class="mb-2">{location.name}</li>
        {/each}
    </ul>
</div>
