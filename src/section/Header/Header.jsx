import {useEffect, useRef, useState} from 'react';
import styles from './header.module.scss';
import logo from '../../assets/лого 1ра.jpg';
import background from '../../assets/back.jpg';
import phone from './PhoneButton.module.scss';
import timeWork from './timeWork.module.scss';
import sunIcon from '../../assets/sun.png';
import moonIcon from '../../assets/moon.png';
import {FiClock, FiPhone} from 'react-icons/fi';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null);


    const toggleMenu = () => setIsOpen(prev => !prev);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleScroll = () => {
        if (navbarRef.current) {
            const offsetTop = navbarRef.current.offsetTop;
            const height = navbarRef.current.offsetHeight;
            setNavbarHeight(height);
            setIsSticky(window.scrollY > offsetTop + 50);
        }
    };

    const scrollToSection = (id) => {
        if (isOpen) toggleMenu();

        setActiveLink(id); // <-- активируем ссылку

        const element = document.getElementById(id);
        if (element && navbarRef.current) {
            const offset = element.getBoundingClientRect().top + window.scrollY - navbarRef.current.offsetHeight;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    };

    const fullPhone = '+7 (902) 330-12-15';

    const handleClick = () => {
        if (!isRevealed) {
            setIsRevealed(true);
        }
    };

    const isBusinessOpen = () => {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        // Assuming business hours are Mon-Fri 9:00-18:00
        return day >= 1 && day <= 5 && hours >= 10 && hours < 18;
    };

    const getCurrentDay = () => {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[new Date().getDay()];
    };

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const workingHours = [
        {day: 'Понедельник', hours: '10:00 - 18:00'},
        {day: 'Вторник', hours: '10:00 - 18:00'},
        {day: 'Среда', hours: '10:00 - 18:00'},
        {day: 'Четверг', hours: '10:00 - 18:00'},
        {day: 'Пятница', hours: '10:00 - 18:00'},
        {day: 'Суббота', hours: 'Выходной'},
        {day: 'Воскресенье', hours: 'Выходной'},
    ];

    return (
        <header className={styles.header} style={{backgroundImage: `url(${background})`}}>
            <div
                ref={navbarRef}
                className={`${styles['navbar-wrapper']} ${isSticky ? styles.sticky : ''}`}
            >
                <div className={styles.container}>
                    <nav className={styles.navbar}>
                        <div className={styles['navbar-link']}>
                            <a href="#header">
                                <img src={logo} alt="Logo" className={styles['navbar-logo']}/>
                            </a>
                        </div>

                        <div className={styles.navbarControls}>
                            <div className={styles.themeSwitch}>
                                <label className={styles.switch}>
                                    <input
                                        type="checkbox"
                                        checked={theme === 'light'}
                                        onChange={toggleTheme}
                                    />
                                    <span className={styles.slider}>
                                        <span className={styles.icon}>
                                            <img
                                                src={theme === 'light' ? sunIcon : moonIcon}
                                                className={styles.themeIcon}
                                                alt={theme === 'light' ? 'Sun icon' : 'Moon icon'}
                                            />
                                        </span>
                                    </span>
                                </label>
                            </div>

                            <button className={styles.burger} onClick={toggleMenu}>
                                <span className={isOpen ? styles.open : ''}></span>
                                <span className={isOpen ? styles.open : ''}></span>
                                <span className={isOpen ? styles.open : ''}></span>
                            </button>
                        </div>

                        <div className={`${styles['navbar-menu']} ${isOpen ? styles.open : ''}`}>
                            <a
                                onClick={() => scrollToSection('about')}
                                className={activeLink === 'about' ? styles.active : ''}
                            >
                                О нас
                            </a>
                            <a
                                onClick={() => scrollToSection('price')}
                                className={activeLink === 'price' ? styles.active : ''}
                            >
                                Каталог
                            </a>
                            <a
                                onClick={() => scrollToSection('contacts')}
                                className={activeLink === 'contacts' ? styles.active : ''}
                            >
                                Контакты
                            </a>
                        </div>

                    </nav>
                </div>
            </div>

            {isSticky && <div style={{height: `${navbarHeight}px`}}></div>}

            <div className={styles.container}>
                <div className={styles['header-content']}>
                    <h1>Первое рекламное агентство</h1>
                    <p>Рекламное агентство, Организация мероприятий, Полиграфические услуги</p>
                    <p>Рекламное агентство полного цикла</p>

                    <button className={phone.phoneButton} onClick={handleClick}>
                        <FiPhone className={phone.icon}/>
                        <span className={phone.number}>
                            {fullPhone}
                            {!isRevealed && (
                                <span className={phone.revealWrapper}>
                                    <span className={phone.hiddenOverlay}></span>
                                    <span className={phone.reveal}>Показать</span>
                                </span>
                            )}
                        </span>
                    </button>

                    <button
                        className={`${timeWork.hoursButton} ${isBusinessOpen() ? timeWork.open : timeWork.closed}`}
                        onClick={toggleModal}
                    >
                        <FiClock className={timeWork.icon}/>
                        <span className={timeWork.hoursText}>
                                {isBusinessOpen() ? 'Работаем' : 'Закрыто'}
                            </span>
                    </button>
                </div>
                {/*  Модальное окно  */}
                {isModalOpen && (
                    <div className={timeWork.modalOverlay} onClick={toggleModal}>
                        <div className={timeWork.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={timeWork.closeButton} onClick={toggleModal}>×</button>
                            <h2>График работы</h2>
                            <ul>
                                {workingHours.map(({day, hours}) => (
                                    <li key={day} className={hours === 'Выходной' ? timeWork.weekend : ''}>
                                            <span className={timeWork.day}>
                                                {day}
                                                {day === getCurrentDay() &&
                                                    <span className={timeWork.today}> (Сегодня)</span>}
                                            </span>
                                        <span className={timeWork.hours}>{hours}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;