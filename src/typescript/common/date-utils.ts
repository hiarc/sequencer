export const nowDateTime = (() =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();
    return `${year}${month}${day}${hour}${minutes}${seconds}${ms}`;
  }
);