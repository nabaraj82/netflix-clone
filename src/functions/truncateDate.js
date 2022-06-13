export const truncateDate = (str) =>{
    return str?.length > 4? str.slice(0, 4) : str;
   }