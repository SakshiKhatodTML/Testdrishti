
import * as React from "react";
import {toast} from "react-toastify"
import "./spinner.css";
interface IOptions {
    notFound: boolean;
    noNetwork: boolean;
    error: number;
    text: string;
    styles?:any;
    buttonOption?:{
        isBack?: boolean,
        backClick?:()=>void,
        isRefresh?: boolean,
        refreshClick?:()=>void,
    }
  }


export const ErrorIOC=<svg width="20" height="19" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.50781 0.109375C7.23698 0.109375 6.98177 0.182292 6.74219 0.328125C6.5026 0.46875 6.31771 0.658854 6.1875 0.898438L0.859375 10.7891C0.739583 11.013 0.679688 11.25 0.679688 11.5C0.679688 11.7031 0.721354 11.8958 0.804688 12.0781C0.882812 12.2604 0.989583 12.4193 1.125 12.5547C1.26042 12.6901 1.41927 12.7995 1.60156 12.8828C1.78385 12.9609 1.97656 13 2.17969 13H12.8359C13.0391 13 13.2318 12.9609 13.4141 12.8828C13.5911 12.7995 13.75 12.6901 13.8906 12.5547C14.026 12.4141 14.1354 12.2552 14.2188 12.0781C14.2969 11.8958 14.3359 11.7031 14.3359 11.5C14.3359 11.25 14.276 11.013 14.1562 10.7891L8.82812 0.898438C8.69792 0.658854 8.51302 0.46875 8.27344 0.328125C8.03385 0.182292 7.77865 0.109375 7.50781 0.109375ZM7.50781 9.75C7.40885 9.75 7.3151 9.77083 7.22656 9.8125C7.13802 9.85417 7.0599 9.91146 6.99219 9.98438C6.91927 10.0521 6.86198 10.1302 6.82031 10.2188C6.77865 10.3073 6.75781 10.401 6.75781 10.5C6.75781 10.599 6.77865 10.6927 6.82031 10.7812C6.86198 10.8698 6.91927 10.9505 6.99219 11.0234C7.0599 11.0911 7.13802 11.1458 7.22656 11.1875C7.3151 11.2292 7.40885 11.25 7.50781 11.25C7.60677 11.25 7.70052 11.2292 7.78906 11.1875C7.8776 11.1458 7.95833 11.0911 8.03125 11.0234C8.09896 10.9505 8.15365 10.8698 8.19531 10.7812C8.23698 10.6927 8.25781 10.599 8.25781 10.5C8.25781 10.401 8.23698 10.3073 8.19531 10.2188C8.15365 10.1302 8.09896 10.0521 8.03125 9.98438C7.95833 9.91146 7.8776 9.85417 7.78906 9.8125C7.70052 9.77083 7.60677 9.75 7.50781 9.75ZM7.50781 1.10938C7.61198 1.10938 7.70312 1.13802 7.78125 1.19531C7.85417 1.2526 7.91927 1.32292 7.97656 1.40625C8.03385 1.48958 8.08333 1.58073 8.125 1.67969C8.16667 1.77344 8.20833 1.85677 8.25 1.92969C8.32812 2.08073 8.46094 2.32812 8.64844 2.67188C8.83073 3.01562 9.04948 3.41667 9.30469 3.875C9.5599 4.33333 9.83594 4.83333 10.1328 5.375C10.4297 5.91667 10.7266 6.46094 11.0234 7.00781C11.3203 7.55469 11.6094 8.08594 11.8906 8.60156C12.1667 9.11719 12.4141 9.58073 12.6328 9.99219C12.8464 10.4036 13.0182 10.7448 13.1484 11.0156C13.2734 11.2812 13.3359 11.4427 13.3359 11.5C13.3359 11.6354 13.2865 11.7526 13.1875 11.8516C13.0885 11.9505 12.9714 12 12.8359 12H2.17969C2.04427 12 1.92708 11.9505 1.82812 11.8516C1.72917 11.7526 1.67969 11.6354 1.67969 11.5C1.83073 11.125 2.0026 10.763 2.19531 10.4141C2.38281 10.0651 2.57031 9.71094 2.75781 9.35156C3.0026 8.89323 3.24479 8.4349 3.48438 7.97656C3.71875 7.51302 3.95833 7.05208 4.20312 6.59375C4.45312 6.11979 4.70312 5.65104 4.95312 5.1875C5.20312 4.71875 5.45312 4.2474 5.70312 3.77344C5.88542 3.4401 6.06771 3.10938 6.25 2.78125C6.42708 2.44792 6.61198 2.11719 6.80469 1.78906C6.84635 1.71615 6.88802 1.64583 6.92969 1.57812C6.97135 1.50521 7.01823 1.4375 7.07031 1.375C7.1276 1.30208 7.1901 1.23958 7.25781 1.1875C7.32552 1.13542 7.40885 1.10938 7.50781 1.10938ZM7.00781 9H8.00781V4H7.00781V9Z" fill="#FFFF"/>
</svg>


export const SuccessIOC=<svg width="20" height="18" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.49219 0C9.17969 0 9.84115 0.0911458 10.4766 0.273437C11.1172 0.450521 11.7161 0.703125 12.2734 1.03125C12.8307 1.35417 13.3359 1.74479 13.7891 2.20312C14.2474 2.65625 14.638 3.16146 14.9609 3.71875C15.2891 4.27604 15.5417 4.875 15.7188 5.51562C15.901 6.15104 15.9922 6.8125 15.9922 7.5C15.9922 8.1875 15.901 8.85156 15.7188 9.49219C15.5417 10.1276 15.2891 10.724 14.9609 11.2812C14.638 11.8385 14.2474 12.3464 13.7891 12.8047C13.3359 13.2578 12.8307 13.6484 12.2734 13.9766C11.7161 14.2995 11.1172 14.5521 10.4766 14.7344C9.84115 14.9115 9.17969 15 8.49219 15C7.80469 15 7.14063 14.9115 6.5 14.7344C5.86458 14.5521 5.26823 14.2995 4.71094 13.9766C4.15365 13.6484 3.64583 13.2578 3.1875 12.8047C2.73438 12.3464 2.34375 11.8385 2.01563 11.2812C1.69271 10.724 1.4401 10.1276 1.25781 9.49219C1.08073 8.85156 0.992188 8.1875 0.992188 7.5C0.992188 6.8125 1.08073 6.15104 1.25781 5.51562C1.4401 4.875 1.69271 4.27604 2.01563 3.71875C2.34375 3.16146 2.73438 2.65625 3.1875 2.20312C3.64583 1.74479 4.15365 1.35417 4.71094 1.03125C5.26823 0.703125 5.86458 0.450521 6.5 0.273437C7.14062 0.0911458 7.80469 0 8.49219 0ZM8.49219 1C7.89323 1 7.3151 1.07812 6.75781 1.23437C6.20573 1.38542 5.6875 1.60417 5.20312 1.89062C4.72396 2.17187 4.28646 2.51042 3.89063 2.90625C3.5 3.29688 3.16146 3.73438 2.875 4.21875C2.59375 4.69792 2.375 5.21615 2.21875 5.77344C2.06771 6.32552 1.99219 6.90104 1.99219 7.5C1.99219 8.09896 2.06771 8.67708 2.21875 9.23438C2.375 9.78646 2.59375 10.3047 2.875 10.7891C3.16146 11.2682 3.5 11.7057 3.89063 12.1016C4.28646 12.4922 4.72396 12.8307 5.20313 13.1172C5.6875 13.3984 6.20573 13.6172 6.75781 13.7734C7.3151 13.9245 7.89323 14 8.49219 14C9.09115 14 9.66667 13.9245 10.2188 13.7734C10.776 13.6172 11.2943 13.3984 11.7734 13.1172C12.2578 12.8307 12.6953 12.4922 13.0859 12.1016C13.4818 11.7057 13.8203 11.2682 14.1016 10.7891C14.388 10.3047 14.6068 9.78646 14.7578 9.23437C14.9141 8.67708 14.9922 8.09896 14.9922 7.5C14.9922 6.90104 14.9141 6.32552 14.7578 5.77344C14.6068 5.21615 14.388 4.69792 14.1016 4.21875C13.8203 3.73437 13.4818 3.29687 13.0859 2.90625C12.6953 2.51042 12.2578 2.17187 11.7734 1.89062C11.2943 1.60417 10.776 1.38542 10.2188 1.23437C9.66667 1.07812 9.09115 1 8.49219 1ZM12.8438 5.85156L8.10938 10.625L5.14063 7.65625L5.84375 6.94531L8.10938 9.21094L12.1406 5.14844L12.8438 5.85156Z" fill="#237B4B"/>
</svg>


export const SuccessToast=(message:string)=>{
    toast.success(<div className="flex-container"><div className="icon">{SuccessIOC}</div><div className="text">{message}</div></div>);
}
export const ErrorToast=(error: string)=>{
    toast.error(<div className="flex-container"><div className="icon">{ErrorIOC}</div><div className="text">{error}</div></div>)
}

export const ButtonLoader=(props: {text:string, isLoader?:boolean})=>{
    return <><span>{props.isLoader && (<i className={"i-loader"} style={{opacity:"2.6"}}></i>)}</span><span className={props.isLoader?"i-text":"i-text-not"}>{props.text}</span></>
}