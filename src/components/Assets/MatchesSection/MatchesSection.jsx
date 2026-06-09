import { useState } from 'react';
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
    }
  ],
  finished: [
    {
      id: 3,
      sport: 'BASKETBALL',
      date: 'January 21, 2025 (Monday)',
      team1: { name: 'TEAM 1', logo: '/images/team1-logo.png', score: 99, result: 'WIN' },
      team2: { name: 'TEAM 2', logo: '/images/team2-logo.png', score: 98, result: 'LOSE' }
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
  if (!isOpen) return null;

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

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-panel" onClick={e => e.stopPropagation()}>
        <div className="filter-panel-header">
          <h3>Filter Matches</h3>
          <button className="filter-close-btn" onClick={onClose}>✕</button>
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
          <button className="filter-btn filter-btn-apply" onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ type, match }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const renderUpcoming = () => (
    <div className="match-card upcoming-match">
      <div className="match-header">
        <span className="match-badge">UPCOMING MATCHES:</span>
        <button className="filter-icon-btn" onClick={() => setFilterOpen(true)} title="Filter matches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
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
      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );

  const renderOngoing = () => (
    <div className="match-card ongoing-match">
      <div className="match-header">
        <span className="match-badge ongoing-badge">ONGOING MATCHES:</span>
        <button className="filter-icon-btn" onClick={() => setFilterOpen(true)} title="Filter matches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
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
      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );

  const renderFinished = () => (
    <div className="match-card finished-match">
      <div className="match-header">
        <span className="match-badge finished-badge">FINISHED MATCHES:</span>
        <button className="filter-icon-btn" onClick={() => setFilterOpen(true)} title="Filter matches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
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
      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );

  if (type === 'upcoming') return renderUpcoming();
  if (type === 'ongoing') return renderOngoing();
  if (type === 'finished') return renderFinished();
  return null;
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
        {sampleMatches.upcoming.map(match => (
          <MatchCard key={match.id} type="upcoming" match={match} />
        ))}
        {sampleMatches.ongoing.map(match => (
          <MatchCard key={match.id} type="ongoing" match={match} />
        ))}
        {sampleMatches.finished.map(match => (
          <MatchCard key={match.id} type="finished" match={match} />
        ))}
      </div>
    </div>
  );
}

export default MatchesSection;