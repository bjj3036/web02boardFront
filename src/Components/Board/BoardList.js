import React from 'react';

import BoardListItem from './BoardListItem';

const BoardList = (props) => {
    return (
        <div>
            {props.items.map(item => <BoardListItem key={item.id} post={item} />)}
        </div>
    );
};

export default BoardList;