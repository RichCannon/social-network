import React from "react";
import Preloader from "../Components/common/Preloader/Preloader";


/*export const withSuspense = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            return <React.Suspense fallback={<Preloader/>}>
                <Component {...this.props}/>
            </React.Suspense>
        }
    }
    return RedirectComponent;
}*/

export const withSuspense = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </React.Suspense>
    }
}


