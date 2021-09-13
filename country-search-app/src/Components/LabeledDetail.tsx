import React from 'react';

import './LabeledDetail.css';

export interface LabeledDetailProps{
    detailId: string,
    labelName: string,
    children: React.ReactNode,
};

function LabeledDetail(props: LabeledDetailProps){
    return (
        <span className="details">
            <label htmlFor={props.detailId}><b>{props.labelName}</b></label>
            <span id={props.detailId}> {props.children}</span>
        </span>
    );
}

export default LabeledDetail;
