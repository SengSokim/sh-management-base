import {makePostRequest} from "./api";

const telegramBotKey = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_USER_ID!;

export const sendNotification = async (text:any, parse_mode:string) => {
    
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
    const data = await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            chat_id
        });
    
    return data;
    
};