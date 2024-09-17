<script>
    import { db, storage } from "$lib/firebase";
    import {
        collection,
        addDoc,
        query,
        where,
        getDocs,
    } from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { user } from "$lib/user";
    import dayjs from "dayjs";

    export let locations = [];
    export let equipments = [];

    let bookingDate = "";
    let startTime = "";
    let endTime = "";
    let selectedLocation = "";
    let selectedEquipments = [];
    let comments = "";
    let imageFile = null;

    async function submitBooking() {
        const currentUser = $user;
        if (!currentUser) return;

        // Check for clashes
        const q = query(
            collection(db, "bookings"),
            where("location", "==", selectedLocation),
            where("date", "==", bookingDate),
            where("startTime", "<", endTime),
            where("endTime", ">", startTime),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            if (
                !confirm(
                    "There is a booking clash. Do you still want to proceed?",
                )
            ) {
                return;
            }
        }

        // Add booking
        const docRef = await addDoc(collection(db, "bookings"), {
            userId: currentUser.uid,
            userName: currentUser.displayName || "",
            email: currentUser.email,
            date: bookingDate,
            startTime,
            endTime,
            location: selectedLocation,
            equipment: selectedEquipments,
            comments,
            createdAt: dayjs().toISOString(),
        });

        // Upload image if exists
        if (imageFile) {
            const storageRef = ref(
                storage,
                `booking_images/${docRef.id}/${imageFile.name}`,
            );
            await uploadBytes(storageRef, imageFile);
        }

        // Reset form
        bookingDate = "";
        startTime = "";
        endTime = "";
        selectedLocation = "";
        selectedEquipments = [];
        comments = "";
        imageFile = null;

        alert("Booking submitted successfully!");
    }
</script>

<form on:submit|preventDefault={submitBooking} class="space-y-4">
    <div>
        <label class="block">Date:</label>
        <input
            type="date"
            bind:value={bookingDate}
            required
            class="border px-2 py-1 w-full"
        />
    </div>
    <div>
        <label class="block">Start Time:</label>
        <input
            type="time"
            bind:value={startTime}
            required
            class="border px-2 py-1 w-full"
        />
    </div>
    <div>
        <label class="block">End Time:</label>
        <input
            type="time"
            bind:value={endTime}
            required
            class="border px-2 py-1 w-full"
        />
    </div>
    <div>
        <label class="block">Location:</label>
        <select
            bind:value={selectedLocation}
            required
            class="border px-2 py-1 w-full"
        >
            <option value="" disabled>Select Location</option>
            {#each locations as location}
                <option value={location.name}>{location.name}</option>
            {/each}
        </select>
    </div>
    <div>
        <label class="block">Equipment:</label>
        <select
            bind:value={selectedEquipments}
            multiple
            class="border px-2 py-1 w-full"
        >
            {#each equipments as equipment}
                <option value={equipment.name}>{equipment.name}</option>
            {/each}
        </select>
    </div>
    <div>
        <label class="block">Comments (Optional):</label>
        <textarea bind:value={comments} class="border px-2 py-1 w-full"
        ></textarea>
    </div>
    <div>
        <label class="block">Upload Image (Optional):</label>
        <input type="file" on:change={(e) => (imageFile = e.target.files[0])} />
    </div>
    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
        Submit Booking
    </button>
</form>

<style>
    /* Add your styles here */
</style>
