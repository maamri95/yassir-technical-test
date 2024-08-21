import { PropsWithChildren } from 'react';
import { QueryProvider } from './query';

export function Provider(props: PropsWithChildren) {
  return (
    <QueryProvider>
      {props.children}
    </QueryProvider>
  )
}