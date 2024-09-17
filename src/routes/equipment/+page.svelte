<script>
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import { collection, getDocs, addDoc } from "firebase/firestore";

    let equipment = [];
    let newEquipment = "";

    onMount(async () => {
        const querySnapshot = await getDocs(collection(db, "equipment"));
        querySnapshot.forEach((doc) => {
            equipment.push({ id: doc.id, ...doc.data() });
        });
    });

    async function addEquipment() {
        if (newEquipment.trim() === "") return;
        const docRef = await addDoc(collection(db, "equipment"), {
            name: newEquipment.trim(),
        });
        equipment.push({ id: docRef.id, name: newEquipment.trim() });
        newEquipment = "";
    }
</script>

<div class="p-4">
    <h1 class="text-2xl mb-4">Equipment</h1>
    <div class="mb-4">
        <input
            type="text"
            bind:value={newEquipment}
            placeholder="New Equipment"
            class="border px-2 py-1 mr-2"
        />
        <button
            on:click={addEquipment}
            class="px-4 py-1 bg-green-500 text-white rounded"
        >
            Add
        </button>
    </div>
    <ul>
        {#each equipment as item}
            <li class="mb-2">{item.name}</li>
        {/each}
    </ul>
</div>
