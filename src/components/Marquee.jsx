import React from "react";
import { motion } from "framer-motion";
import styles from "./Marquee.module.css";

function ReactLogo() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={styles.logoSvg}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 180 180" className={styles.logoSvg}>
      <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#next-mask)">
        <circle cx="90" cy="90" r="88" fill="#000000" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z"
          fill="url(#next-diag)"
        />
        <rect x="115" y="54" width="12" height="72" fill="url(#next-vert)" />
      </g>
      <defs>
        <linearGradient id="next-diag" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next-vert" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        fill="#FFFFFF"
        d="M68.7 89.2c1.7 2.6 4.1 4.7 7.2 6.1 3.1 1.5 6.6 2.2 10.6 2.2 3.4 0 6.3-.5 8.7-1.5 2.4-1 4.3-2.4 5.7-4.1 1.4-1.7 2.1-3.8 2.1-6.1 0-2.4-.7-4.4-2.1-6-1.4-1.6-3.4-2.9-6-4-2.6-1.1-6-2-10-2.9-4.8-1-8.9-2.3-12.2-3.8-3.3-1.5-5.9-3.5-7.7-6-1.8-2.5-2.7-5.5-2.7-9 0-3.8 1.1-7.2 3.3-10.2 2.2-3 5.4-5.4 9.4-7.1 4.1-1.7 8.9-2.6 14.5-2.6 5.3 0 10.1.9 14.3 2.7 4.2 1.8 7.5 4.4 9.9 7.8l-10.4 6.7c-1.8-2.3-3.8-3.9-6-4.9-2.2-1-4.8-1.5-7.8-1.5-3.3 0-6 .6-8 1.7-2 1.1-3 2.8-3 5 0 2 .8 3.6 2.3 4.8 1.5 1.2 4.1 2.3 7.8 3.3 4.8 1.2 8.9 2.5 12.3 4 3.4 1.5 6 3.6 7.9 6.2 1.9 2.6 2.8 5.7 2.8 9.3 0 4-1.2 7.6-3.6 10.8-2.4 3.2-5.7 5.7-10.1 7.5s-9.6 2.7-15.7 2.7c-6.8 0-12.7-1.2-17.7-3.7-5-2.5-8.9-6.2-11.7-11.1l11.7-6.3zM15 36.6h46.8v11.8H40.2v67.2H26.6V48.4H15V36.6z"
      />
    </svg>
  );
}

function JavaScriptLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <rect width="128" height="128" rx="16" fill="#F7DF1E" />
      <path
        fill="#000000"
        d="M67.3 101.8c0 3.6-.8 6.4-2.5 8.3-2.3 2.6-5.8 3.9-10.4 3.9-3.9 0-7.3-.9-10.1-2.6-2.8-1.8-4.8-4.3-6.1-7.7l11.3-6.6c.7 1.6 1.6 2.8 2.6 3.6 1 .8 2.2 1.2 3.6 1.2 1.4 0 2.5-.4 3.3-1.1.8-.7 1.2-1.8 1.2-3.3V52.8h14.2v49h-.1zm30.4-3.1c1.7 2.6 4.1 4.7 7.2 6.1 3.1 1.5 6.6 2.2 10.6 2.2 3.4 0 6.3-.5 8.7-1.5 2.4-1 4.3-2.4 5.7-4.1 1.4-1.7 2.1-3.8 2.1-6.1 0-2.4-.7-4.4-2.1-6-1.4-1.6-3.4-2.9-6-4-2.6-1.1-6-2-10-2.9-4.8-1-8.9-2.3-12.2-3.8-3.3-1.5-5.9-3.5-7.7-6-1.8-2.5-2.7-5.5-2.7-9 0-3.8 1.1-7.2 3.3-10.2 2.2-3 5.4-5.4 9.4-7.1 4.1-1.7 8.9-2.6 14.5-2.6 5.3 0 10.1.9 14.3 2.7 4.2 1.8 7.5 4.4 9.9 7.8l-10.4 6.7c-1.8-2.3-3.8-3.9-6-4.9-2.2-1-4.8-1.5-7.8-1.5-3.3 0-6 .6-8 1.7-2 1.1-3 2.8-3 5 0 2 .8 3.6 2.3 4.8 1.5 1.2 4.1 2.3 7.8 3.3 4.8 1.2 8.9 2.5 12.3 4 3.4 1.5 6 3.6 7.9 6.2 1.9 2.6 2.8 5.7 2.8 9.3 0 4-1.2 7.6-3.6 10.8-2.4 3.2-5.7 5.7-10.1 7.5s-9.6 2.7-15.7 2.7c-6.8 0-12.7-1.2-17.7-3.7-5-2.5-8.9-6.2-11.7-11.1l11.7-6.3z"
      />
    </svg>
  );
}

function PythonLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <defs>
        <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path
        fill="url(#py-blue)"
        d="M63.6 4.3c-27.2 0-25.5 11.8-25.5 11.8l.1 12.2h26v3.7H25.3S3.5 29.5 3.5 56.6s19.1 26.2 19.1 26.2h11.4V66.5s-.6-19.1 18.8-19.1h25.8s18.2.3 18.2-17.9V16.7S98.6 4.3 63.6 4.3zm-14 8.7a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8z"
      />
      <path
        fill="url(#py-yellow)"
        d="M64.4 123.7c27.2 0 25.5-11.8 25.5-11.8l-.1-12.2h-26v-3.7h38.9s21.8 2.5 21.8-24.6-19.1-26.2-19.1-26.2H94v16.3s.6 19.1-18.8 19.1H49.4s-18.2-.3-18.2 17.9v12.8s-1.8 12.4 33.2 12.4zm14-8.7a4.9 4.9 0 1 1 0-9.8 4.9 4.9 0 0 1 0 9.8z"
      />
    </svg>
  );
}

function CppLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#00599C"
        d="M116.5 89.2L66.7 118c-1.7 1-3.7 1-5.4 0L11.5 89.2c-1.7-1-2.7-2.8-2.7-4.7V27c0-2 1-3.7 2.7-4.7L61.3 1.2c1.7-1 3.7-1 5.4 0L116.5 30c1.7 1 2.7 2.8 2.7 4.7v57.5c0 1.9-1 3.7-2.7 4.7z"
      />
      <path
        fill="#004482"
        d="M64 1.2c-.9 0-1.8.3-2.7.8L11.5 30.8c-1.7 1-2.7 2.8-2.7 4.7v57.5c0 1.9 1 3.7 2.7 4.7L61.3 126.5c.9.5 1.8.8 2.7.8V1.2z"
      />
      <path
        fill="#FFFFFF"
        d="M85 46.5c-4.4-6.4-11.5-10.5-21-10.5-16.6 0-29.5 12.5-29.5 28s12.9 28 29.5 28c9.5 0 16.6-4.1 21-10.5l-10-6c-2.4 3.7-6.2 6.1-11 6.1-8.8 0-15.5-6.9-15.5-17.6s6.7-17.6 15.5-17.6c4.8 0 8.6 2.4 11 6.1l10-6z"
      />
      <path
        fill="#0086D6"
        d="M91.5 56.5h4v6.5h6.5v4h-6.5v6.5h-4V67H85v-4h6.5v-6.5zm18 0h4v6.5H120v4h-6.5v6.5h-4V67H103v-4h6.5v-6.5z"
      />
    </svg>
  );
}

function JavaLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#5382A1"
        d="M46.7 94.6s-5.8 3.4 4.1 4.6c11.9 1.4 18.1 1.2 31.4-1.5 0 0-4.3 2.5-12.8 4.5-16.7 4-37.1 2.2-41-4.1-1.7-2.8 4-4.8 18.3-3.5zm-3.2-14.7s-6.7 4.6 3.6 5.8c12.4 1.5 23.4 1.6 42.4-2.2 0 0-5.1 2.8-15.5 4.9-18.7 3.8-42.3 2.9-46.7-4.4-2.3-3.8 4.2-5.4 16.2-4.1zM72 63.8c6.6 7.4-1.7 14.1-1.7 14.1s16.7-8.6 9-18.3c-7.3-9.1-13.8-13.7-27.8-25.1 0 0 5.4 7.2 12.3 14.8 8.1 8.9 9.9 11.2 8.2 14.5z"
      />
      <path
        fill="#E76F00"
        d="M53.4 3.5s15.5 15.7-14.6 39.8c-24.3 19.4-5.5 30.5-5.5 30.5s-7.8-8.8 2.2-18c12.3-11.2 27.8-17.6 28.5-30.8.4-7.4-10.6-21.5-10.6-21.5zm35.2 60.1s6.9-3.8 15.7 3.6c10.4 8.7 4.5 15.8 4.5 15.8s5.5-5.2-1.3-12.5c-7.3-7.7-18.9-6.9-18.9-6.9zm-46.2 46.1c16.2 1.3 41.2.7 57.3-7.5 0 0-4.9 3.8-17.1 6.8-16.6 4.1-39.2 3.5-47.5-1.9-2.9-1.9 1.4-2.9 7.3-2.6 1.7.1 0 5.2 0 5.2z"
      />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#38BDF8"
        d="M64 25.6c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.7 6.3 6.4 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7-6.3-6.4-13.6-13.7-29.4-13.7zm-32 38.4c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.7 6.3 6.4 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7C45.5 73.3 38.2 66 22.4 66l9.6-2z"
      />
    </svg>
  );
}

function Html5Logo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path fill="#E34F26" d="M19.3 113.8L8.7 0h110.6l-10.6 113.8L64 128z" />
      <path fill="#EF652A" d="M64 117.8l36.5-10.1 9-97.1H64z" />
      <path fill="#EBEBEB" d="M64 52.8H45.7l-1.2-14.1H64V24.5H30.4l3.8 42.4H64zm0 37.6l-.2.1-15.3-4.1-1-11h-14.3l1.9 22 28.7 8 .2-.1v-14.9z" />
      <path fill="#FFFFFF" d="M63.9 52.8h18.3l-1.7 19.3-16.6 4.5v14.9l28.6-7.9.2-2.3 3.3-37.4.9-11.1H63.9zm0-28.3v14.1h32.2l1.2-14.1z" />
    </svg>
  );
}

function Css3Logo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path fill="#1572B6" d="M19.3 113.8L8.7 0h110.6l-10.6 113.8L64 128z" />
      <path fill="#33A9DC" d="M64 117.8l36.5-10.1 9-97.1H64z" />
      <path fill="#EBEBEB" d="M64 52.8H49.8l-1-11.3H64V27.4H33.4l3 33.9H64zm0 36.3l-.2.1-14.4-3.9-.9-10.3H34.3l1.8 20.7 27.7 7.7.2-.1v-14.2z" />
      <path fill="#FFFFFF" d="M63.9 52.8h27.4l-.8 9.3H63.9v14.1h15.2l-1.4 16-13.8 3.7v14.2l27.7-7.7.2-2.1 2.3-25.7.8-8.2.8-9.5.4-4.1H63.9zm0-25.4v14.1h32.4l1.3-14.1z" />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path fill="#539E43" d="M64 4.5L12.5 34.2v59.6L64 123.5l51.5-29.7V34.2L64 4.5z" />
      <path fill="#333333" d="M64 23.4l37 21.4v42.8L64 109 27 87.6V44.8L64 23.4z" />
      <path fill="#FFFFFF" d="M64 36.2l25.8 14.9v29.8L64 95.8 38.2 80.9V51.1L64 36.2z" />
      <path fill="#539E43" d="M64 48l16 9.2v18.5L64 85 48 75.7V57.2L64 48z" />
    </svg>
  );
}

function PostgreSqlLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#336791"
        d="M64.6 7.4c-28.7 0-46.7 18.2-46.7 42.6 0 15.6 8.3 28.5 21.4 35.8v19.4c0 3.8 3.1 6.9 6.9 6.9h3.1c3.8 0 6.9-3.1 6.9-6.9v-7.5c2.6.2 5.3.3 8.2.3 23 0 41.2-12.2 41.2-34.5 0-23.7-17.2-56.1-41-56.1zm-22.1 46.4c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm44 0c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"
      />
      <path
        fill="#FFFFFF"
        d="M64.6 22.8c-18.4 0-31.2 12.8-31.2 30.1 0 11.2 6.1 20.5 15.7 25.7l1.7.9v18.7c0 .8.6 1.4 1.4 1.4h3.1c.8 0 1.4-.6 1.4-1.4v-8.8l2 .2c2.4.2 4.9.3 7.5.3 17.8 0 31.8-9.4 31.8-26.6 0-18.5-13.6-40.5-33.4-40.5zm-22.1 36.5c-6.9 0-12.5-5.6-12.5-12.5s5.6-12.5 12.5-12.5 12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5zm44 0c-6.9 0-12.5-5.6-12.5-12.5s5.6-12.5 12.5-12.5 12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5z"
      />
      <circle cx="42.5" cy="46.8" r="4.5" fill="#336791" />
      <circle cx="86.5" cy="46.8" r="4.5" fill="#336791" />
    </svg>
  );
}

function MongoDbLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path fill="#47A248" d="M64 5.2s-28.7 27.7-28.7 53.6c0 20.6 14.8 37.3 28.7 44.5 13.9-7.2 28.7-23.9 28.7-44.5C92.7 32.9 64 5.2 64 5.2z" />
      <path fill="#499D4A" d="M64 5.2v98.3c13.9-7.2 28.7-23.9 28.7-44.5C92.7 32.9 64 5.2 64 5.2z" />
      <path
        fill="#FFFFFF"
        d="M64 122.8c-1.4 1-2.9 1-3.8 0-1-.5-6.2-3.8-11-10-.9-.9-.9-2.4 0-3.3.9-.9 2.4-.9 3.3 0 4.3 5.3 9.1 8.6 9.6 9.1 1.4-1 1.4-2.4.5-3.8-1.9-2.9-5.7-8.1-7.7-14.3-1-2.4 0-5.3 2.4-6.2 2.4-1 5.3 0 6.2 2.4 2.4 6.7 6.7 12.9 9.1 16.3 1.9 2.9 1.9 6.7-.9 9.1-.5.5-.9.7-1.7.7z"
      />
    </svg>
  );
}

function FlaskLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="currentColor"
        d="M50.4 10.5h27.2v10.5h-5.2v23.2l28.9 44.8c4.3 6.7 4.7 15.2 1.1 22.3-3.6 7.1-10.8 11.5-18.7 11.5H44.3c-7.9 0-15.1-4.4-18.7-11.5-3.6-7.1-3.2-15.6 1.1-22.3l28.9-44.8V21h-5.2V10.5zm2.7 50.8L35.4 88.5c-2.3 3.6-2.5 8.2-.6 12 1.9 3.8 5.8 6.2 10 6.2h38.4c4.2 0 8.1-2.4 10-6.2 1.9-3.8 1.7-8.4-.6-12L74.9 61.3H53.1z"
      />
    </svg>
  );
}

function ViteLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <defs>
        <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="vite-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEA83" />
          <stop offset="100%" stopColor="#FFDD35" />
        </linearGradient>
      </defs>
      <path
        fill="url(#vite-grad)"
        d="M121 21.7L66.7 122.9c-1.1 2-3.9 2-5 0L7 21.7c-1.3-2.3.6-5.1 3.2-4.7l53 9.4 54.6-9.4c2.6-.4 4.5 2.4 3.2 4.7z"
      />
      <path fill="url(#vite-bolt)" d="M72.5 13.5l-33.8 45 23.4 3.8-14.8 38.6 37.8-49.8-23.7-3.9 11.1-33.7z" />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#2496ED"
        d="M123.5 59.8c-2.4-1.8-7.8-2.6-12.1-1.2-.8-4.9-3.8-9.2-8.3-11.8l-3.2-1.8-2.1 3.1c-3.1 4.5-4.5 10-3.9 15.4-3.4 1.8-8.7 2.4-14.4 1.7L78 69h41.4c2.8 0 5.4-1.4 6.9-3.8 2-3.1 1-4.7-2.8-5.4zM47.2 35.8h11.2v10.4H47.2zm13.6 0H72v10.4H60.8zm-27.2 0h11.2v10.4H33.6zm0 13.6h11.2v10.4H33.6zm13.6 0H58.4v10.4H47.2zm13.6 0H72v10.4H60.8zm13.6 0H85.6v10.4H74.4zm-40.8-13.6H20v10.4h13.6zm-13.6 13.6H20v10.4h13.6z"
      />
      <path
        fill="#2496ED"
        d="M117.8 71.9H7.6c-.7 3.3-.8 6.8-.2 10.2 2.6 13.8 14.5 25.1 28.5 27.2 24.8 3.7 49-3.9 70.8-17.5 7.8-4.9 13.7-12 17-20.2-1.9.2-3.9.3-5.9.3z"
      />
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#F05032"
        d="M124.6 57.6L70.4 3.4c-4.5-4.5-11.8-4.5-16.3 0L39.7 17.8l18.5 18.5c4.8-1.6 10.4-.5 14.2 3.3 3.8 3.8 4.9 9.3 3.3 14.2l17.8 17.8c4.8-1.6 10.4-.5 14.2 3.3 5.4 5.4 5.4 14.1 0 19.5s-14.1 5.4-19.5 0c-4-4-5-9.8-3-14.7L68.8 63.3v30.7c1.8 1 3.4 2.5 4.5 4.5 3.8 6.7 1.5 15.2-5.2 19s-15.2 1.5-19-5.2-1.5-15.2 5.2-19c2.4-1.4 5.2-1.9 7.9-1.6V60.6c-2.7.3-5.5-.2-7.9-1.6-4.2-2.4-6.8-6.6-7.3-11.3L27.9 29.6 3.4 54.1c-4.5 4.5-4.5 11.8 0 16.3l54.2 54.2c4.5 4.5 11.8 4.5 16.3 0l50.7-50.7c4.5-4.5 4.5-11.8 0-16.3z"
      />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 0C28.65 0 0 28.65 0 64c0 28.28 18.34 52.28 43.78 60.74 3.2.59 4.37-1.39 4.37-3.08 0-1.52-.06-6.55-.09-11.96-17.8 3.87-21.56-7.61-21.56-7.61-2.91-7.39-7.11-9.36-7.11-9.36-5.81-3.97.44-3.89.44-3.89 6.42.45 9.8 6.59 9.8 6.59 5.71 9.78 14.99 6.96 18.64 5.32.58-4.14 2.24-6.96 4.08-8.56-14.21-1.62-29.15-7.1-29.15-31.62 0-6.98 2.49-12.69 6.58-17.16-.66-1.62-2.85-8.12.63-16.92 0 0 5.37-1.72 17.59 6.56 5.1-1.42 10.57-2.13 16.02-2.14 5.45.01 10.92.72 16.03 2.14 12.2-8.28 17.56-6.56 17.56-6.56 3.49 8.8 1.3 15.3 0.64 16.92 4.1 4.47 6.57 10.18 6.57 17.16 0 24.59-14.97 29.98-29.23 31.57 2.3 1.98 4.35 5.88 4.35 11.85 0 8.56-.08 15.46-.08 17.56 0 1.71 1.15 3.71 4.41 3.08C109.68 116.25 128 92.27 128 64c0-35.35-28.65-64-64-64z"
      />
    </svg>
  );
}

function LinuxLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <path
        fill="#FCC624"
        d="M37.3 107.5c-4.9-1.5-12.8 1.9-16.5 4.9-4 3.2-6.5 7.6-3.8 10.5 3.3 3.6 13.9 3.5 21.8 1.3 4.8-1.3 10.7-5.9 8.8-10.7-1.4-3.6-6-5-10.3-6zm53.4 0c4.9-1.5 12.8 1.9 16.5 4.9 4 3.2 6.5 7.6 3.8 10.5-3.3 3.6-13.9 3.5-21.8 1.3-4.8-1.3-10.7-5.9-8.8-10.7 1.4-3.6 6-5 10.3-6z"
      />
      <path
        fill="#222222"
        d="M64 5.5c-15.6 0-24.8 14.5-24.8 32.8 0 8.5 2.1 20.3 5.4 28.9-8.9 9.1-16.5 23-16.5 37.3 0 9.8 5.6 14.5 14.2 14.5 2.7 0 6.1-.5 9.7-1.4 8.7-2.2 19.3-2.6 24-2.6s15.3.4 24 2.6c3.6.9 7 1.4 9.7 1.4 8.6 0 14.2-4.7 14.2-14.5 0-14.3-7.6-28.2-16.5-37.3 3.3-8.6 5.4-20.4 5.4-28.9C92.8 20 83.6 5.5 64 5.5z"
      />
      <path
        fill="#FFFFFF"
        d="M64 45c-15.5 0-25 15.6-25 38.3 0 18.5 8.5 32.7 25 32.7s25-14.2 25-32.7C89 60.6 79.5 45 64 45z"
      />
      <path fill="#222222" d="M54.5 30.5c-2.8 0-5 3.1-5 7s2.2 7 5 7 5-3.1 5-7-2.2-7-5-7zm19 0c-2.8 0-5 3.1-5 7s2.2 7 5 7 5-3.1 5-7-2.2-7-5-7z" />
      <path fill="#FFA500" d="M64 41.5c-6.8 0-12.5 3.5-12.5 7.5s9.5 11.5 12.5 11.5 12.5-7.5 12.5-11.5-5.7-7.5-12.5-7.5z" />
    </svg>
  );
}

function PostmanLogo() {
  return (
    <svg viewBox="0 0 128 128" className={styles.logoSvg}>
      <circle cx="64" cy="64" r="60" fill="#FF6C37" />
      <path
        fill="#FFFFFF"
        d="M78.6 30.2c-1.3-.2-2.7.2-3.7 1l-24.8 20c-1.7 1.4-2.4 3.7-1.8 5.8l6.8 24.3-13.4-10.8c-1.2-1-2.8-1.3-4.3-.8l-9.1 3c-1.8.6-2.9 2.4-2.5 4.3.4 1.8 2.1 3.1 3.9 2.9l6.9-.8 11.3 9.1c1.5 1.2 3.5 1.5 5.3.8 1.8-.7 3-2.3 3.3-4.2l7.2-46.2 16.5 13.3c1.3 1 3.1 1.2 4.6.4 1.5-.7 2.4-2.2 2.3-3.9l-1.5-15.6 10.8 8.7c1.3 1 3.1 1.2 4.6.4 1.5-.8 2.4-2.3 2.3-4l-2.1-21.7c-.1-1.3-.8-2.5-1.9-3.2-1.1-.7-2.4-.9-3.7-.7z"
      />
      <circle cx="91.5" cy="51.5" r="7.5" fill="#FFFFFF" />
    </svg>
  );
}

// Map each technology to its official logo component
const TECH_LOGOS = {
  "React": ReactLogo,
  "Next.js": NextLogo,
  "TypeScript": TypeScriptLogo,
  "JavaScript": JavaScriptLogo,
  "Python": PythonLogo,
  "C++": CppLogo,
  "Java": JavaLogo,
  "Tailwind CSS": TailwindLogo,
  "HTML5": Html5Logo,
  "CSS3": Css3Logo,
  "Node.js": NodeLogo,
  "PostgreSQL": PostgreSqlLogo,
  "MongoDB": MongoDbLogo,
  "Flask": FlaskLogo,
  "Vite": ViteLogo,
  "Docker": DockerLogo,
  "Git": GitLogo,
  "GitHub": GitHubLogo,
  "Linux": LinuxLogo,
  "Postman": PostmanLogo,
};

const MARQUEE_ROW_1 = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "C++" },
  { name: "Java" },
  { name: "Tailwind CSS" },
  { name: "HTML5" },
  { name: "CSS3" },
];

const MARQUEE_ROW_2 = [
  { name: "Node.js" },
  { name: "PostgreSQL" },
  { name: "MongoDB" },
  { name: "Flask" },
  { name: "Vite" },
  { name: "Docker" },
  { name: "Git" },
  { name: "GitHub" },
  { name: "Linux" },
  { name: "Postman" },
];

export default function Marquee() {
  // Duplicate arrays 3 times for a seamless, continuous infinite looping marquee
  const row1Items = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Items = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={styles.marqueeSection}
      aria-label="Tech Stack Showcase"
    >
      {/* Track 1: Moving Left */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackLeft}>
          {row1Items.map((item, index) => {
            const LogoComponent = TECH_LOGOS[item.name];
            return (
              <div
                key={`r1-${index}`}
                className={styles.logoCard}
                title={item.name}
                aria-label={item.name}
              >
                {LogoComponent && <LogoComponent />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 2: Moving Right */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackRight}>
          {row2Items.map((item, index) => {
            const LogoComponent = TECH_LOGOS[item.name];
            return (
              <div
                key={`r2-${index}`}
                className={styles.logoCard}
                title={item.name}
                aria-label={item.name}
              >
                {LogoComponent && <LogoComponent />}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
