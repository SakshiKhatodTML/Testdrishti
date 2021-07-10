const ErrorMsg="D'oh! Something went wrong...";
export const Constant ={
  ERROR_500:ErrorMsg,
  ERROR_502:ErrorMsg,
  ERROR_403:ErrorMsg,
  ERROR_404:ErrorMsg,
  ERROR_400:ErrorMsg,
  DATA_NOT_FOUND:"You're all caught up!",
}
export interface IProps{
  appId: string,
  authKey: string,
  sapToken: string,
  domain: string,
  notificationAction?: string,
}
export interface ILoader{
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorCode?: number,
}
export const dateConverstion=(data:string): string=>{
  try{
  if(String(data).trim()!==""){
  let year= parseInt(data.substr(0,4));
  let month= parseInt(data.substr(4,2));
  let day= parseInt(data.substr(6,2));
  let date=new Date();
   date.setFullYear(year);
   date.setMonth(month);
   date.setDate(day);
   return `${day}/${month}/${year}`;
  }else
  return "";
 }catch(err){
   return "";
 }
}

export const ThemaValue={
  0: "light",
  1: "dark",
  2:"highContrast"
}



