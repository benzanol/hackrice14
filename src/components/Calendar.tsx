import React, { useContext } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { RecurringSource } from '../misc/AddSource';
import { RecurringContext } from '../App';

interface CalendarProps {
}

const Calendar: React.FC<CalendarProps> = () => {
  const [recurringEvents, _] = useContext(RecurringContext);

  const generateRecurringEvents = (event: RecurringSource) => {
    const events = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    for (let i = 0; i < 12; i++) {
      let eventDate: Date;

      if (event.period === 'weekly') {
        const startOfMonth = new Date(currentYear, currentMonth + i, 1);
        const dow = startOfMonth.getDay();
        for (let week = 0; week < 4; week++) {
          eventDate = new Date(currentYear, currentMonth + i, event.day + (week * 7) - dow);
          events.push(createEvent(event, eventDate));
        }
      } else if (event.period === 'monthly') {
        eventDate = new Date(currentYear, currentMonth + i, event.day);
        events.push(createEvent(event, eventDate));
      } else if (event.period === 'yearly') {

        //if (currentMonth + i === eventDate.month - 1) {
        //  eventDate = new Date(currentYear, eventDate.month - 1, event.day);
        //  events.push(createEvent(event, eventDate));
        //}
      }
    }

    return events;
  };

  const createEvent = (event: RecurringSource, date: Date) => ({
    title: `${event.name}: $${event.amount}`,
    date: date.toISOString().split('T')[0],
    color: getEventColor(event.type),
  });

  const getEventColor = (eventType: string) => {

    switch (eventType) {
      case 'subscriptions':
        return '#2196F3'; // Blue
      case 'bills':
        return '#d32121'; // Red
      case 'income':
        return '#21b321'; // Green
      default:
        return '#21b321'; // Green
    }
  };

  const allEvents = recurringEvents.flatMap(generateRecurringEvents);

  return (
    <div className="max-w-6xl h-full mx-auto">
      <div className="h-full w-full">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={allEvents}
          height="auto"
          aspectRatio={1.35}
        />
      </div>
    </div>
  );
};

export default Calendar;
