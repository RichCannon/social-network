import React, {FC} from "react";
import s from "./Pagination.module.css";
import {Button} from 'antd';
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";

export interface PropsType  {
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}



// (props: PropsType)=> Array<JSX.Element>

const Pagination: FC<PropsType> = ({pageSize, totalCount, currentPage, onPageChanged}) => {


    const pagePortion = 3; // + 2
    let buttonsArray = [];
    const totalPagesAmount = Math.ceil(totalCount / pageSize);
    let end = ((currentPage + pagePortion) >= totalPagesAmount) ? totalPagesAmount : currentPage + pagePortion;
    const start = currentPage === 1 ? end++ && 1
        : (currentPage - 1 >= totalPagesAmount - pagePortion ? totalPagesAmount - pagePortion - 1 : currentPage - 1);
    for (let i = start; i <= end; i++) {

        buttonsArray.push(<Button key={i} type={i === currentPage ? 'primary' : undefined}
                                  onClick={() => onPageChanged(i)}>{i}</Button>)
    }

    return (
        <>
            {
                [
                    <Button key={'start'} onClick={() => onPageChanged(1)}>{1}</Button>,
                    <Arrows direction={'left'}/>,
                    buttonsArray,
                    <Arrows direction={'right'}/>,
                    <Button key={'end'} onClick={() => onPageChanged(totalPagesAmount)}>{totalPagesAmount}</Button>,
                ]
            }
        </>
    )


}

type ArrowProps = {
    direction: 'right' | 'left'
}

const Arrows: FC<ArrowProps> = ({direction}) => {
    if (direction === 'right') {
        return <ArrowRightOutlined key={'arrowRight'} className={s.arrow}/>
    }
    return <ArrowLeftOutlined key={'arrowLeft'} className={s.arrow}/>
}


export default Pagination;
