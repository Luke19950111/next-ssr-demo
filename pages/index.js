import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { lang = 'en' } = router.query;
  
  // 根据 lang 参数设置 title
  const titles = {
    en: 'Horoscope Navigation',
    zh: '运势导航',
    ja: '運勢ナビゲーション'
  };
  
  const title = titles[lang] || titles.en;
  
  // 导航函数
  const navigateTo = (path) => {
    router.push(`${path}?lang=${lang}`);
  };
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`运势导航 - ${lang}`} />
      </Head>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>当前语言: {lang}</p>
        
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={() => navigateTo('/day')}
            style={{
              padding: '15px 30px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {lang === 'zh' ? '今日运势' : lang === 'ja' ? '今日の運勢' : 'Today Horoscope'}
          </button>
          
          <button 
            onClick={() => navigateTo('/week')}
            style={{
              padding: '15px 30px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {lang === 'zh' ? '本周运势' : lang === 'ja' ? '今週の運勢' : 'Week Horoscope'}
          </button>
          
          <button 
            onClick={() => navigateTo('/month')}
            style={{
              padding: '15px 30px',
              margin: '10px',
              fontSize: '16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {lang === 'zh' ? '本月运势' : lang === 'ja' ? '今月の運勢' : 'Month Horoscope'}
          </button>
        </div>
      </div>
    </>
  );
} 