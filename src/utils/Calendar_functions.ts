export const isToday = (year: number, month: number, date: number): boolean => {
  const today = new Date();
  const d = new Date(year, month, date);
  return today.toDateString() === d.toDateString();
};

export const adjustCellHeights = (cellRefs) => {
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

export const btnClass = (limit) => {
  return "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none";
};

export const eventClass = (t) => {
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

export const handleDragStart = (e, event, draggedItem) => {
  draggedItem.current = event.task_id;
  e.dataTransfer.setData("text/plain", event.task_id);
};

export const handleDragOver = (e) => {
  e.preventDefault();
};

export const handleDragEnter = (e, s) => {
  e.preventDefault()
  if (e.target.closest(`.${s.adaptive}`)) {
    e.target.closest(`.${s.adaptive}`).classList.add(s.dragover)
  }
};

export const handleDragLeave = (e, s) => {
  if (e.target.closest(`.${s.adaptive}`)) {
    e.target.closest(`.${s.adaptive}`).classList.remove(s.dragover)
  }
};




