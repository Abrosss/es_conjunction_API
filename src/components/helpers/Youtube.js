import React from 'react';
import  useEffect  from 'react';

export const Youtube = callback => {
  useEffect(() => {
    if (typeof tag === "undefined") {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      tag.onload = callback;
    } else {
      callback();
    }
    
  }, []);
};