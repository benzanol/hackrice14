import { Box, Button } from '@mui/material';
import * as React from 'react';

const daysOfWeek = [
  { label: 'M', value: 1 }, // Monday
  { label: 'T', value: 2 }, // Tuesday
  { label: 'W', value: 3 }, // Wednesday
  { label: 'R', value: 4 }, // Thursday
  { label: 'F', value: 5 }, // Friday
  { label: 'S', value: 6 }, // Saturday
  { label: 'U', value: 7 }, // Sunday
];

interface DaySelectorProps {
  onChange: (dayIndex: number) => void;
  selected: number,
  count?: number,
}

const WeekdaySelector: React.FC<DaySelectorProps> = ({ onChange, selected, count }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      {Array.from(Array(count), (_, week) => (
        daysOfWeek.map((day) => {
          const index = day.value + week*7;
          return (
            <Button
              key={index}
              onClick={() => onChange(index)}
              variant={index == selected ? "contained" : "outlined"}
              sx={{ margin: "0 4px", minWidth: "40px", borderRadius: "15px" }}
            >
              {day.label}
            </Button>
          );
        })
      ))}
    </Box>
  );
};

                                 export default WeekdaySelector;
