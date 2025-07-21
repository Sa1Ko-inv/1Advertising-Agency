import { useEffect, useRef, useState } from 'react';
import styles from './about.module.scss';

const About = () => {
    const aboutRef = useRef(null);
    const [padding, setPadding] = useState('47px');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const navbar = document.querySelector('.navbar-wrapper');
        if (navbar) {
            setPadding(`${navbar.offsetHeight + 30}px`);
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            title: "Брендинг",
            items: [
                "Разработка логотипа и фирменного стиля",
                "Изготовление этикеток",
                "Сувенирная продукция: кружки, ручки, ежедневники, футболки, скотч",
                "Изготовление пакетов с вашей рекламой"
            ]
        },
        {
            title: "Рекламные кампании",
            items: [
                "Direct mail – целевая почтовая рассылка",
                "Расклейка рекламных материалов",
                "Промо-акции: распространение материалов, дегустации",
                "Sales Promotion – программы продвижения товаров и услуг"
            ]
        },
        {
            title: "Полиграфия и наружная реклама",
            items: [
                "Полиграфическая продукция: каталоги, листовки, буклеты, календари",
                "Наружная и интерьерная реклама:",
                "• Баннеры, перетяжки, плакаты",
                "• Офисные таблички, вывески",
                "• Объёмные буквы"
            ]
        },
        {
            title: "Мероприятия",
            items: [
                "Организация мероприятий, презентаций, вечеринок",
                "Приглашение звёзд на мероприятия"
            ]
        }
    ];

    return (
        <section
            id="about"
            ref={aboutRef}
            className={`${styles.about} ${visible ? styles.visible : ''}`}
            style={{ paddingTop: padding, paddingBottom: padding }}
        >
            <div className={styles.container}>
                <h2 className={styles['about-title']}>Наши услуги</h2>
                <div className={styles['services-grid']}>
                    {services.map((service, index) => (
                        <div key={index} className={styles['service-card']}>
                            <h3 className={styles['service-card-title']}>{service.title}</h3>
                            <ul className={styles['service-list']}>
                                {service.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;