import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef } from "react";

import {
    MediaPlayer,
    MediaProvider,
    Poster,
    Track,
    type MediaPlayerInstance,
} from "@vidstack/react";

import { VideoLayout } from "../../layouts/video-layout";
import { textTracks } from "./track";

interface PlayerProps {
    videoUrl: string;
}

export function Player({ videoUrl }: PlayerProps) {
    const player = useRef<MediaPlayerInstance>(null);

    useEffect(() => {
        // Subscribe to state updates.
        return player.current!.subscribe(({ paused, viewType }) => {
            console.log("is paused?", "->", paused);
            console.log("is audio view?", "->", viewType === "audio");
        });
    }, []);

    // function onProviderChange(
    //     provider: MediaProviderAdapter | null,
    //     nativeEvent: MediaProviderChangeEvent
    // ) {
    //     // We can configure provider's here.
    //     if (isHLSProvider(provider)) {
    //         provider.config = {};
    //     }
    // }

    // We can listen for the `can-play` event to be notified when the player is ready.
    // function onCanPlay(
    //     detail: MediaCanPlayDetail,
    //     nativeEvent: MediaCanPlayEvent
    // ) {
    //     // ...
    // }

    return (
        <MediaPlayer
            className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
            title="Sprite Fight"
            src={videoUrl}
            crossOrigin
            playsInline
            // onProviderChange={onProviderChange}
            // onCanPlay={onCanPlay}
            ref={player}
        >
            <MediaProvider>
                <Poster
                    className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                    src="https://files.vidstack.io/sprite-fight/poster.webp"
                    alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
                />
                {textTracks.map((track) => (
                    <Track {...track} key={track.src} />
                ))}
            </MediaProvider>

            <VideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />
        </MediaPlayer>
    );
}
