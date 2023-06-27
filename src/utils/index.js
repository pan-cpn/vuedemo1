import dayjs from 'dayjs';


export const getAssetURL = (imageUrl) => {
    const link = new URL('../assets/images/'+imageUrl, import.meta.url).href;
    console.log(link);
    return link;
  }

export const getCurrentTime = () => {
  const now = dayjs().format('YYYY-MM-DD');
  return now;
}

export const getTime = (times) => {
  const time = dayjs(times).format('YYYY-MM-DD');
  return time;
}

export const getDayCount = (start,end) => {
  const day1 = dayjs(end);
  return `总共${day1.diff(start,'day')}天`;
}