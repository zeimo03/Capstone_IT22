import { useState, useEffect, useRef, useCallback } from 'react';
import './MatchesSection.css';

// Sample data - replace with your actual data source
const sampleMatches = {
  upcoming: [
    {
      id: 1,
      sport: 'BASKETBALL',
      date: 'January 21, 2025 (Monday)',
      team1: { name: 'TEAM 1', logo: '/images/team1-logo.png' },
      team2: { name: 'TEAM 2', logo: '/images/team2-logo.png' },
      time: '07:00 am - 08:00 am',
      venue: 'Covered Court'
    },
    {
      id: 4,
      sport: 'VOLLEYBALL',
      date: 'January 22, 2025 (Tuesday)',
      team1: { name: 'TEAM 3', logo: '/images/team3-logo.png' },
      team2: { name: 'TEAM 4', logo: '/images/team4-logo.png' },
      time: '09:00 am - 10:00 am',
      venue: 'Gymnasium'
    },
    {
      id: 5,
      sport: 'BADMINTON',
      date: 'January 23, 2025 (Wednesday)',
      team1: { name: 'TEAM 5', logo: '/images/team5-logo.png' },
      team2: { name: 'TEAM 6', logo: '/images/team6-logo.png' },
      time: '01:00 pm - 02:00 pm',
      venue: 'Covered Court'
    }
  ],
  ongoing: [
    {
      id: 2,
      sport: 'BASKETBALL',
      status: '4-12 Including Overtime',
      team1: { name: 'TEAM 1', logo: '/images/team1-logo.png', score: 75 },
      team2: { name: 'TEAM 2', logo: '/images/team2-logo.png', score: 100 },
      quarter: '4th quarter',
      timeRemaining: '38 : 09',
      scoreHistory: '4-12 Including Overtime, 4th-quarter: |22-30, 28-28, 22-34, 2-8|'
    },
    {
      id: 6,
      sport: 'VOLLEYBALL',
      status: '2-1 Including Overtime',
      team1: { name: 'TEAM 3', logo: '/images/team3-logo.png', score: 2 },
      team2: { name: 'TEAM 4', logo: '/images/team4-logo.png', score: 1 },
      quarter: '3rd set',
      timeRemaining: '12 : 45',
      scoreHistory: '1-0, 0-1, 1-0 | Current Set: 25-23 |'
    }
  ],
  finished: [
    {
      id: 3,
      sport: 'BASKETBALL',
      date: 'January 21, 2025 (Monday)',
      team1: { name: 'TEAM 1', logo: '/images/team1-logo.png', score: 99, result: 'WIN' },
      team2: { name: 'TEAM 2', logo: '/images/team2-logo.png', score: 98, result: 'LOSE' }
    },
    {
      id: 7,
      sport: 'VOLLEYBALL',
      date: 'January 20, 2025 (Sunday)',
      team1: { name: 'TEAM 3', logo: '/images/team3-logo.png', score: 3, result: 'WIN' },
      team2: { name: 'TEAM 4', logo: '/images/team4-logo.png', score: 1, result: 'LOSE' }
    }
  ]
};

// Filter options
const filterOptions = {
  division: ['Female', 'Male', 'Mixed'],
  teams: ['Red Rhinos', 'Yellow Tigers', 'Green Gators', 'Brown Cubs', 'Purple Jaguars', 'Black Beetles', 'Maroon Owls', 'Orange Bulldogs', 'Team India', 'Team Jolo'],
  sports: ['Volleyball', 'Basketball', 'Chess', 'Table Tennis', 'Badminton', 'Athletics', 'Mobile Legends'],
  venue: ['Gymnasium', 'Covered Court', 'Pool']
};

function FilterPanel({ isOpen, onClose, filters, setFilters }) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setShouldRender(true);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
    return () => clearTimeout(timer);
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      }
      return { ...prev, [category]: [...current, value] };
    });
  };

  const isSelected = (category, value) => {
    return (filters[category] || []).includes(value);
  };

  const resetFilters = () => {
    setFilters({});
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`filter-overlay ${isClosing ? 'filter-overlay--closing' : ''}`} 
      onClick={handleOverlayClick}
    >
      <div 
        className={`filter-panel ${isClosing ? 'filter-panel--closing' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="filter-panel-header">
          <h3>Filter Matches</h3>
          <button className="filter-close-btn" onClick={handleClose}>✕</button>
        </div>

        <div className="filter-section">
          <h4>Division</h4>
          <div className="filter-tags">
            {filterOptions.division.map(opt => (
              <button
                key={opt}
                className={`filter-tag ${isSelected('division', opt) ? 'active' : ''}`}
                onClick={() => toggleFilter('division', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Teams</h4>
          <div className="filter-tags">
            {filterOptions.teams.map(opt => (
              <button
                key={opt}
                className={`filter-tag ${isSelected('teams', opt) ? 'active' : ''}`}
                onClick={() => toggleFilter('teams', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Sports</h4>
          <div className="filter-tags">
            {filterOptions.sports.map(opt => (
              <button
                key={opt}
                className={`filter-tag ${isSelected('sports', opt) ? 'active' : ''}`}
                onClick={() => toggleFilter('sports', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Venue</h4>
          <div className="filter-tags">
            {filterOptions.venue.map(opt => (
              <button
                key={opt}
                className={`filter-tag ${isSelected('venue', opt) ? 'active' : ''}`}
                onClick={() => toggleFilter('venue', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button className="filter-btn filter-btn-reset" onClick={resetFilters}>Reset</button>
          <button className="filter-btn filter-btn-apply" onClick={handleClose}>Apply</button>
        </div>
      </div>
    </div>
  );
}

function DraggableMatchPanel({ matches, type, filterOpen, setFilterOpen, filters, setFilters }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging || !containerRef.current) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80; // Minimum drag distance to change slide

    if (translateX < -threshold && currentIndex < matches.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }

    setTranslateX(0);
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < matches.length) {
      setCurrentIndex(index);
    }
  };

  const match = matches[currentIndex];

  const renderUpcomingContent = () => (
    <>
      <div className="match-sport">{match.sport}</div>
      <div className="match-date">{match.date}</div>
      <div className="match-teams">
        <div className="team">
          <img src={match.team1.logo} alt={match.team1.name} className="team-logo" />
          <div className="team-name">{match.team1.name}</div>
        </div>
        <div className="vs-divider">VS</div>
        <div className="team">
          <img src={match.team2.logo} alt={match.team2.name} className="team-logo" />
          <div className="team-name">{match.team2.name}</div>
        </div>
      </div>
      <div className="match-details">
        <div className="detail-time">{match.time}</div>
        <div className="detail-venue">{match.venue}</div>
      </div>
    </>
  );

  const renderOngoingContent = () => (
    <>
      <div className="match-sport">{match.sport}</div>
      <div className="match-status">{match.status}</div>
      <div className="match-teams">
        <div className="team">
          <img src={match.team1.logo} alt={match.team1.name} className="team-logo" />
          <div className="team-name">{match.team1.name}</div>
        </div>
        <div className="score-display">
          <div className="score-numbers">
            <span className="score">{match.team1.score}</span>
            <span className="score-divider"> </span>
            <span className="score">{match.team2.score}</span>
          </div>
          <div className="quarter-info">
            <div className="quarter">{match.quarter}</div>
            <div className="time-remaining">{match.timeRemaining}</div>
          </div>
        </div>
        <div className="team">
          <img src={match.team2.logo} alt={match.team2.name} className="team-logo" />
          <div className="team-name">{match.team2.name}</div>
        </div>
      </div>
      <div className="score-history">{match.scoreHistory}</div>
    </>
  );

  const renderFinishedContent = () => (
    <>
      <div className="match-sport">{match.sport}</div>
      <div className="match-date">{match.date}</div>
      <div className="match-teams">
        <div className="team">
          <img src={match.team1.logo} alt={match.team1.name} className="team-logo" />
          <div className="team-name">{match.team1.name}</div>
        </div>
        <div className="vs-divider">VS</div>
        <div className="team">
          <img src={match.team2.logo} alt={match.team2.name} className="team-logo" />
          <div className="team-name">{match.team2.name}</div>
        </div>
      </div>
      <div className="result-bar">
        <div className="result-team">
          <span className="result-label">{match.team1.name}</span>
          <span className={`result-status ${match.team1.result.toLowerCase()}`}>{match.team1.result}</span>
        </div>
        <div className="result-scores">
          <span className="final-score">{match.team1.score}</span>
          <span className="score-separator">-</span>
          <span className="final-score">{match.team2.score}</span>
        </div>
        <div className="result-team">
          <span className={`result-status ${match.team2.result.toLowerCase()}`}>{match.team2.result}</span>
          <span className="result-label">{match.team2.name}</span>
        </div>
      </div>
    </>
  );

  const getBadgeClass = () => {
    if (type === 'upcoming') return '';
    if (type === 'ongoing') return 'ongoing-badge';
    return 'finished-badge';
  };

  const getBadgeText = () => {
    if (type === 'upcoming') return 'UPCOMING MATCHES:';
    if (type === 'ongoing') return 'ONGOING MATCHES:';
    return 'FINISHED MATCHES:';
  };

  return (
    <div className={`match-card ${type}-match`}>
      <div className="match-header">
        <span className={`match-badge ${getBadgeClass()}`}>{getBadgeText()}</span>
        <button className="filter-icon-btn" onClick={() => setFilterOpen(true)} title="Filter matches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>

      {/* Draggable Content Area */}
      <div 
        ref={containerRef}
        className="match-content-draggable"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          ref={trackRef}
          className="match-content-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {matches.map((m, index) => (
            <div className="match-content-slide" key={m.id}>
              {type === 'upcoming' && (
                <>
                  <div className="match-sport">{m.sport}</div>
                  <div className="match-date">{m.date}</div>
                  <div className="match-teams">
                    <div className="team">
                      <img src={m.team1.logo} alt={m.team1.name} className="team-logo" />
                      <div className="team-name">{m.team1.name}</div>
                    </div>
                    <div className="vs-divider">VS</div>
                    <div className="team">
                      <img src={m.team2.logo} alt={m.team2.name} className="team-logo" />
                      <div className="team-name">{m.team2.name}</div>
                    </div>
                  </div>
                  <div className="match-details">
                    <div className="detail-time">{m.time}</div>
                    <div className="detail-venue">{m.venue}</div>
                  </div>
                </>
              )}
              {type === 'ongoing' && (
                <>
                  <div className="match-sport">{m.sport}</div>
                  <div className="match-status">{m.status}</div>
                  <div className="match-teams">
                    <div className="team">
                      <img src={m.team1.logo} alt={m.team1.name} className="team-logo" />
                      <div className="team-name">{m.team1.name}</div>
                    </div>
                    <div className="score-display">
                      <div className="score-numbers">
                        <span className="score">{m.team1.score}</span>
                        <span className="score-divider"> </span>
                        <span className="score">{m.team2.score}</span>
                      </div>
                      <div className="quarter-info">
                        <div className="quarter">{m.quarter}</div>
                        <div className="time-remaining">{m.timeRemaining}</div>
                      </div>
                    </div>
                    <div className="team">
                      <img src={m.team2.logo} alt={m.team2.name} className="team-logo" />
                      <div className="team-name">{m.team2.name}</div>
                    </div>
                  </div>
                  <div className="score-history">{m.scoreHistory}</div>
                </>
              )}
              {type === 'finished' && (
                <>
                  <div className="match-sport">{m.sport}</div>
                  <div className="match-date">{m.date}</div>
                  <div className="match-teams">
                    <div className="team">
                      <img src={m.team1.logo} alt={m.team1.name} className="team-logo" />
                      <div className="team-name">{m.team1.name}</div>
                    </div>
                    <div className="vs-divider">VS</div>
                    <div className="team">
                      <img src={m.team2.logo} alt={m.team2.name} className="team-logo" />
                      <div className="team-name">{m.team2.name}</div>
                    </div>
                  </div>
                  <div className="result-bar">
                    <div className="result-team">
                      <span className="result-label">{m.team1.name}</span>
                      <span className={`result-status ${m.team1.result.toLowerCase()}`}>{m.team1.result}</span>
                    </div>
                    <div className="result-scores">
                      <span className="final-score">{m.team1.score}</span>
                      <span className="score-separator">-</span>
                      <span className="final-score">{m.team2.score}</span>
                    </div>
                    <div className="result-team">
                      <span className={`result-status ${m.team2.result.toLowerCase()}`}>{m.team2.result}</span>
                      <span className="result-label">{m.team2.name}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Bar - synced with drag */}
      <div className="horizontal-scroll-wrapper">
        <div className="horizontal-scroll-bar">
          {matches.map((_, i) => (
            <div
              key={i}
              className={`scroll-segment ${i === currentIndex ? 'scroll-segment--active' : ''}`}
              onClick={() => goToSlide(i)}
            >
              <div className="scroll-segment-bar" />
            </div>
          ))}
        </div>
      </div>

      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );
}

function MatchCard({ type, match }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // Get all matches of this type
  const matches = sampleMatches[type] || [match];

  return (
    <DraggableMatchPanel 
      matches={matches} 
      type={type} 
      filterOpen={filterOpen} 
      setFilterOpen={setFilterOpen}
      filters={filters}
      setFilters={setFilters}
    />
  );
}

function MatchesSection() {
  return (
    <div className="matches-section">
      <div className="matches-section-header">
        <svg className="matches-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A1D52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
        <h2 className="matches-section-title">MATCHES</h2>
      </div>

      <div className="matches-container">
        {sampleMatches.upcoming.length > 0 && (
          <MatchCard type="upcoming" match={sampleMatches.upcoming[0]} />
        )}
        {sampleMatches.ongoing.length > 0 && (
          <MatchCard type="ongoing" match={sampleMatches.ongoing[0]} />
        )}
        {sampleMatches.finished.length > 0 && (
          <MatchCard type="finished" match={sampleMatches.finished[0]} />
        )}
      </div>
    </div>
  );
}

export default MatchesSection;