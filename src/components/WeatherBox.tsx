import React, { useEffect, useState } from 'react';
import ModulesApi from '@/api/moduleApi';


interface WeatherDay {
  dt: number;
  temp: { day: number };
  weather: { description: string; icon: string }[];
}

const WeatherBox: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { authApi } = ModulesApi();
  useEffect(() => {
    // Update local time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('vi-VN', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const resp = await authApi.getWeather()
        setWeather(resp?.data?.data?.data)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading || error || !weather) {
    // Khi đóng, chỉ hiện nút nhỏ gọn
    return (
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <button
          aria-label="Xem thời tiết"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00b7ff 0%, #0052d4 100%)',
            border: 'none', color: '#fff', fontSize: 24, boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10), 0 1.5px 8px 0 rgba(0,183,255,0.15)', cursor: 'pointer'
          }}
          onClick={() => setOpen(true)}
        >
          ☀️
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Nút nhỏ gọn khi box đang đóng */}
      {!open && (
        <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 9999 }}>
          <button
            aria-label="Xem thời tiết"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00b7ff 0%, #0052d4 100%)',
              border: 'none', color: '#fff', fontSize: 24, boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10), 0 1.5px 8px 0 rgba(0,183,255,0.15)', cursor: 'pointer'
            }}
            onClick={() => setOpen(true)}
          >
            ☀️
          </button>
        </div>
      )}
      {/* Box thời tiết trượt lên khi mở */}
      <div
        className={`weather-slide-box${open ? ' open' : ''}`}
        style={{
          position: 'fixed',
          bottom: open ? 24 : -320, // Ẩn dưới màn hình khi đóng
          left: 24,
          zIndex: 10000,
          transition: 'bottom 0.4s cubic-bezier(.4,2,.3,1)',
          boxShadow: open ? '0 8px 24px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,183,255,0.10)' : 'none',
        }}
      >
        <div
          className="weather-box"
          style={{
            padding: 18,
            borderRadius: 22,
        background: 'linear-gradient(135deg, rgba(0,183,255,0.85) 0%, rgba(0,82,212,0.85) 100%)',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.13), 0 2px 8px 0 rgba(0,183,255,0.10)',
        border: '2px solid #00bfff',
        minWidth: 220,
        maxWidth: 260,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.22s cubic-bezier(.4,2,.3,1), box-shadow 0.22s',
        cursor: 'pointer',
        zIndex: 9999,
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      {/* Nút đóng */}
      <button
        aria-label="Đóng"
        style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', zIndex: 2 }}
        onClick={() => setOpen(false)}
      >
        ×
      </button>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2, letterSpacing: 0.5, textShadow: '0 1px 6px #00e6ff44', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        <span style={{marginRight: 5, verticalAlign: 'middle'}}>🌤️</span>Hà Nội
      </div>
      <div style={{ fontSize: 11, marginBottom: 8, opacity: 0.85, fontWeight: 400, textShadow: '0 1px 2px #0004', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        🕒 <span>{currentTime}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5, justifyContent: 'center' }}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          style={{ width: 48, height: 48, filter: 'drop-shadow(0 2px 8px #00bfff88)' }}
        />
        <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1, color: '#e3f6fd', textShadow: '0 2px 8px #00bfff88', fontFamily: 'DS-Digital, monospace, Arial' }}>
            {Math.round(weather.main.temp)}°C
          </div>
          <div style={{ fontSize: 12, fontWeight: 400, color: '#e0f7fa', textTransform: 'capitalize', textShadow: '0 1px 3px #005fa366', fontFamily: 'Segoe UI, Arial, sans-serif' }}>{weather.weather[0].description}</div>
        </div>
      </div>
      {/* Glow border animation */}
      <div style={{
        position: 'absolute',
        top: -30, left: -30, width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, #00e6ffcc 0%, transparent 70%)',
        filter: 'blur(12px)',
        opacity: 0.5,
        pointerEvents: 'none',
        animation: 'weather-glow 2.8s ease-in-out infinite alternate',
      }} />
      <style>{`
        @font-face {
          font-family: 'DS-Digital';
          src: local('DS-Digital'), url('https://fonts.cdnfonts.com/s/14650/DS-DIGI.TTF') format('truetype');
          font-display: swap;
        }
        @keyframes weather-glow {
          0% { opacity: 0.4; transform: scale(1) translateY(0); }
          100% { opacity: 0.7; transform: scale(1.15) translateY(8px); }
        }
      `}</style>
        </div>
      </div>
      <style>{`
        .weather-slide-box {
          pointer-events: none;
        }
        .weather-slide-box.open {
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};

export default WeatherBox;
