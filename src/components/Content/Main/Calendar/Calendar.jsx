import React, { useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import s from "./Calendar.module.css"
import classNames from "./helper.ts";
import "./style.css"
import CalendarMonth from './Calendarmonth';
import { useRef } from 'react';
import useStore from "../../../../store/useToDoStore.js";
import { monthNames, days } from "../../../../constants/index.js"
import {  isToday, adjustCellHeights, btnClass, 
          eventClass, handleDragOver, handleDragEnter, 
          handleDragStart, handleDragLeave } 
from "../../../../utils/Calendar_functions.js"
const Calendar = () => {
  
  const openTaskInfoS = useStore((state) => state.openTaskInfoS)
  const getTaskInfo = useStore((state) => state.getTaskInfo)
  const getTaskStatus = useStore((state) => state.getTaskStatus)
  const tasks = useStore((state) => state.tasks)
  const events = useStore((state) => state.events)
  const handleNewData = useStore((state) => state.handleNewData)
  const month = useStore((state) => state.month)
  const year = useStore((state) => state.year)
  const numOfDays = useStore((state) => state.numOfDays)
  const emptyDays = useStore((state) => state.emptyDays)
  const getNoOfDays = useStore((state) => state.getNoOfDays)
  const nextMonth = useStore((state) => state.nextMonth)
  const prevMonth = useStore((state) => state.prevMonth)
  const goToCurrentMonth = useStore((state) => state.goToCurrentMonth)
  const fetchCategories = useStore((state) => state.fetchCategories)
  const handleDrop = useStore((state) => state.handleDrop)
  const cellRefs = useRef([]);
  const draggedItem = useRef(null);

  fetchCategories()
  
  useEffect(() => {
    if (cellRefs.current) {
      adjustCellHeights(cellRefs);
    }
  }, [events, month]);

  useEffect(() => {
    getNoOfDays();
  }, [month]);

  useEffect(() => {
    handleNewData(tasks);
  }, [tasks]);

  return (
    <>
      <div className="container mx-auto py-4 px-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className={["flex items-center justify-between px-6 py-4", s.container_adaptive].join(" ")}>
            <div className={s.content}>
              <div className={s.content_flex}>
                <span className="text-lg font-bold text-gray-800">
                  {monthNames[month]}
                  <CalendarMonth/>
                </span>
                <span className={["ml-1 text-lg text-gray-600 font-normal", s.year].join(" ")}>
                  {year}
                </span>
              </div>
              <button onClick={goToCurrentMonth} className={s.current_day}>Текущий месяц</button>
            </div>
            <div className={s.click}>
              <button onClick={openTaskInfoS} className={s.addtask}>Добавить задачу</button>
              <div className={["border rounded-lg px-1 pt-1", s.arrow].join(" ")}>
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
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
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
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, date, draggedItem, s)}
                  onDragEnter={(e) => handleDragEnter(e, s)}
                  onDragLeave={(e) => handleDragLeave(e, s)}
                  onClick={openTaskInfoS}
                  key={index}
                  data-date={`${year}-${month + 1}-${date}`}
                  className={["px-4 pt-2 border-r border-b relative w-[14.28%] min-h-[8rem]", s.adaptive].join(" ")}
                >
                  <div
                    style={{ marginTop: "20px" }}
                    className={classNames(
                      isToday(year, month, date)
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
                            onDragStart={(event) => handleDragStart(event, e, draggedItem)}
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