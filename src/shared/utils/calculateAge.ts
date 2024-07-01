import dayjs from 'dayjs';

interface IAge {
  years: number;
}

export function calculateAge(birthDate: string): IAge {
  const today = dayjs();
  const birth = dayjs(birthDate);

  const years = today.diff(birth, 'year');
  birth.add(years, 'year');

  const months = today.diff(birth, 'month');
  birth.add(months, 'month');

  return { years };
}
