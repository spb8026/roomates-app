import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useEffect, useRef, useState } from "react";

interface Event {
  title: string;
  startTime: string; // e.g., "10:00"
  endTime: string; // e.g., "12:00"
  dayIndex: number; // 0 for Sunday, 1 for Monday, etc.
}

export default function CalendarPage() {
    const [month, setMonth] = useState<string>("");
    const [days, setDays] = useState<string[]>([]);
    const [timeSlots] = useState<string[]>(
      Array.from({ length: 24 }, (_, i) => `${i % 12 || 12} ${i < 12 ? "AM" : "PM"}`)
    );
  
    const [events] = useState<Event[]>([
      { title: "Christmas Eve", startTime: "10:00", endTime: "14:00", dayIndex: 2 },
      { title: "Christmas Day", startTime: "9:00", endTime: "15:00", dayIndex: 3 },
      { title: "Morning Meeting", startTime: "8:00", endTime: "10:30", dayIndex: 1 },
    ]);
  
    useEffect(() => {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const currentDate = new Date();
      const currentMonth = monthNames[currentDate.getMonth()];
      setMonth(currentMonth);
  
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  
      const week = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return `${weekDays[day.getDay()]} ${day.getDate()}`;
      });
      setDays(week);
    }, []);
  
    const calculateEventPosition = (startTime: string, endTime: string) => {
      const parseTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const duration = end - start;
  
      return {
        top: `${(start / (24 * 60)) * 100}%`,
        height: `${(duration / (24 * 60)) * 100}%`,
      };
    };
  
    const styles = {
      calendarContainer: {
        color: "#fff",
        backgroundColor: "#181818",
        padding: "20px",
        borderRadius: "10px",
        width: "80%",
        overflow: "hidden"
      },
      calendarHeader: {
        marginBottom: "20px",
      },
      headerTitle: {
        fontSize: "24px",
        color: "#ffffff",
      },
      calendarBody: {
        display: "flex",
        gap: "10px",
      },
      timeColumn: {
        paddingTop: "50px",
        width: "50px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-end",
        marginRight: "10px",
      },
      timeSlot: {
        display: "flex", // Added for centering
        alignItems: "center", // Added for vertical centering
        justifyContent: "flex-end", // Align text to the right
        position: "relative" as const,
        height: "60px",
        fontSize: "12px",
        paddingRight: "5px",
        color: "#a0a0a0",
        borderBottom: "1px solid #333",
      },
      
      weekGrid: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "5px",
        height: "200%",
        overflow: "scroll"
      },
      dayColumn: {
        position: "relative" as const,
        display: "flex",
        flexDirection: "column" as const,
        backgroundColor: "#222",
        borderRadius: "10px",
        height: "100%" 
      },
      
      dayHeader: {
        position: "sticky",
        top: "0",
        textAlign: "center" as const,
        padding: "10px",
        fontWeight: "bold",
        color: "#ffffff",
        borderBottom: "1px solid #333",
        backgroundColor: "#222", // Ensure background color persists when sticky
        zIndex: 2, // Ensure the header appears above other content
      },
      
      dayEvents: {
        flex: 1,
        position: "relative" as const,
      },
      event: {
        position: "absolute" as const,
        left: "10px",
        right: "10px",
        padding: "5px",
        borderRadius: "5px",
        fontSize: "12px",
        color: "#fff",
        backgroundColor: "#4CAF50",
      },
      timeLine: {
        position: "absolute" as const,
        left: "0",
        right: "0",
        height: "1px",
        backgroundColor: "#444",
        zIndex: 1,
      },
      pageContainer: {
        display: "flex",
        height: "90vh"
      },
      dayEventGrid: {
        position: "relative" as const,
        flex: 1,
        overflow: "hidden",
      }
    };
  
    return (
    <div style={styles.pageContainer}>
        <div style={styles.calendarContainer}>
            <h2>
                {month}
            </h2>
            <div style={styles.weekGrid}>
            <div style={styles.timeColumn}>
                <div style={styles.dayEventGrid}>
                    {timeSlots.map((time, timeIndex) => (
                    <div key={timeIndex} style={styles.timeSlot}>{time}</div>
                    ))}
                </div>
                </div>
                {days.map((day, dayIndex) => (
                <div key={dayIndex} style={styles.dayColumn}>
                  <div style={styles.dayHeader}>{day}</div>
                  <div style={styles.dayEventGrid}>
                    {timeSlots.map((_, timeIndex) => (
                      <div
                        key={timeIndex}
                        style={{
                          ...styles.timeLine,
                          top: `${(timeIndex / timeSlots.length) * 100}%`,
                        }}
                      />
                    ))}
                    {events
                      .filter((event) => event.dayIndex === dayIndex)
                      .map((event, index) => {
                        const position = calculateEventPosition(event.startTime, event.endTime);
                        return (
                          <div
                            key={index}
                            style={{
                              ...styles.event,
                              top: position.top,
                              height: position.height,
                            }}
                          >
                            {event.title}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>
    );
  }
  