"use client";

import * as React from "react";

export type CustomIconProps = React.SVGProps<SVGSVGElement>;

export const Artist = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function ArtistIcon(
    { width = 24, height = 24, fill = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 -960 960 960"
        fill={fill}
        aria-hidden="true"
        {...props}
      >
        <path d="M629-189q-29-29-29-71t29-71q29-29 71-29 8 0 18 1.5t22 6.5v-208h140v80h-80v220q0 42-29 71t-71 29q-42 0-71-29ZM327-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM120-160v-112q0-35 17.5-63t46.5-43q62-31 126-46.5T440-440q42 0 83.5 6.5T607-414q-66 40-82 114.5T551-160H120Z" />
      </svg>
    );
  },
);

Artist.displayName = "Artist";

export const Stadium = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function StadiumIcon(
    { width = 24, height = 24, fill = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 -960 960 960"
        fill={fill}
        aria-hidden="true"
        {...props}
      >
        <path d="M120-680v-160l160 80-160 80Zm600 0v-160l160 80-160 80Zm-280-40v-160l160 80-160 80ZM360-85q-52-5-102-15t-89.5-24.5Q129-139 104.5-158T80-200v-360q0-25 31.5-46.5t85.5-38q54-16.5 127-26t156-9.5q83 0 156 9.5t127 26q54 16.5 85.5 38T880-560v360q0 23-24.5 42t-64 33.5Q752-110 702-100T600-85v-195H360v195Zm120-435q97 0 167.5-11.5T760-558q0-5-76-23.5T480-600q-128 0-204 18.5T200-558q42 15 112.5 26.5T480-520Z" />
      </svg>
    );
  },
);

Stadium.displayName = "Stadium";

export const CalendarCustom = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function Calendar(
    { width = 20, height = 20, fill = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 20 20"
        aria-hidden="true"
        {...props}
      >
        <path d="M15.8333 15.8335H4.16667V6.66683H15.8333M13.3333 0.833496V2.50016H6.66667V0.833496H5V2.50016H4.16667C3.24167 2.50016 2.5 3.24183 2.5 4.16683V15.8335C2.5 16.2755 2.67559 16.6994 2.98816 17.012C3.30072 17.3246 3.72464 17.5002 4.16667 17.5002H15.8333C16.2754 17.5002 16.6993 17.3246 17.0118 17.012C17.3244 16.6994 17.5 16.2755 17.5 15.8335V4.16683C17.5 3.7248 17.3244 3.30088 17.0118 2.98832C16.6993 2.67576 16.2754 2.50016 15.8333 2.50016H15V0.833496M14.1667 10.0002H10V14.1668H14.1667V10.0002Z" />
      </svg>
    );
  },
);

CalendarCustom.displayName = "CalendarCustom";

export const ListStatus = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function ListStatus(
    { width = 24, height = 24, fill = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...props}
      >
        <path d="M16.5 11L13 7.5L14.4 6.1L16.5 8.2L20.7 4L22.1 5.4L16.5 11ZM11 7H2V9H11V7ZM21 13.4L19.6 12L17 14.6L14.4 12L13 13.4L15.6 16L13 18.6L14.4 20L17 17.4L19.6 20L21 18.6L18.4 16L21 13.4ZM11 15H2V17H11V15Z" />
      </svg>
    );
  },
);

ListStatus.displayName = "ListStatus";

export const TerminalSquare = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function TerminalSquare(
    { width = 16, height = 16, stroke = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M4.66667 7.33333L6 6L4.66667 4.66667M7.33333 8.66667H10M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z" />
      </svg>
    );
  },
);

TerminalSquare.displayName = "TerminalSquare";

export const Ticket = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function Ticket(
    { width = 16, height = 16, stroke = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M8.66683 3.3335V4.66683M8.66683 11.3335V12.6668M8.66683 7.3335V8.66683M1.3335 6.00016C1.86393 6.00016 2.37264 6.21088 2.74771 6.58595C3.12278 6.96102 3.3335 7.46973 3.3335 8.00016C3.3335 8.5306 3.12278 9.0393 2.74771 9.41438C2.37264 9.78945 1.86393 10.0002 1.3335 10.0002V11.3335C1.3335 11.6871 1.47397 12.0263 1.72402 12.2763C1.97407 12.5264 2.31321 12.6668 2.66683 12.6668H13.3335C13.6871 12.6668 14.0263 12.5264 14.2763 12.2763C14.5264 12.0263 14.6668 11.6871 14.6668 11.3335V10.0002C14.1364 10.0002 13.6277 9.78945 13.2526 9.41438C12.8775 9.0393 12.6668 8.5306 12.6668 8.00016C12.6668 7.46973 12.8775 6.96102 13.2526 6.58595C13.6277 6.21088 14.1364 6.00016 14.6668 6.00016V4.66683C14.6668 4.31321 14.5264 3.97407 14.2763 3.72402C14.0263 3.47397 13.6871 3.3335 13.3335 3.3335H2.66683C2.31321 3.3335 1.97407 3.47397 1.72402 3.72402C1.47397 3.97407 1.3335 4.31321 1.3335 4.66683V6.00016Z" />
      </svg>
    );
  },
);

Ticket.displayName = "Ticket";

export const BookOpen = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function BookOpen(
    { width = 16, height = 16, stroke = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M8.00016 4.66667C8.00016 3.95942 7.71921 3.28115 7.21911 2.78105C6.71902 2.28095 6.04074 2 5.3335 2H1.3335V12H6.00016C6.5306 12 7.0393 12.2107 7.41438 12.5858C7.78945 12.9609 8.00016 13.4696 8.00016 14M8.00016 4.66667V14M8.00016 4.66667C8.00016 3.95942 8.28111 3.28115 8.78121 2.78105C9.28131 2.28095 9.95958 2 10.6668 2H14.6668V12H10.0002C9.46973 12 8.96102 12.2107 8.58595 12.5858C8.21088 12.9609 8.00016 13.4696 8.00016 14" />
      </svg>
    );
  },
);

BookOpen.displayName = "BookOpen";

export const Bot = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function Bot(
    { width = 16, height = 16, stroke = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M8.00016 5.33317V2.6665H5.3335" />
        <path d="M11.9998 5.3335H3.99984C3.26346 5.3335 2.6665 5.93045 2.6665 6.66683V12.0002C2.6665 12.7365 3.26346 13.3335 3.99984 13.3335H11.9998C12.7362 13.3335 13.3332 12.7365 13.3332 12.0002V6.66683C13.3332 5.93045 12.7362 5.3335 11.9998 5.3335Z" />
        <path d="M1.3335 9.3335H2.66683" />
        <path d="M13.3335 9.3335H14.6668" />
        <path d="M10 8.6665V9.99984" />
        <path d="M6 8.6665V9.99984" />
      </svg>
    );
  },
);

Bot.displayName = "Bot";

export const Settings2 = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function Settings2(
    { width = 16, height = 16, stroke = "currentColor", ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M13.3332 4.6665H7.33317M9.33317 11.3332H3.33317M9.33317 11.3332C9.33317 12.4377 10.2286 13.3332 11.3332 13.3332C12.4377 13.3332 13.3332 12.4377 13.3332 11.3332C13.3332 10.2286 12.4377 9.33317 11.3332 9.33317C10.2286 9.33317 9.33317 10.2286 9.33317 11.3332ZM6.6665 4.6665C6.6665 5.77107 5.77107 6.6665 4.6665 6.6665C3.56193 6.6665 2.6665 5.77107 2.6665 4.6665C2.6665 3.56193 3.56193 2.6665 4.6665 2.6665C5.77107 2.6665 6.6665 3.56193 6.6665 4.6665Z" />
      </svg>
    );
  },
);

Settings2.displayName = "Settings2";
