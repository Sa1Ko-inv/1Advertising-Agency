import React, {useEffect, useRef, useState} from 'react';
import styles from "./catalog.module.scss";

const Catalog = () => {
    const catalogRef = useRef(null);
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

        if (catalogRef.current) {
            observer.observe(catalogRef.current);
        }

        return () => observer.disconnect();
    }, []);
    
    return (
        <section
            id="catalog"
            ref={catalogRef}
            className={`${styles.catalog} ${visible ? styles.visible : ''}`}
            style={{ paddingTop: padding, paddingBottom: padding }}
        >
            <div className={styles.container}>
                <h2 className={styles['catalog-title']}>Каталог</h2>

            </div>
        </section>
    );
};

export default Catalog;