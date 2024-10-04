import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to get the current month name and year
  const getMonthYear = () => {
    return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Function to get the number of days in the current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  };

  // Generate array for days of the month
  const daysInMonth = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  // Function to handle month change
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(newDate);
  };

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.header}>
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <h2>{getMonthYear()}</h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} style={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      <div style={styles.daysGrid}>
        {/* Empty slots for the first row (to align the start of the month) */}
        {Array.from({ length: getFirstDayOfMonth() }).map((_, idx) => (
          <div key={idx} style={styles.emptyDay}></div>
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day) => (
          <div key={day} style={styles.day}>
            <span style={styles.dayNumber}>{day}</span>
            <div style={styles.dayContent}>
              {/* Content for each day (you can add events or notes here) */}
              Add info here
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    margin: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '10px',
  },
  weekDays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
  },
  weekDay: {
    textAlign: 'center' as 'center',
    fontWeight: 'bold' as 'bold',
    color: '#333',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '10px',
    width: '100%',
    maxWidth: '600px',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  day: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center' as 'center',
    borderRadius: '5px',
  },
  dayNumber: {
    fontWeight: 'bold' as 'bold',
    marginBottom: '10px',
  },
  dayContent: {
    fontSize: '12px',
    color: '#666',
  },
};

export default Calendar;
