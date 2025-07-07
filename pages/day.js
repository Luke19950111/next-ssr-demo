import Head from 'next/head';

export async function getServerSideProps({ query }) {
  const { lang = 'en' } = query;
  
  try {
    // 调用外部后端接口，获取今日运势
    const res = await fetch('https://api.vvhan.com/api/horoscope?type=capricorn&time=today');
    const data = await res.json();
    
    return {
      props: {
        apiData: data, // 直接传递接口返回的数据
        lang
      }
    };
  } catch (error) {
    console.error('获取数据失败:', error);
    return {
      props: {
        apiData: {},
        lang
      }
    };
  }
}

export default function Day({ apiData, lang }) {
  // 根据 lang 参数设置 title
  const titles = {
    en: 'Today Horoscope',
    zh: '今日运势',
    ja: '今日の運勢'
  };
  
  console.log('今日运势数据:', apiData);
  const title = titles[lang] || titles.en;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`今日运势 - ${lang}`} />
      </Head>
      <div>
        <h1>{title}</h1>
        <p>当前语言: {lang}</p>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </>
  );
} 