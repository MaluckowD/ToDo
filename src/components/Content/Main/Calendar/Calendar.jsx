import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import s from "./Calendar.module.css"
import classNames from "./helper.ts";
import "./style.css"
import { monthNames, days } from "../../../../constants/index.js"
import CalendarMonth from './Calendarmonth';
import { useRef } from 'react';
import { taskInfoApi, editTaskApi } from "../../../../api/api.ts"
import useStore from "../../../../store/useToDoStore.js";

const Calendar = (props) => {

  const openTaskInfoS = useStore((state) => state.openTaskInfoS)
  const updateTasks = useStore((state) => state.updateTasks)
  const getTaskInfo = useStore((state) => state.getTaskInfo)
  const getTaskStatus = useStore((state) => state.getTaskStatus)
  const tasks = useStore((state) => state.tasks)
  const events = useStore((state) => state.events)
  const handleNewData = useStore((state) => state.handleNewData)
  const nextMonth = useStore((state) => state.nextMonth)
  const prevMonth = useStore((state) => state.prevMonth)
  const updateMonthYear = useStore((state) => state.updateMonthYear)
  
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [numOfDays, setNumOfDays] = useState([]);
  const [emptyDays, setEmptyDays] = useState([]);
  const cellRefs = useRef([]);
  const draggedItem = useRef(null);

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  useEffect(() => {
    if (cellRefs.current) {
      adjustCellHeights();
    }
  }, [events, month]);

  const adjustCellHeights = () => {
    cellRefs.current.forEach((cell, index) => {
      if (cell) {
        const contentDiv = cell.querySelector('.tasks-container');
        if (contentDiv) {
          if (contentDiv.scrollHeight > 0) {
            cell.style.height = `${32 + (contentDiv.scrollHeight)}px`;
          } else if (cell.style.height !== '8rem') {
            cell.style.height = `8rem`;
          }
        }
      }
    })
  }

  const getNoOfDays = () => {
    let i;
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();
    let emptyDaysArray = [];
    if (dayOfWeek === 0) {
      for (i = 1; i <= 6; i++) {
        emptyDaysArray.push(i);
      }
    } else {
      for (i = 1; i <= dayOfWeek - 1; i++) {
        emptyDaysArray.push(i);
      }
    }
    let daysArray = [];
    for (i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setEmptyDays(emptyDaysArray);
    setNumOfDays(daysArray);
  };

  useEffect(() => {
    getNoOfDays();
  }, [month]);

  useEffect(() => {
    handleNewData(tasks);
  }, [tasks]);

  const btnClass = (limit) => {
    return "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none";
  };

  const eventClass = (t) => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
        : null;
    };

    const rgb = hexToRgb(t);

    if (!rgb) {
      return {
        borderColor: '#fff',
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
      };
    }

    const { r, g, b } = rgb;
    const isLightBackground = (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    const textColor = isLightBackground ? '#000' : '#fff';

    return {
      borderColor: t,
      color: textColor,
      backgroundColor: `rgb(${r},${g},${b},1)`,
      textAlign: 'center',
    }

  };

  const goToCurrentMonth = () => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
  };

  const handleDragStart = (e, event) => {
    draggedItem.current = event.task_id;
    e.dataTransfer.setData("text/plain", event.task_id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (e) => {
    e.preventDefault()
    if (e.target.closest(`.${s.adaptive}`)) {
      e.target.closest(`.${s.adaptive}`).classList.add(s.dragover)
    }
  };
  const handleDragLeave = (e) => {
    if (e.target.closest(`.${s.adaptive}`)) {
      e.target.closest(`.${s.adaptive}`).classList.remove(s.dragover)
    }
  };
  const handleDrop = async (e, date) => {
    if (e.target.closest(`.${s.adaptive}`)) {
      e.target.closest(`.${s.adaptive}`).classList.remove(s.dragover)
    }
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (draggedItem.current && taskId) {
      try {
        const response = await taskInfoApi(taskId)
        const newDate = new Date(year, month, date + 1)
        const taskData = {
          ...response,
          date: newDate.toISOString().slice(0, 10)
        };
        await editTaskApi(taskId, taskData)
        updateTasks()
      } catch (error) {
        console.error('Ошибка при загрузке задачи для перетаскивания:', error);
      }
      draggedItem.current = null
    }
  };

  return (
    <>
      <div className="container mx-auto py-4 px-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className= {["flex items-center justify-between px-6 py-4", s.container_adaptive].join(" ")}>
            <div className={s.content}>
              <div className={s.content_flex}>
                <span className="text-lg font-bold text-gray-800">
                  {monthNames[month]}
                  <CalendarMonth updateMonthAndYear={updateMonthYear} year={year} />
                </span>
                <span className={["ml-1 text-lg text-gray-600 font-normal",s.year].join(" ")}>
                  {year}
                </span>
              </div>
              <button onClick={goToCurrentMonth} className={s.current_day}>Текущий месяц</button>
            </div>
            <div className={s.click}>
              <button onClick={openTaskInfoS} className={s.addtask}>Добавить задачу</button>
              <div className={["border rounded-lg px-1 pt-1",s.arrow].join(" ")}>
                <button
                  type="button"
                  onClick={() => prevMonth()}
                  disabled={false}
                  className={btnClass(0)}
                >
                  <ArrowLeftIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                </button>
                <div className="border-r inline-flex h-6" />
                <button
                  type="button"
                  onClick={() => nextMonth()}
                  disabled={false}
                  className={btnClass(11)}
                >
                  <ArrowRightIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                </button>
              </div>
            </div>
          </div>
          <div className="-mx-1 -mb-1">
            <div
              className="flex flex-wrap -mb-8 border-t"
              style={{ marginBottom: "-37px" }}>
              {days.map((day) => (
                <div key={day} className={"px-2 py-2 w-[14.28%]"}>
                  <div  className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap">
              {emptyDays.map((emptyDay) => (
                <div
                  key={emptyDay}
                  className="text-center border-r border-b px-4 pt-2 min-h-[8rem] w-[14.28%]"
                />
              ))}
              {numOfDays.map((date, index) => (
                <div
                  ref={el => cellRefs.current[index] = el}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, date)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onClick={openTaskInfoS}
                  key={index}
                  data-date={`${year}-${month + 1}-${date}`}
                  className={["px-4 pt-2 border-r border-b relative w-[14.28%] min-h-[8rem]", s.adaptive].join(" ")}
                >
                  <div
                    style={{ marginTop: "20px" }}
                    className={classNames(
                      isToday(date)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-200", s.day_container,
                      "inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                    )}
                  >
                    {date}
                  </div>
                  <div className=" mt-1">
                    {events
                      .filter(
                        (e) =>
                          new Date(e.event_date).toDateString() ===
                          new Date(year, month, date).toDateString()
                      )
                      .map((e) => {
                        const eventStyles = eventClass(e.event_theme);
                        const taskStatus = getTaskStatus(e.task_id);
                        return (
                          <div
                            key={e.event_title}
                            draggable="true"
                            onDragStart={(event) => handleDragStart(event, e)}
                            className={classNames(
                              "px-2 py-1 rounded-lg mt-1 overflow-hidden border"
                            )}
                            onClick={
                              (event) => {
                                event.stopPropagation();
                                getTaskInfo(e.task_id);
                              }
                            }
                            id={e.task_id}
                            style={{
                              margin: '5px',
                              cursor: 'pointer',
                              borderColor: eventStyles.borderColor,
                              backgroundColor: eventStyles.backgroundColor,
                              color: eventStyles.color,
                              textDecoration: taskStatus.completed && taskStatus.statusId !== 0 ? 'line-through' : 'none',
                              textDecorationThickness: taskStatus.completed && taskStatus.statusId !== 0 ? '2px' : '0',
                              opacity: taskStatus.completed && taskStatus.statusId !== 0 ? '50%' : '1'
                            }}
                          >
                            <p style={{ wordWrap: 'break-word', whiteSpace: 'normal' }} className="text-sm truncate leading-tight">
                              {e.event_title}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;