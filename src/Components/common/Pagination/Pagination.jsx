import React from "react";
import s from "./Pagination.module.css";


const Pagination = ({pageSize, totalCount, currentPage, onPageChanged}) => {


    const buttonCreator = () => {
        const pagePortion = 3; // + 2
        let buttonsArray = [];
        const totalPagesAmount = Math.ceil(totalCount / pageSize);
        let end = ((currentPage + pagePortion) >= totalPagesAmount) ? totalPagesAmount : currentPage + pagePortion;
        const start = currentPage === 1 ? end++ && 1
            : (currentPage - 1 >= totalPagesAmount - pagePortion ? totalPagesAmount - pagePortion - 1 : currentPage - 1);
        for (let i = start; i <= end; i++) {

            buttonsArray.push(<button className={i === currentPage ? s.activated : ''}
                                      onClick={() => onPageChanged(i)}>{i}</button>)
        }

        return [
            <button onClick={() => onPageChanged(1)}>{1}</button>,
            '...',
            ...buttonsArray,
            '...',
            <button onClick={() => onPageChanged(totalPagesAmount)}>{totalPagesAmount}</button>,
        ];
    }

    return (buttonCreator());
}

export default Pagination;