/* eslint-disable */
export let FAVORITE_MOVIES = localStorage.getItem("favorite") !== null 
&& localStorage.getItem("favorite") !== undefined 
? localStorage.getItem("favorite") : null;

export function addFAVORITE(favorite) {
    if(!FAVORITE_MOVIES.includes(favorite)){
        FAVORITE_MOVIES.push(favorite); 
        localStorage.setItem("favorite", FAVORITE_MOVIES); 
    }
};

export function removeFAVORITE(favorite) {
    if(FAVORITE_MOVIES.includes(favorite)){
        for( var i = 0; FAVORITE_MOVIES.length; i++){
            if(FAVORITE_MOVIES[i] === favorite) {
                FAVORITE_MOVIES.splice(i, 1); 
            }
        }
            localStorage.setItem("favorite", FAVORITE_MOVIES); 
    }
}