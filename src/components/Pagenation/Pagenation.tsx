import React, { useEffect } from "react";
import styles from "./styles.module.scss";
interface PagenationProps {
  curPage: number;
  limit: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  onLimitChange: any;
}
import cx from "classnames";

export default function Pagination({
  curPage = 1,
  limit = 4,
  totalPage,
  setPage,
  setLimit,
  onLimitChange,
}: PagenationProps) {
  let curFirstPage = (Math.ceil(curPage / limit) - 1) * limit + 1;
  let curLastPage = Math.min(Math.ceil(curPage / limit) * limit, totalPage);
  let curPageList = new Array(curLastPage - curFirstPage + 1)
    .fill(0)
    .map((_: any, i: number) => {
      return curFirstPage + i;
    });
  return (
    <div className={styles.paginationWrapper}>
      <div
        className={cx(styles.pageItem, styles.sideBtn)}
        onClick={() => (curPage > 1 ? setPage(curPage - 1) : null)}
      >
        &laquo;
      </div>
      {curPageList.map((page) => (
        <div
          className={cx(
            styles.pageItem,
            curPage === page ? styles.active : null
          )}
          key={page}
          onClick={() => setPage(page)}
        >
          {page}
        </div>
      ))}

      <div
        className={cx(styles.pageItem, styles.sideBtn)}
        onClick={() => (curPage !== totalPage ? setPage(curPage + 1) : null)}
      >
        &raquo;
      </div>
    </div>
  );
}
