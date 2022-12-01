import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect } from 'react';
function Player({videoId}) {

    const opts = {
      height: 'auto',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    function onPlayerReady(event) {
      // access to player in all event handlers via event.target
      event.target.playVideo()
    }
  
    const handleScroll = () => {
      const element = document.querySelector('.responsive-container');
      let topOfvideo = element.offsetTop;

        if (window.scrollY >= topOfvideo) {
          document.body.style.paddingTop = element.offsetHeight + 'px';
          document.body.classList.add('fixed-nav');
        } else {
          document.body.classList.remove('fixed-nav');
          document.body.style.paddingTop = 0;
        }
      }
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll, true);
    
      // Remove the event listener
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }, []);
    return <YouTube className='responsive-container' videoId={videoId} opts={opts} onReady={onPlayerReady}  />;

}


export default Player


