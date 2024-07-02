import React, { useState } from 'react';

const App = () => {
  const initialData = [
    { days: ['Thứ 2'], startTime: '08:00', endTime: '10:00' },
    { days: ['Thứ 3'], startTime: '10:00', endTime: '12:00' },
    { days: ['Thứ 4'], startTime: '13:00', endTime: '15:00' },
    { days: ['Thứ 5'], startTime: '15:00', endTime: '17:00' },
    { days: ['Thứ 6'], startTime: '09:00', endTime: '11:00' },
    { days: ['Thứ 7'], startTime: '14:00', endTime: '16:00' },
  ];

  const [data, setData] = useState(initialData);
  const [originalData, setOriginalData] = useState(JSON.parse(JSON.stringify(initialData)));
  const [editedRows, setEditedRows] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    days: [],
    startTime: '',
    endTime: '',
  });

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const getOccupiedTimes = (excludeIndex = -1) => {
    const days = daysOfWeek.map(day => ({ day, occupiedTimes: [] }));

    originalData.forEach((entry, index) => {
      if (index !== excludeIndex) {
        entry.days.forEach(day => {
          const dayIndex = days.findIndex(d => d.day === day);
          if (dayIndex !== -1) {
            days[dayIndex].occupiedTimes.push({
              startTime: entry.startTime,
              endTime: entry.endTime,
            });
          }
        });
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
    if (field === 'days') {
      const options = value.target.options;
      const selectedDays = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedDays.push(options[i].value);
        }
      }
      newData[index][field] = selectedDays;
    } else {
      newData[index][field] = value;
    }
    console.log(data)
    console.log(originalData)
    setData(newData);
    if (!editedRows.includes(index)) {
      setEditedRows([...editedRows, index]);
    }
  };

  const handleSave = (index) => {
    const { days, startTime, endTime } = data[index];
    let conflict = false;

    days.forEach(day => {
      if (isTimeOccupied(day, startTime, endTime, index)) {
        alert(`Time slot on ${day} from ${startTime} to ${endTime} is already occupied.`);
        conflict = true;
      }
    });

    if (!conflict) {
      console.log('Saved:', data[index]);
      const newOriginalData = [...originalData];
      newOriginalData[index] = { ...data[index] };
      setOriginalData(newOriginalData);
      setEditedRows(editedRows.filter(row => row !== index));
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const { days, startTime, endTime } = newSchedule;
    let conflict = false;

    days.forEach(day => {
      if (isTimeOccupied(day, startTime, endTime)) {
        alert(`Time slot on ${day} from ${startTime} to ${endTime} is already occupied.`);
        conflict = true;
      }
    });

    if (!conflict) {
      const newEntries = days.map(day => ({
        days,
        startTime,
        endTime,
      }));
      setData([...data, ...newEntries]);
      setOriginalData([...originalData, ...newEntries]); // Update original data to include new entry
      setNewSchedule({ days: [], startTime: '', endTime: '' });
    }
  };

  const handleFormChange = (field, value) => {
    if (field === 'days') {
      const options = value.target.options;
      const selectedDays = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedDays.push(options[i].value);
        }
      }
      setNewSchedule({ ...newSchedule, [field]: selectedDays });
    } else {
      setNewSchedule({ ...newSchedule, [field]: value });
    }
  };

  const handleDaysChange = (e) => {
    const options = e.target.options;
    const selectedDays = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    setNewSchedule({ ...newSchedule, days: selectedDays });
  };

  return (
      <div>
        <form onSubmit={handleAddSchedule}>
          <label>
            Days:
            <select
                multiple
                value={newSchedule.days}
                onChange={handleDaysChange}
            >
              {daysOfWeek.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
              ))}
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
            <th>Days</th>
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
                      multiple
                      value={entry.days}
                      onChange={(e) => handleChange(index, 'days', e)}
                  >
                    {daysOfWeek.map(day => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                    ))}
                  </select>
                  <div>
                    {entry.days.map(day => (
                        <span key={day} style={{ display: 'inline-block', marginRight: '5px' }}>
                      {day}
                    </span>
                    ))}
                  </div>
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
                  <button
                      onClick={() => handleSave(index)}
                      disabled={!editedRows.includes(index)}
                  >
                    Save
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <button onClick={() => console.log(getOccupiedTimes())}>Check Occupied Times</button>
      </div>
  );
};

export default App;
// T2 8-10 -> T2 8-9: ok