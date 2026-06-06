import React, { useState, useRef } from 'react';
import './Hero.css';
import SrcLogo from './SrcLogo.png';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const slides = [
  {
    id: 1,
    title: 'SANTA RITA COLLEGE OF PAMPANGA, INC.',
    subtitle: 'INTRAMURALS INFORMATION PAGE',
  },
  {
    id: 2,
    title: 'UPCOMING EVENTS & SCHEDULES',
    subtitle: 'ACADEMIC CALENDAR 2025',
  },
  {
    id: 3,
    title: 'SPORTS & INTRAMURAL RANKINGS',
    subtitle: 'CURRENT STANDINGS',
  },
];

const departments = ['ELEMENTARY', 'HIGH SCHOOL', 'COLLEGE'];

const sportsData = {
  ELEMENTARY: [
    { name: 'ATHLETICS',      img: null },
    { name: 'BADMINTON',      img: null },
    { name: 'BASKETBALL',     img: null },
    { name: 'CHESS',          img: null },
    { name: 'TABLE TENNIS',   img: null },
    { name: 'VOLLEYBALL',     img: null },
  ],
  'HIGH SCHOOL': [
    { name: 'ATHLETICS',      img: null },
    { name: 'BADMINTON',      img: null },
    { name: 'BASKETBALL',     img: null },
    { name: 'CHESS',          img: null },
    { name: 'MOBILE LEGENDS', img: null },
    { name: 'SEPAK TAKRAW',   img: null },
    { name: 'TABLE TENNIS',   img: null },
    { name: 'VOLLEYBALL',     img: null },
  ],
  COLLEGE: [
    { name: 'ATHLETICS',      img: null },
    { name: 'BADMINTON',      img: null },
    { name: 'BASKETBALL',     img: null },
    { name: 'CHESS',          img: null },
    { name: 'MOBILE LEGENDS', img: null },
    { name: 'TABLE TENNIS',   img: null },
    { name: 'VOLLEYBALL',     img: null },
  ],
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [activeDept, setActiveDept] = useState('HIGH SCHOOL');
  const startXRef = useRef(null);

  const goTo = (index) => {
    if (index < 0 || index >= slides.length) return;
    setCurrent(index);
  };

  const onTouchStart = (e) => { startXRef.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startXRef.current === null) return;
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    startXRef.current = null;
  };
  const onMouseDown = (e) => { startXRef.current = e.clientX; };
  const onMouseUp = (e) => {
    if (startXRef.current === null) return;
    const diff = startXRef.current - e.clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    startXRef.current = null;
  };

  const sports = sportsData[activeDept] || [];

  return (
    <div className="hero-container">
      <div className="hero-slider-wrapper">
        <button
          className={`hero-arrow hero-arrow--left ${current === 0 ? 'hero-arrow--disabled' : ''}`}
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
        >
          <MdChevronLeft />
        </button>

        <div
          className="hero-slider-overflow"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div
            className="hero-slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div className="hero-slide" key={slide.id}>
                <div className="hero-card">
                  <div className="hero-content">
                    <img
                      src={SrcLogo}
                      alt="Santa Rita College of Pampanga Logo"
                      className="institution-logo"
                      draggable={false}
                    />
                    <div className="hero-text-group">
                      <h1>{slide.title}</h1>
                      <p>{slide.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`hero-arrow hero-arrow--right ${current === slides.length - 1 ? 'hero-arrow--disabled' : ''}`}
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
        >
          <MdChevronRight />
        </button>
      </div>

      <div className="slider-controls">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`slider-pill ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="button"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="dept-tabs">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`dept-tab ${activeDept === dept ? 'dept-tab--active' : ''}`}
            onClick={() => setActiveDept(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="sports-grid">
        {sports.map((sport) => (
          <div className="sport-card" key={sport.name}>
            {sport.img && (
              <img src={sport.img} alt={sport.name} className="sport-img" />
            )}
            <div className="sport-overlay" />
            <span className="sport-name">{sport.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;