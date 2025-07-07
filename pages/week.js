import Head from 'next/head';

export async function getServerSideProps({ query }) {
  const { lang = 'en' } = query;
  
  try {
    const res = await fetch('https://api.vvhan.com/api/horoscope?type=capricorn&time=week');
    const data = await res.json();
    
    return {
      props: {
        apiData: data,
        lang
      }
    };
  } catch (error) {
    return {
      props: {
        apiData: {},
        lang
      }
    };
  }
}

export default function Week({ apiData, lang }) {
  const titles = {
    en: 'Week Horoscope',
    zh: '本周运势',
    ja: '今週の運勢'
  };
  
  const title = titles[lang] || titles.en;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`本周运势 - ${lang}`} />
      </Head>
      <div>
        <h1>{title}</h1>
        <p>当前语言: {lang}</p>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </>
  );
} 