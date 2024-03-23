import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
  return <main className="overflow-y-scroll content flex flex-col">{children}</main>;
}
