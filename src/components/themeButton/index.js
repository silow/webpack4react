import React from 'react';
import { LayoutContext } from '../../context/LayoutContext';

export default function ThemeButton(props) {
    return (
        <LayoutContext.Consumer>
            {theme => (
                <button 
                    {...props}
                    style={{ backgroundColor: theme.background,color:theme.foreground  }} />
            )}
        </LayoutContext.Consumer>
    );
}
