import React from 'react';
import Navigation from './../common/Navigation';
import Views from './ViewSwitcher';

let NavigationWrapper = (props) => {
    return(
        <div>
            <Navigation/>
            <Views />
        </div>
    )
};

export default NavigationWrapper;