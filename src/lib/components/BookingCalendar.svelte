<script>
    import { onMount } from "svelte";
    import dayjs from "dayjs";
    import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
    dayjs.extend(isSameOrAfter);

    export let bookings = [];

    let timetable = {};

    onMount(() => {
        // Initialize timetable for the next week
        const start = dayjs().startOf("day");
        const end = start.add(7, "day");
        for (let i = 0; i < 7; i++) {
            let day = start.add(i, "day").format("YYYY-MM-DD");
            timetable[day] = {};
            for (let hour = 0; hour < 24; hour++) {
                timetable[day][hour] = [];
            }
        }

        bookings.forEach((booking) => {
            const date = dayjs(booking.date).format("YYYY-MM-DD");
            const startHour = dayjs(booking.startTime, "HH:mm").hour();
            const endHour = dayjs(booking.endTime, "HH:mm").hour();
            for (let hour = startHour; hour < endHour; hour++) {
                if (timetable[date] && timetable[date][hour]) {
                    timetable[date][hour].push(booking);
                }
            }
        });
    });
</script>

<div class="overflow-auto">
    <table class="min-w-full border">
        <thead>
            <tr>
                <th class="border px-2">Time</th>
                {#each Object.keys(timetable) as day}
                    <th class="border px-2">{day}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each Array.from({ length: 24 }) as _, hour}
                <tr>
                    <td class="border px-2">{hour}:00 - {hour + 1}:00</td>
                    {#each Object.keys(timetable) as day}
                        <td class="border px-2">
                            {#each timetable[day][hour] as booking}
                                <div class="bg-blue-200 p-1 mb-1 rounded">
                                    <p>{booking.userName}</p>
                                    <p>{booking.equipment.join(", ")}</p>
                                    <p>{booking.comments}</p>
                                </div>
                            {/each}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        min-width: 100px;
        vertical-align: top;
    }
</style>
