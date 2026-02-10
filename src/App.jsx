import { useState, useContext, useReducer } from 'react'
import React from 'react'
import './App.css'

const patterns = [
  {
    id: 1,
    name: 'Higher-Order Components (HOC)',
    shortName: 'HOC',
    icon: '🎁',
    description: 'Komponent logikasinı yenidən istifadə etmək üçün mövcud komponentləri səslən edən yüksəksəviyyəli funksiya.',
    detailedExplanation: `HOC (Higher-Order Component) bir komponentə alıb yeni funksionalları əlavə edərək təkmilləşdirilmiş komponent qaytaran funksiadır. 
    
    Məsələn: Bir komponentə logging, autentifikasiya və ya tema dəstəyi əlavə etmək istəyirsinizsə, HOC istifadə edərək bunu asanlıqla edə bilərsiniz.
    
    Üstünlükləri:
    • Kod təkrarçılığını azaldır
    • Komponent logikaları asanlıqla paylaşılır
    • İstifadəsi sadədir
    
    Dezavantajları:
    • Static metodlar klonlanmır
    • Ref-ləri avtomatik ötürülmür
    • Prop konflikti ola bilər`,
    codeExample: `// HOC Yaradılması
const withTheme = (Component) => {
  return (props) => {
    const theme = { color: 'blue', bg: '#f0f0f0' };
    return <Component {...props} theme={theme} />;
  };
};

// İstifadəsi
const MyComponent = ({ theme }) => (
  <div style={theme}>
    Mənə Tema Tətbiq Edildi
  </div>
);

export default withTheme(MyComponent);`,
    useCases: 'Autentifikasiya kontrolu, tema dəstəyi, data fetching, logging və monitoring'
  },
  {
    id: 2,
    name: 'Factory Pattern',
    shortName: 'Factory',
    icon: '🏭',
    description: 'Müxtəlif tipli nəsnələri yaratmaq üçün soyut interfeys təqdim edən pattern.',
    detailedExplanation: `Factory Pattern, fərqli tipli komponentləri dinamik olaraq yaratmaq üçün istifadə edilir.
    
    Bu pattern xüsusilə formalar, kartlar, siyahı elementləri kimi müxtəlif tipli elementləri render etməli olduğunuzda faydalıdır.
    
    Üstünlükləri:
    • Nəsn yaratma məntiqini mərkəzləşdirir
    • Yeni tipləri asanlıqla əlavə edə bilərsiz
    • Koddakı if/else ifadələrindən qaçmağa kömək edir
    
    Dezavantajları:
    • Fazəda kod olması ola bilər
    • Debugging çətin ola bilər`,
    codeExample: `// Factory Funksiyası
const CardFactory = (type, props) => {
  const cardTypes = {
    product: (p) => (
      <div className="card">
        <h3>{p.name}</h3>
        <p>Qiymət: \${p.price}</p>
      </div>
    ),
    user: (p) => (
      <div className="card">
        <h2>{p.fullName}</h2>
        <p>Email: {p.email}</p>
      </div>
    ),
    blog: (p) => (
      <div className="card">
        <h4>{p.title}</h4>
        <p>{p.excerpt}</p>
      </div>
    ),
  };
  
  return cardTypes[type]?.(props) || null;
};

// İstifadəsi
CardFactory('product', { name: 'Telefon', price: 500 });
CardFactory('user', { fullName: 'Əli', email: 'ali@mail.com' });`,
    useCases: 'Müxtəlif tipli komponentlərin dinamik yaradılması, forumlar, məlumat kartları'
  },
  {
    id: 3,
    name: 'Compound Components Pattern',
    shortName: 'Compound',
    icon: '🔧',
    description: 'Bir-birini tamamlayan bir qrup komponentlərin birlikdə işləməsi.',
    detailedExplanation: `Compound Components, bir ana komponentə uyğun olan alt komponentlərdən ibarət bir sistem yaratır.
    
    Bu pattern, komponentin intern state-ini kontrolledən çıxarmadan, istifadəçiyə komponentini necə quracağına çoxlu seçimə verir.
    
    Məsələn: Seçim Qutusunun (Select), Tabların, Akkordion kimi komponentləri düşünün.
    
    Üstünlükləri:
    • Elastik API təqdim edir
    • Açıq API ilə sıx bağlanmış kod yazılmır
    • Komponentlərin arası mənbə keçən
    
    Dezavantajları:
    • DOM strukturu daha mürəkkəb ola bilər
    • Props-u ayırmaq çətin ola bilər`,
    codeExample: `// Compound Component
const Tabs = ({ children }) => {
  const [active, setActive] = useState(0);
  
  return (
    <div>
      {React.Children.map(children, (child, idx) => (
        <button 
          onClick={() => setActive(idx)}
          className={active === idx ? 'active' : ''}
        >
          {child.props.label}
        </button>
      ))}
      {children[active]}
    </div>
  );
};

Tabs.Panel = ({ label, children }) => <div>{children}</div>;

// İstifadəsi
<Tabs>
  <Tabs.Panel label="Səkil">Səkil Məzmunu</Tabs.Panel>
  <Tabs.Panel label="Oluşturma">Oluşturma Məzmunu</Tabs.Panel>
</Tabs>`,
    useCases: 'Tab sistemi, akkordion, seçim qutusu, dropdown menyular'
  },
  {
    id: 4,
    name: 'Context API Pattern',
    shortName: 'Context',
    icon: '🎭',
    description: 'Qlobal state-i bir-birinə ötürmədən dərin komponant ağacına keçmə.',
    detailedExplanation: `Context API, props drilling probleminə çözüm təqdim edir.
    
    Redux kimi kiçik layihələr üçün yüngül bir alternativdir. Tema, dil seçimi, autentifikasiya kimi qlobal məlumatlar üçün əla seçimdir.
    
    Üstünlükləri:
    • Props drilling-dən qaçır
    • Redux-ə ehtiyac yoxdur
    • React-ə daxildir, əlavə paket tələb etmir
    
    Dezavantajları:
    • Performance problemləri ola bilər (çoxlu renderinq)
    • Böyük state-ləri idarə etməkdə çətin ola bilər
    • Debugging çətin ola bilər`,
    codeExample: `// Context Yaradılması
const ThemeContext = React.createContext();

// Provider Komponenti
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook-ə erişim
const useTheme = () => useContext(ThemeContext);

// İstifadəsi
const App = () => (
  <ThemeProvider>
    <MyComponent />
  </ThemeProvider>
);

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Temaya Dəyiş</button>
    </div>
  );
};`,
    useCases: 'Tema dəstəyi, dil seçimi, autentifikasiya, konfiqurasiyon'
  },
  {
    id: 5,
    name: 'Custom Hooks Pattern',
    shortName: 'Custom Hooks',
    icon: '🪝',
    description: 'Stateful logikaları komponentlər arasında yenidən istifadə etmək üçün öz hooks-ları yaratmaq.',
    detailedExplanation: `Custom Hooks, React hooks-dan istifadə edərək öz əl sayəsilən hook-larını yaradmağa imkan verir.
    
    Mənəv "use" ilə başlamalı və içində digər hooks istifadə edə bilərlər.
    
    Faydaları:
    • Logikaları asanlıqla komponentlər arasında paylaşma
    • Komponenti sadə tutma
    • Yenidən istifadəsi asan kod yazmaq
    
    Real Dünya Nümunələri:
    • useWindowSize - Pəncərə ölçüsünü təqib et
    • useFetch - API məlumatlarını fetch et
    • useLocalStorage - Local Storage-a müraciət et
    • useForm - Form state-ini idarə et`,
    codeExample: `// Custom Hook - useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  
  const setStoredValue = (newValue) => {
    const valueToStore = typeof newValue === 'function' 
      ? newValue(value) 
      : newValue;
    setValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  
  return [value, setStoredValue];
};

// İstifadəsi
const MyComponent = () => {
  const [count, setCount] = useLocalStorage('count', 0);
  
  return (
    <div>
      <p>Sayı: {count}</p>
      <button onClick={() => setCount(count + 1)}>Artır</button>
    </div>
  );
};`,
    useCases: 'Data fetching, form idarəetməsi, localStorage işləri, pəncərə məlumatları'
  },
  {
    id: 6,
    name: 'Reducer Pattern',
    shortName: 'Reducer',
    icon: '⚙️',
    description: 'useReducer hook istifadə edərək mürəkkəb state logikasinı idarə etmə.',
    detailedExplanation: `Reducer pattern, Redux-ə bənzər bir yanaşma ilə mürəkkəb state logikasinı idarə etmə imkanı verir.
    
    State dəyişiklikləri action-lar vasitəsilə baş verir və reducer funksiyası bu action-ları işlər.
    
    Ne vaxt istifadə edilir:
    • State bir çox alt propertyi olan kompleks objekt olduğu zaman
    • Bir çox setState istifadəsi olduğu zaman
    • Öncəki state-ə bağlı olan logikaların olması
    
    Üstünlükləri:
    • Böyük state-ləri asanlıqla idarə edir
    • Testing asanlığı
    • Redux-ə transition asan olur
    
    Dezavantajları:
    • Kiçik komponentlər üçün Overly kompleks ola bilər`,
    codeExample: `// Reducer Funksiyası
const initialState = { count: 0, isLoading: false, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// Komponenti
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Sayı: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Artır</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Azalt</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Sıfırla</button>
    </div>
  );
};`,
    useCases: 'Mürəkkəb form state, e-commerce səbəti, authentication state'
  },
  {
    id: 7,
    name: 'Strategy Pattern',
    shortName: 'Strategy',
    icon: '🎯',
    description: 'Algoritm ailəsini inkapsulyasiya etərək hər birini dəyişdirmə qabul edən pattern.',
    detailedExplanation: `Strategy Pattern, müxtəlif algoritm variantlarını təqdim edən bir sxem yaratır.
    
    Komponentə "strategi" ötürürüz və komponenti hər bir strategi üçün fərqli şəkildə hərəkət edir.
    
    Real Dünya Nümünələri:
    • Ödəniş üsulları (Kredit Kartı, PayPal, Apple Pay)
    • Sıralama strategiyaları (A-Z, Yeni, Ən Populyar)
    • Filtrləmə strategiyaları
    
    Üstünlükləri:
    • Algoritm dəyişdirmə asandır
    • Yeni strategilər asanlıqla əlavə edilə bilər
    • Kod daha sadə və anlaşılı olur
    
    Dezavantajları:
    • Fazəda kod ola bilər
    • Strategilər arasında keçid pərdələnmir`,
    codeExample: `// Strategiləri Tanımlamaq
const paymentStrategies = {
  creditCard: (amount) => {
    console.log(\`Kredit Kartı ilə \${amount}₼ ödəndi\`);
  },
  paypal: (amount) => {
    console.log(\`PayPal ilə \${amount}₼ ödəndi\`);
  },
  applePay: (amount) => {
    console.log(\`Apple Pay ilə \${amount}₼ ödəndi\`);
  }
};

// Komponent
const PaymentProcessor = ({ method, amount }) => {
  const [status, setStatus] = useState('');
  
  const handlePayment = () => {
    try {
      paymentStrategies[method]?.(amount);
      setStatus('Ödəniş tamamlandı!');
    } catch (e) {
      setStatus('Xəta baş verdi');
    }
  };
  
  return (
    <div>
      <button onClick={handlePayment}>Ödə</button>
      <p>{status}</p>
    </div>
  );
};

// İstifadəsi
<PaymentProcessor method="creditCard" amount={100} />
<PaymentProcessor method="paypal" amount={50} />`,
    useCases: 'Ödəniş sistemləri, sıralama/filtrlər, rapor generation'
  },
  {
    id: 8,
    name: 'Observer Pattern',
    shortName: 'Observer',
    icon: '👁️',
    description: 'Bir mənbənin vəziyyəti dəyişdikdə, buna asılı bütün elementlərə xəbər vermə.',
    detailedExplanation: `Observer Pattern, pub-sub modelinə əsaslanır. Bir hadisə baş verən zaman, onu dinləyən bütün "observers"-lər bildiriş alır.
    
    React-də bu pattern Event Emitters, Custom Hooks və ya Context API ilə həyata keçirilə bilər.
    
    Üstünlükləri:
    • Komponentin arasında loose coupling
    • Dinamik subscriber əlavə/silmə
    • Event-driven architecture
    
    Real Dünya Nümünələri:
    • Real-time notifications
    • Live chat mesajları
    • Stock price updates
    • Colaborative editing`,
    codeExample: `// Event Emitter sınıfı
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// İstifadəsi React-də
const myEmitter = new EventEmitter();

const Component1 = () => {
  useEffect(() => {
    const handleUpdate = (data) => {
      console.log('Component1 məlumat aldı:', data);
    };
    myEmitter.on('update', handleUpdate);
    
    return () => myEmitter.off('update', handleUpdate);
  }, []);
  
  return <div>Məlumat dinləyir...</div>;
};

const Component2 = () => {
  const sendUpdate = () => {
    myEmitter.emit('update', { message: 'Salam!' });
  };
  
  return <button onClick={sendUpdate}>Göndər</button>;
};`,
    useCases: 'Real-time notifications, event-driven systems, pub-sub messaging'
  }
]

function PatternCard({ pattern, isSelected, onSelect }) {
  return (
    <div 
      className={`pattern-card ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(pattern.id)}
    >
      <div className="pattern-icon">{pattern.icon}</div>
      <h3 className="pattern-title">{pattern.shortName}</h3>
      <p className="pattern-meta">Pattern #{pattern.id}</p>
    </div>
  )
}

function PatternDetail({ pattern }) {
  const [codeExpanded, setCodeExpanded] = useState(false)

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="detail-icon">{pattern.icon}</div>
        <div>
          <h2>{pattern.name}</h2>
          <span className="detail-number">Pattern #{pattern.id}</span>
        </div>
      </div>

      <div className="detail-section">
        <h4>📖 Qısa Təsvir</h4>
        <p>{pattern.description}</p>
      </div>

      <div className="detail-section">
        <h4>📚 Detallı Açıqlama</h4>
        <p className="detailed-text">{pattern.detailedExplanation}</p>
      </div>

      <div className="detail-section">
        <div className="code-header">
          <h4>💻 Kod Nümunəsi</h4>
          <button 
            className="expand-btn"
            onClick={() => setCodeExpanded(!codeExpanded)}
          >
            {codeExpanded ? '📖 Kiçilt' : '📖 Genişlət'}
          </button>
        </div>
        <code className={`code-block ${codeExpanded ? 'expanded' : ''}`}>
          {pattern.codeExample}
        </code>
      </div>

      <div className="detail-section">
        <h4>🎯 İstifadə Halları</h4>
        <p>{pattern.useCases}</p>
      </div>
    </div>
  )
}

function App() {
  const [selectedPatternId, setSelectedPatternId] = useState(1)
  const selectedPattern = patterns.find(p => p.id === selectedPatternId)

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">React Patterns</h1>
          <p className="app-subtitle">8 Advanced Patterns</p>
        </div>

        <div className="patterns-list">
          {patterns.map(pattern => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              isSelected={selectedPatternId === pattern.id}
              onSelect={setSelectedPatternId}
            />
          ))}
        </div>
      </aside>

      <main className="main-content">
        {selectedPattern && <PatternDetail pattern={selectedPattern} />}
      </main>
    </div>
  )
}

export default App