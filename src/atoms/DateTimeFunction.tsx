const formatCurrentDateTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedDate = `${day}-${month}-${year}`;
  
    return `${formattedTime} ${formattedDate}`;
  };

  export default formatCurrentDateTime;