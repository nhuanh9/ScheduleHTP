
import "./App.css";import React, { useState } from 'react';

const App = () => {
  const initialData = [
    { startTime: '08:00', endTime: '10:00', day: 'Thứ 2' },
    { startTime: '10:00', endTime: '12:00', day: 'Thứ 3' },
    { startTime: '13:00', endTime: '15:00', day: 'Thứ 4' },
    { startTime: '15:00', endTime: '17:00', day: 'Thứ 5' },
    { startTime: '09:00', endTime: '11:00', day: 'Thứ 6' },
    { startTime: '14:00', endTime: '16:00', day: 'Thứ 7' },
  ];

  const [data, setData] = useState(initialData);
  const [newSchedule, setNewSchedule] = useState({
    day: 'Thứ 2',
    startTime: '',
    endTime: '',
  });

  const getOccupiedTimes = (excludeIndex = -1) => {
    const days = [
      { day: 'Thứ 2', occupiedTimes: [] },
      { day: 'Thứ 3', occupiedTimes: [] },
      { day: 'Thứ 4', occupiedTimes: [] },
      { day: 'Thứ 5', occupiedTimes: [] },
      { day: 'Thứ 6', occupiedTimes: [] },
      { day: 'Thứ 7', occupiedTimes: [] },
    ];

    data.forEach((entry, index) => {
      if (index !== excludeIndex) {
        const dayIndex = days.findIndex(d => d.day === entry.day);
        if (dayIndex !== -1) {
          days[dayIndex].occupiedTimes.push({
            startTime: entry.startTime,
            endTime: entry.endTime,
          });
        }
      }
    });

    return days;
  };

  const isTimeOccupied = (day, startTime, endTime, excludeIndex = -1) => {
    const dayEntry = getOccupiedTimes(excludeIndex).find(d => d.day === day);
    if (dayEntry) {
      return dayEntry.occupiedTimes.some(time =>
          (startTime >= time.startTime && startTime < time.endTime) ||
          (endTime > time.startTime && endTime <= time.endTime) ||
          (startTime <= time.startTime && endTime >= time.endTime)
      );
    }
    return false;
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleSave = (index) => {
    const { day, startTime, endTime } = data[index];
    if (isTimeOccupied(day, startTime, endTime, index)) {
      alert(`Time slot on ${day} from ${startTime} to ${endTime} is already occupied.`);
    } else {
      // Logic lưu dữ liệu có thể được thêm vào đây (ví dụ: gửi dữ liệu đến server)
      console.log('Saved:', data[index]);
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const { day, startTime, endTime } = newSchedule;
    if (isTimeOccupied(day, startTime, endTime)) {
      alert(`Time slot on ${day} from ${startTime} to ${endTime} is already occupied.`);
    } else {
      setData([...data, newSchedule]);
      setNewSchedule({ day: 'Thứ 2', startTime: '', endTime: '' });
    }
  };

  const handleFormChange = (field, value) => {
    setNewSchedule({ ...newSchedule, [field]: value });
  };

  return (
      <div>
        <form onSubmit={handleAddSchedule}>
          <label>
            Day:
            <select
                value={newSchedule.day}
                onChange={(e) => handleFormChange('day', e.target.value)}
            >
              <option value="Thứ 2">Thứ 2</option>
              <option value="Thứ 3">Thứ 3</option>
              <option value="Thứ 4">Thứ 4</option>
              <option value="Thứ 5">Thứ 5</option>
              <option value="Thứ 6">Thứ 6</option>
              <option value="Thứ 7">Thứ 7</option>
            </select>
          </label>
          <label>
            Start Time:
            <input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => handleFormChange('startTime', e.target.value)}
                required
            />
          </label>
          <label>
            End Time:
            <input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => handleFormChange('endTime', e.target.value)}
                required
            />
          </label>
          <button type="submit">Add Schedule</button>
        </form>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {data.map((entry, index) => (
              <tr key={index}>
                <td>
                  <select
                      value={entry.day}
                      onChange={(e) => handleChange(index, 'day', e.target.value)}
                  >
                    <option value="Thứ 2">Thứ 2</option>
                    <option value="Thứ 3">Thứ 3</option>
                    <option value="Thứ 4">Thứ 4</option>
                    <option value="Thứ 5">Thứ 5</option>
                    <option value="Thứ 6">Thứ 6</option>
                    <option value="Thứ 7">Thứ 7</option>
                  </select>
                </td>
                <td>
                  <input
                      type="time"
                      value={entry.startTime}
                      onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                  />
                </td>
                <td>
                  <input
                      type="time"
                      value={entry.endTime}
                      onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSave(index)}>Save</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
