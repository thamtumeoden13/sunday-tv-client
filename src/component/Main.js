import React from 'react';

const MainComponent = (props) => {

    return (
        <React.Fragment>
            {props.children ? props.children : null}
        </React.Fragment>
    );
}
export default MainComponent;