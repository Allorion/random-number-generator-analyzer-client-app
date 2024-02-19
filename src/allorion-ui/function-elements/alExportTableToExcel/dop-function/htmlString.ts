import ReactDOMServer from 'react-dom/server';
import React from "react";

export const htmlString = (jsx: JSX.Element): string => {
    return ReactDOMServer.renderToStaticMarkup(jsx);
}