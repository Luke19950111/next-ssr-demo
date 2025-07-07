import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { lang = 'en' } = router.query;
  const [selectedZodiac, setSelectedZodiac] = useState('capricorn');
  
  // 根据 lang 参数设置 title
  const titles = {
    en: 'Horoscope Navigation',
    zh: '运势导航',
    ja: '運勢ナビゲーション'
  };
  
  const title = titles[lang] || titles.en;
  
  // 星座选择器
  const zodiacOptions = [
    { value: 'aries', label: '白羊座', emoji: '♈' },
    { value: 'taurus', label: '金牛座', emoji: '♉' },
    { value: 'gemini', label: '双子座', emoji: '♊' },
    { value: 'cancer', label: '巨蟹座', emoji: '♋' },
    { value: 'leo', label: '狮子座', emoji: '♌' },
    { value: 'virgo', label: '处女座', emoji: '♍' },
    { value: 'libra', label: '天秤座', emoji: '♎' },
    { value: 'scorpio', label: '天蝎座', emoji: '♏' },
    { value: 'sagittarius', label: '射手座', emoji: '♐' },
    { value: 'capricorn', label: '摩羯座', emoji: '♑' },
    { value: 'aquarius', label: '水瓶座', emoji: '♒' },
    { value: 'pisces', label: '双鱼座', emoji: '♓' }
  ];
  
  // 导航函数
  const navigateTo = (path) => {
    router.push(`${path}?lang=${lang}&type=${selectedZodiac}`);
  };
  
  // 语言切换函数
  const switchLanguage = (newLang) => {
    router.push(`/?lang=${newLang}&type=${selectedZodiac}`);
  };
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`运势导航 - ${lang}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="container">
        <style jsx>{`
          .container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .content {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .title {
            font-size: 3rem;
            font-weight: 700;
            color: #2d3748;
            margin: 0 0 10px 0;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .subtitle {
            font-size: 1.2rem;
            color: #718096;
            margin-bottom: 30px;
          }
          
          .language-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
          }
          
          .lang-btn {
            padding: 8px 16px;
            border: 2px solid #e2e8f0;
            background: white;
            color: #4a5568;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .lang-btn.active {
            border-color: #667eea;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
          }
          
          .lang-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .zodiac-selector {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          
          .selector-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .zodiac-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 12px;
          }
          
          .zodiac-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 10px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            background: #f7fafc;
          }
          
          .zodiac-option:hover {
            background: #edf2f7;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
          
          .zodiac-option.active {
            border-color: #667eea;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          }
          
          .zodiac-emoji {
            font-size: 1.8rem;
            margin-bottom: 8px;
          }
          
          .zodiac-label {
            font-size: 0.85rem;
            font-weight: 500;
            text-align: center;
          }
          
          .navigation-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }
          
          .nav-card {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
          }
          
          .nav-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
          }
          
          .nav-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .nav-card.day {
            border-left: 5px solid #667eea;
          }
          
          .nav-card.week {
            border-left: 5px solid #48bb78;
          }
          
          .nav-card.month {
            border-left: 5px solid #ed8936;
          }
          
          .nav-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            display: block;
          }
          
          .nav-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
          }
          
          .nav-description {
            font-size: 0.95rem;
            color: #718096;
            line-height: 1.5;
          }
          
          .selected-zodiac {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            .content {
              padding: 25px;
              border-radius: 15px;
            }
            
            .title {
              font-size: 2.2rem;
            }
            
            .zodiac-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            
            .navigation-cards {
              grid-template-columns: 1fr;
            }
            
            .nav-card {
              padding: 25px;
            }
          }
          
          @media (max-width: 480px) {
            .title {
              font-size: 1.8rem;
            }
            
            .zodiac-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .content {
              padding: 20px;
            }
            
            .language-selector {
              flex-wrap: wrap;
            }
          }
        `}</style>
        
        <div className="content">
          <div className="header">
            <h1 className="title">{title}</h1>
            <p className="subtitle">
              {lang === 'zh' ? '探索你的星座运势，了解每日、每周、每月的运势变化' : 
               lang === 'ja' ? 'あなたの星座運勢を探索し、日々、週間、月間の運勢変化を理解する' :
               'Explore your zodiac horoscope and understand daily, weekly, and monthly fortune changes'}
            </p>
            
            <div className="language-selector">
              <button 
                className={`lang-btn ${lang === 'zh' ? 'active' : ''}`}
                onClick={() => switchLanguage('zh')}
              >
                中文
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => switchLanguage('en')}
              >
                English
              </button>
              <button 
                className={`lang-btn ${lang === 'ja' ? 'active' : ''}`}
                onClick={() => switchLanguage('ja')}
              >
                日本語
              </button>
            </div>
          </div>
          
          <div className="zodiac-selector">
            <div className="selector-title">
              {lang === 'zh' ? '选择你的星座' : 
               lang === 'ja' ? 'あなたの星座を選択' : 'Choose Your Zodiac Sign'}
            </div>
            <div className="zodiac-grid">
              {zodiacOptions.map((zodiac) => (
                <div
                  key={zodiac.value}
                  className={`zodiac-option ${selectedZodiac === zodiac.value ? 'active' : ''}`}
                  onClick={() => setSelectedZodiac(zodiac.value)}
                >
                  <div className="zodiac-emoji">{zodiac.emoji}</div>
                  <div className="zodiac-label">{zodiac.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="selected-zodiac">
            {lang === 'zh' ? `已选择：${zodiacOptions.find(z => z.value === selectedZodiac)?.label}` :
             lang === 'ja' ? `選択済み：${zodiacOptions.find(z => z.value === selectedZodiac)?.label}` :
             `Selected: ${zodiacOptions.find(z => z.value === selectedZodiac)?.label}`}
          </div>
          
          <div className="navigation-cards">
            <div className="nav-card day" onClick={() => navigateTo('/day')}>
              <span className="nav-icon">🌅</span>
              <div className="nav-title">
                {lang === 'zh' ? '今日运势' : lang === 'ja' ? '今日の運勢' : 'Today Horoscope'}
              </div>
              <div className="nav-description">
                {lang === 'zh' ? '查看今日详细运势分析，包括爱情、事业、财运和健康' :
                 lang === 'ja' ? '今日の詳細な運勢分析を確認し、恋愛、仕事、金運、健康を含む' :
                 'View detailed daily horoscope analysis including love, career, wealth and health'}
              </div>
            </div>
            
            <div className="nav-card week" onClick={() => navigateTo('/week')}>
              <span className="nav-icon">📅</span>
              <div className="nav-title">
                {lang === 'zh' ? '本周运势' : lang === 'ja' ? '今週の運勢' : 'Week Horoscope'}
              </div>
              <div className="nav-description">
                {lang === 'zh' ? '了解本周整体运势走向，为未来一周做好准备' :
                 lang === 'ja' ? '今週の全体的な運勢の流れを理解し、来週の準備をする' :
                 'Understand this week\'s overall fortune trends and prepare for the coming week'}
              </div>
            </div>
            
            <div className="nav-card month" onClick={() => navigateTo('/month')}>
              <span className="nav-icon">🗓️</span>
              <div className="nav-title">
                {lang === 'zh' ? '本月运势' : lang === 'ja' ? '今月の運勢' : 'Month Horoscope'}
              </div>
              <div className="nav-description">
                {lang === 'zh' ? '掌握本月运势大局，规划重要决策和人生方向' :
                 lang === 'ja' ? '今月の運勢の全体像を把握し、重要な決定と人生の方向性を計画する' :
                 'Grasp the overall picture of this month\'s fortune and plan important decisions and life direction'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 