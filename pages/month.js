import Head from 'next/head';

export async function getServerSideProps({ query }) {
  const { lang = 'en' } = query;
  
  try {
    const res = await fetch('https://api.vvhan.com/api/horoscope?type=capricorn&time=month');
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

export default function Month({ apiData, lang }) {
  const titles = {
    en: 'Month Horoscope',
    zh: '本月运势',
    ja: '今月の運勢'
  };
  
  const title = titles[lang] || titles.en;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`本月运势 - ${lang}`} />
      </Head>
      <div>
        <h1>{title}</h1>
        <p>当前语言: {lang}</p>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </>
  );
} 