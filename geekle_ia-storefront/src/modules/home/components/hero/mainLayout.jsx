"use client";

import React from 'react';

import styles from './Layout.module.css';

const Layout = ({left,right}) => {
    return (
      <div className={styles.layout}>
        <div className={styles.leftPanel}>
          {left}
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.grid}>
           {right} 
          </div>
        </div>
      </div>
    );
  };
  
  export default Layout;
