import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  
  // 根据 lang 参数设置 title
  const titles = {
    en: 'Today Horoscope',
    zh: '今日运势',
    ja: '今日の運勢'
  };
  
  const title = titles[lang] || titles.en;
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };
  
  // 获取星座名称
  const getZodiacName = (type) => {
    const zodiacMap = {
      'aries': '白羊座',
      'taurus': '金牛座',
      'gemini': '双子座',
      'cancer': '巨蟹座',
      'leo': '狮子座',
      'virgo': '处女座',
      'libra': '天秤座',
      'scorpio': '天蝎座',
      'sagittarius': '射手座',
      'capricorn': '摩羯座',
      'aquarius': '水瓶座',
      'pisces': '双鱼座'
    };
    return zodiacMap[type] || type;
  };
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`今日运势 - ${lang}`} />
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
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
          }
          
          .backButton {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          .backButton:hover {
            transform: translateY(-50%) scale(1.05);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          
          .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
            margin: 0;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .date {
            font-size: 1.1rem;
            color: #718096;
            margin-top: 10px;
            font-weight: 500;
          }
          
          .horoscope-card {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 5px solid #667eea;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
          
          .zodiac-info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .zodiac-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-right: 20px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          .zodiac-details h3 {
            margin: 0 0 5px 0;
            font-size: 1.5rem;
            color: #2d3748;
            font-weight: 600;
          }
          
          .zodiac-details p {
            margin: 0;
            color: #718096;
            font-size: 1rem;
          }
          
          .fortune-section {
            margin-bottom: 25px;
          }
          
          .fortune-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          
          .fortune-title::before {
            content: '✨';
            margin-right: 8px;
            font-size: 1.1rem;
          }
          
          .fortune-content {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            line-height: 1.6;
            color: #4a5568;
            font-size: 1rem;
          }
          
          .lucky-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          
          .lucky-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease;
          }
          
          .lucky-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .lucky-label {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 5px;
            font-weight: 500;
          }
          
          .lucky-value {
            font-size: 1.1rem;
            color: #2d3748;
            font-weight: 600;
          }
          
          .fortune-scores {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          
          .score-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            gap: 15px;
          }
          
          .score-item:last-child {
            margin-bottom: 0;
          }
          
          .score-label {
            min-width: 40px;
            font-size: 0.9rem;
            color: #4a5568;
            font-weight: 500;
          }
          
          .score-bar {
            flex: 1;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .score-fill {
            height: 100%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 4px;
            transition: width 0.3s ease;
          }
          
          .score-value {
            min-width: 30px;
            font-size: 0.9rem;
            color: #2d3748;
            font-weight: 600;
            text-align: right;
          }
          
          .todo-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .todo-item {
            display: flex;
            align-items: flex-start;
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          
          .todo-item.good {
            border-left: 4px solid #48bb78;
          }
          
          .todo-item.bad {
            border-left: 4px solid #f56565;
          }
          
          .todo-icon {
            font-size: 1.2rem;
            margin-right: 10px;
            margin-top: 2px;
          }
          
          .todo-content {
            flex: 1;
          }
          
          .todo-label {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 5px;
          }
          
          .todo-item.good .todo-label {
            color: #48bb78;
          }
          
          .todo-item.bad .todo-label {
            color: #f56565;
          }
          
          .todo-text {
            font-size: 0.9rem;
            color: #4a5568;
            line-height: 1.4;
          }
          
          .error-message {
            text-align: center;
            color: #e53e3e;
            font-size: 1.1rem;
            padding: 40px 20px;
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            .content {
              padding: 20px;
              border-radius: 15px;
            }
            
            .title {
              font-size: 2rem;
            }
            
            .backButton {
              position: static;
              transform: none;
              margin-bottom: 20px;
              width: 100%;
            }
            
            .header {
              text-align: center;
              margin-bottom: 25px;
            }
            
            .zodiac-info {
              flex-direction: column;
              text-align: center;
            }
            
            .zodiac-icon {
              margin-right: 0;
              margin-bottom: 15px;
            }
            
            .lucky-info {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .todo-info {
              grid-template-columns: 1fr;
            }
          }
          
          @media (max-width: 480px) {
            .title {
              font-size: 1.8rem;
            }
            
            .lucky-info {
              grid-template-columns: 1fr;
            }
            
            .content {
              padding: 15px;
            }
            
            .score-item {
              gap: 10px;
            }
            
            .score-label {
              min-width: 35px;
              font-size: 0.8rem;
            }
            
            .score-value {
              min-width: 25px;
              font-size: 0.8rem;
            }
          }
        `}</style>
        
        <div className="content">
          <div className="header">
            <button 
              className="backButton" 
              onClick={() => router.push('/')}
            >
              ← 返回首页
            </button>
            <h1 className="title">{title}</h1>
            <p className="date">{formatDate(new Date())}</p>
          </div>
          
          {apiData.success ? (
            <div className="horoscope-card">
              <div className="zodiac-info">
                <div className="zodiac-icon">
                  {apiData.data.title?.charAt(0) || getZodiacName(apiData.data.name).charAt(0)}
                </div>
                <div className="zodiac-details">
                  <h3>{apiData.data.title || getZodiacName(apiData.data.name)}</h3>
                  <p>{apiData.data.time} · {apiData.data.shortcomment}</p>
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">综合运势</div>
                <div className="fortune-content">
                  {apiData.data.fortunetext?.all || '暂无数据'}
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">爱情运势</div>
                <div className="fortune-content">
                  {apiData.data.fortunetext?.love || '暂无数据'}
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">事业运势</div>
                <div className="fortune-content">
                  {apiData.data.fortunetext?.work || '暂无数据'}
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">财运分析</div>
                <div className="fortune-content">
                  {apiData.data.fortunetext?.money || '暂无数据'}
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">健康提醒</div>
                <div className="fortune-content">
                  {apiData.data.fortunetext?.health || '暂无数据'}
                </div>
              </div>
              
              <div className="fortune-section">
                <div className="fortune-title">运势评分</div>
                <div className="fortune-scores">
                  <div className="score-item">
                    <span className="score-label">综合</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${apiData.data.fortune?.all * 20}%`}}></div>
                    </div>
                    <span className="score-value">{apiData.data.fortune?.all}/5</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">爱情</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${apiData.data.fortune?.love * 20}%`}}></div>
                    </div>
                    <span className="score-value">{apiData.data.fortune?.love}/5</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">事业</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${apiData.data.fortune?.work * 20}%`}}></div>
                    </div>
                    <span className="score-value">{apiData.data.fortune?.work}/5</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">财运</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${apiData.data.fortune?.money * 20}%`}}></div>
                    </div>
                    <span className="score-value">{apiData.data.fortune?.money}/5</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">健康</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${apiData.data.fortune?.health * 20}%`}}></div>
                    </div>
                    <span className="score-value">{apiData.data.fortune?.health}/5</span>
                  </div>
                </div>
              </div>
              
              {apiData.data.todo && (
                <div className="fortune-section">
                  <div className="fortune-title">今日宜忌</div>
                  <div className="todo-info">
                    <div className="todo-item good">
                      <div className="todo-icon">✅</div>
                      <div className="todo-content">
                        <div className="todo-label">宜</div>
                        <div className="todo-text">{apiData.data.todo.yi}</div>
                      </div>
                    </div>
                    <div className="todo-item bad">
                      <div className="todo-icon">❌</div>
                      <div className="todo-content">
                        <div className="todo-label">忌</div>
                        <div className="todo-text">{apiData.data.todo.ji}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="lucky-info">
                <div className="lucky-item">
                  <div className="lucky-label">幸运数字</div>
                  <div className="lucky-value">{apiData.data.luckynumber || '--'}</div>
                </div>
                <div className="lucky-item">
                  <div className="lucky-label">幸运颜色</div>
                  <div className="lucky-value">{apiData.data.luckycolor || '--'}</div>
                </div>
                <div className="lucky-item">
                  <div className="lucky-label">幸运星座</div>
                  <div className="lucky-value">{apiData.data.luckyconstellation || '--'}</div>
                </div>
                <div className="lucky-item">
                  <div className="lucky-label">运势指数</div>
                  <div className="lucky-value">{apiData.data.index?.all || '--'}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-message">
              <p>😔 抱歉，暂时无法获取运势数据</p>
              <p>请稍后再试或检查网络连接</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 