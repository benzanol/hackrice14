import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { RecurringSource } from '../misc/AddSource';

interface CalendarProps {
  recurringEvents: RecurringSource[];
}

const Calendar: React.FC<CalendarProps> = ({ recurringEvents }) => {
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

        if (currentMonth + i === event.month - 1) {
          eventDate = new Date(currentYear, event.month - 1, event.day);
          events.push(createEvent(event, eventDate));
        }
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
        return '#F32121'; // Red
      case 'income':
        return '#21F321'; // Green
      default:
        return '#21F321'; // Green
    }
  };

  const allEvents = recurringEvents.flatMap(generateRecurringEvents);

  return (
    <div className="h-full w-full max-w-6xl mx-auto p-4 box-border">
      <div className="h-full w-full">
        <FullCalendar 
          plugins={[dayGridPlugin]} 
          initialView="dayGridMonth"
          events={allEvents}
          height="auto"
          aspectRatio={1.35}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Calendar;