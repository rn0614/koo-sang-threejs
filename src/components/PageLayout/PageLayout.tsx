import React, { Children } from 'react'
import styles from './styles.module.scss';

type Props ={
  children: React.ReactNode;
}

export default function PageLayout({children}:Props) {
  return (
    <div className={styles.pageLayout}>{children}</div>
  )
}
