
export const isToday = (year: number, month: number, date: number): boolean => {
  const today = new Date();
  const d = new Date(year, month, date);
  return today.toDateString() === d.toDateString();
};

export const adjustCellHeights = (cellRefs: React.RefObject<HTMLDivElement[]>): void => {
  cellRefs.current.forEach((cell) => {
    if (cell) {
      const contentDiv = cell.querySelector('.tasks-container') as HTMLDivElement | null;
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

export const btnClass = (limit: number): string => {
  return "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none";
};

interface EventClassResult {
  borderColor: string;
  color: string;
  backgroundColor: string;
  textAlign: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

export const eventClass = (t: string): EventClassResult => {
  const hexToRgb = (hex: string): RGB | null => {
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

interface Event {
  event_date: string | Date;
  event_theme: string;
  task_id: string;
  event_title: string;
}

export const handleDragStart = (e: React.DragEvent<HTMLDivElement>, event: Event, draggedItem: React.MutableRefObject<string | null>): void => {
  draggedItem.current = event.task_id;
  e.dataTransfer.setData("text/plain", event.task_id);
};

export const handleDragOver = (e: React.DragEvent): void => {
  e.preventDefault();
};

interface Styles {
  [key: string]: string;
}

export const handleDragEnter = ( e: React.DragEvent<HTMLDivElement>, s: Styles ): void => {
  e.preventDefault();

  const target = e.target as HTMLElement;

  const closestElement = target.closest(`.${s.adaptive}`);
  if (closestElement) {
    closestElement.classList.add(s.dragover);
  }
};

export const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, s: Styles): void => {
  const target = e.target as HTMLElement;

  const closestElement = target.closest(`.${s.adaptive}`);

  if (closestElement) {
    closestElement.classList.remove(s.dragover);
  }
};