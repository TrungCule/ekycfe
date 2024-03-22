import dayjs from 'dayjs';
import lo from 'lodash';

export const getOptionFromObj = (obj) => {
  return lo.map(obj, (val: string, key: string) => ({
    label: val,
    value: key,
  }));
};

export function convertToOptions(collection: any[], value: string, label: string) {
  return lo.map(collection, (item) => {
    return {
      value: item[value],
      label: item[label],
    };
  });
}

export function searchValueOptions(input: any, option: any) {
  return option?.label?.toString()?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export const formatTime = (date, format = 'YYYY/MM/DD') => {
  if (!date) return undefined;
  return dayjs(date).format(format);
};
