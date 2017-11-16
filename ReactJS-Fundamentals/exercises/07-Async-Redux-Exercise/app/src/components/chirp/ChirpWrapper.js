import React from 'react';
import Chirp from './SingleChirp';
import chirpSorter from './../../utils/chirpsDateSorter';
import EmptyChirperList from './EmptyChirperList';


let ChirpWrapper = (props) => {
    return (
        <div id="chirps" className="chirps">
            <h2 className="titlebar">Chirps</h2>
{/*            {
                props.chirps.length !== 0 ?
                    props.chirps
                        .sort(chirpSorter)
                        .filter((chirp) => {
                            if (props.user.subscriptions.indexOf(chirp.author) !== -1) {
                                return chirp;
                            }
                        })
                        .map(chirp => {
                            return <Chirp key={chirp._id} props={chirp}/>
                        }) : <EmptyChirperList/>
            }*/}
        </div>
    )
};

export default ChirpWrapper