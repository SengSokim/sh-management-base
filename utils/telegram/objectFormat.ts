const capitalize = (input:string) =>
    `${input.charAt(0).toUpperCase()}${input.slice(1)}`;

const capitalizeKey = (input:string) =>
    input.split(/(?=[A-Z])/).map(word => capitalize(word)).join(' ');

const newLineToken = '\n';

const lineBreak = newLineToken.repeat(2);

const formatTitle = (title: string): string => `<b><i>${title}</i></b>`;

const formatArray = (childArray: any): any =>
    childArray.map((child:any, index:number) => `${index + 1}. ${child}`).join(newLineToken);

const formatEntry = ([key, value]:any) => {

    const formattedTitle = formatTitle(capitalizeKey(key));
    const formattedBody = Array.isArray(value) ? formatArray(value) : value;

    return `${formattedTitle}${newLineToken}${formattedBody}`;
};

export const toHtmlFormat = (title:string, body:any) => {

    const formattedTitle = formatTitle(title);
    const formattedBody = Object.entries(body).map(formatEntry).join(lineBreak);

    return `${formattedTitle}${lineBreak}${formattedBody}`;
};