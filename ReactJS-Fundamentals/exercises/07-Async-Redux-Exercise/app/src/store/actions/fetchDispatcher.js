import statusResponser from './statusResponser';
import appData from './../../utils/appDataStorage';
import toastr from 'toastr'
import './../../../node_modules/toastr/build/toastr.min.css';

export default function fetchData(payload) {
    console.log(`PAYLOAD:`);
    console.log(payload);

    return (dispatch) => {
        dispatch(statusResponser.requestCall());

        return fetch(`${appData.hostUrl}/user/${appData.appKey}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${appData.appKey}:${appData.appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(
                res =>{
                    return res.json()
                },
                error => {
                    toastr.error(error);
                    dispatch(statusResponser.requestError);
                })
            .then(json => {
                setTimeout(() => {window.location.replace('/')}, 3000);
                toastr.success('Successfull registration! Redirecting to home page...');
                dispatch(statusResponser.requestFinish);
            });
    };
}