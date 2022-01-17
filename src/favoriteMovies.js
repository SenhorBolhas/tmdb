/* eslint-disable */
export let FAVORITE_MOVIES = [];

FAVORITE_MOVIES = localStorage.getItem("favorite") !== null && localStorage.getItem("favorite") !== undefined  && localStorage.getItem("favorite").length > 0 
? localStorage.getItem("favorite") : [];

export function addFAVORITE(favorite) {
    console.log(FAVORITE_MOVIES);
    if(!FAVORITE_MOVIES.includes(favorite)){
        FAVORITE_MOVIES =+ (favorite); 
        localStorage.setItem("favorite", FAVORITE_MOVIES); 
    }
    console.log(FAVORITE_MOVIES, FAVORITE_MOVIES.length);
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

export function includesFAVORITE(favorite) {
    FAVORITE_MOVIES.includes(favorite);
}