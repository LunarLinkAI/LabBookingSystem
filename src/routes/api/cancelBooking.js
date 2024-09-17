// src/routes/api/cancelBooking.js
import { db, auth } from '$lib/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function POST({ request }) {
  const { bookingId } = await request.json();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  const bookingRef = doc(db, 'bookings', bookingId);
  const bookingSnap = await getDoc(bookingRef);

  if (!bookingSnap.exists()) {
    return {
      status: 404,
      body: { error: 'Booking not found' }
    };
  }

  const booking = bookingSnap.data();

  if (booking.userId !== currentUser.uid) {
    return {
      status: 403,
      body: { error: 'Forbidden' }
    };
  }

  const now = new Date();
  const bookingStart = new Date(booking.date + ' ' + booking.startTime);
  if (now >= bookingStart) {
    return {
      status: 400,
      body: { error: 'Cannot cancel after the booking has started' }
    };
  }

  await deleteDoc(bookingRef);

  return {
    status: 200,
    body: { message: 'Booking cancelled successfully' }
  };
}
