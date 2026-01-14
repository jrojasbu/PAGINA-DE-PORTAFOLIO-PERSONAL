document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            follower.animate({
                left: e.clientX - 10 + 'px',
                top: e.clientY - 10 + 'px'
            }, { duration: 500, fill: "forwards" });
        });
    }

    // Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .experience-card, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Experience Slider Logic
    const slider = document.querySelector('.experience-slider');
    if (slider) {
        const slides = document.querySelectorAll('.experience-card');
        const prevBtn = document.querySelector('.prev-nav');
        const nextBtn = document.querySelector('.next-nav');
        const pagination = document.querySelector('.slider-pagination');
        let currentIndex = 0;

        // Create pagination dots
        if (pagination) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('pagination-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
                pagination.appendChild(dot);
            });
        }

        function updateSlider() {
            // Translate the slider track
            const slideWidth = slides[0].offsetWidth;
            const gap = 40; // matched css gap
            const offset = -(currentIndex * (slideWidth + gap));
            slider.style.transform = `translateX(${offset}px)`;

            // Update pagination dots
            if (pagination) {
                const dots = pagination.querySelectorAll('.pagination-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            // Smooth fade effects for focus
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                    slide.style.filter = 'blur(0px)';
                } else {
                    slide.style.opacity = '0.4';
                    slide.style.transform = 'scale(0.95)';
                    slide.style.filter = 'blur(2px)';
                }
            });

            // Update button states
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            nextBtn.style.opacity = currentIndex === slides.length - 1 ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex === slides.length - 1 ? 'not-allowed' : 'pointer';
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateSlider();
            } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50 && currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
            if (touchEndX > touchStartX + 50 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }

        // Initialize
        updateSlider();

        // Handle resize
        window.addEventListener('resize', updateSlider);
    }


    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- TRANSLATION LOGIC ---

    const translations = {
        es: {
            nav_home: "Inicio",
            nav_about: "Sobre Mí",
            nav_exp: "Experiencia",
            nav_skills: "Habilidades",
            nav_contact: "Contacto",
            hero_greeting: "Hola, soy",
            hero_title: "Analista de Datos | Data Analytics & Reporting | People Analytics",
            hero_desc: "Especialista en transformar datos en decisiones estratégicas. Experto en Power BI, SQL y automatización de procesos.",
            hero_btn_contact: "Contáctame",
            hero_btn_exp: "Ver Experiencia",
            about_title: "Sobre Mí",
            about_p1: "Profesional con más de 10 años de experiencia en analítica de datos, reporting y optimización de procesos. Mi enfoque se centra en la eficiencia y la automatización, utilizando herramientas como Power BI, SQL y Excel avanzado.",
            about_p2: "Poseo una sólida trayectoria en People Analytics y gestión de indicadores clave. Además, complemento mi perfil analítico con experiencia como trader independiente en mercados de capitales, lo que agudiza mi capacidad de análisis técnico y fundamental.",
            stat_exp_label: "Años de Experiencia",
            stat_opt_label: "Optimización en Tiempos",
            exp_title: "Trayectoria Profesional",

            exp_1_date: "Oct 2023 - Feb 2025",
            exp_1_role: "Analista de GH - HR - People Analytics",
            exp_1_desc: " · Análisis y seguimiento de métricas e indicadores de gestión humana: rotación, ausentismo, ANS de contratación, fidelización, incidentalidad y accidentalidad.<br><br> · Diseño, construcción y monitoreo de KPI para la toma de decisiones estratégicas en gestión de personal.<br><br> · Administración y explotación de datos desde la plataforma de Recursos Humanos (Heinshon), incluyendo cargue y baja masiva de empleados, creación de cargos y control del headcount.<br><br> · Gestión, mantenimiento y depuración de la base de datos de personal, garantizando calidad, consistencia y actualización continua.<br><br> · Generación de reportes analíticos semanales y mensuales para seguimiento operativo y gerencial.<br><br> · Modelado, transformación y visualización de datos utilizando Power BI, Excel, Power Pivot y Power Query.<br><br> · Implementación de procesos ETL para limpieza, estandarización y mejora de bases de datos de RRHH.<br><br> · Presentación y sustentación de indicadores y hallazgos ante alta dirección y stakeholders.<br><br><br>Logros<br><br> · Desarrollo y optimización de indicadores clave que permitieron identificar áreas críticas y oportunidades de mejora en la gestión del talento.<br><br> · Automatización de reportes mediante macros, aumentando la eficiencia y reduciendo errores en la generación de información.<br><br> · Mejora en los procesos de administración del headcount y altas/bajas de personal mediante optimización de la plataforma de RRHH.",

            exp_2_date: "Jun 2023 - Sep 2023",
            exp_2_role: "Analista de Reporting",
            exp_2_desc: " · Análisis de datos estratégicos para cliente corporativo del sector farmacéutico (AstraZeneca), abarcando múltiples líneas de negocio.<br><br> · Diseño, desarrollo y mantenimiento de dashboards en Power BI para seguimiento de desempeño comercial y operativo.<br><br> · Extracción, depuración y transformación de datos desde Salesforce para análisis y reportería.<br><br> · Limpieza, validación y estandarización de datos utilizando Excel y SQL para asegurar calidad y consistencia de la información.<br><br> · Automatización de procesos de reportería mediante macros y flujos en n8n, optimizando tiempos y reduciendo errores manuales.<br><br> · Generación de reportes analíticos y ejecutivos orientados a la toma de decisiones.<br><br> · Gestión de versiones y control de calidad de la información reportada a cliente.<br><br><br>Logros<br><br> · Reducción del 30 % en el tiempo de generación de reportes mediante automatización de procesos.<br><br> · Mejora significativa en la precisión, consistencia y confiabilidad de la información entregada al cliente corporativo.",

            exp_3_date: "Ene 2018 - Nov 2022",
            exp_3_role: "Analista de Tecnologia, Inventarios y Compras",
            exp_3_desc: " · Análisis, modelado y visualización de datos de inventarios y compras de tecnología mediante Power BI.<br><br> · Construcción y seguimiento de indicadores clave (KPI) asociados a inventarios, compras, préstamos y asignación de equipos.<br><br> · Administración, depuración y estandarización de bases de datos de inventario tecnológico.<br><br> · Gestión y análisis de bases de usuarios para control de accesos, asignaciones y trazabilidad de activos.<br><br> · Integración y análisis de información de proveedores, órdenes de compra y adquisiciones.<br><br> · Generación de informes analíticos para soporte a decisiones de compra, renovación y asignación de tecnología.<br><br> · Documentación y estandarización de procesos basada en datos y métricas operativas.<br><br> · Gestión de accesos a aplicativos corporativos como fuente de datos para control y auditoría.<br><br> · Análisis de uso y disponibilidad de salas de reuniones y recursos tecnológicos.<br><br> · Soporte analítico a procesos de aprobación y control presupuestal en adquisiciones.",

            exp_4_date: "Jun 2017 - Nov 2017",
            exp_4_role: "Asistente de Tecnologia",
            exp_4_desc: " · Análisis y gestión de datos operativos asociados a infraestructura TI y soporte a usuarios.<br><br> · Administración y explotación de bases de datos SQL de sistemas de contabilidad y nómina, realizando consultas, validaciones y modificaciones masivas de datos.<br><br> · Integración de fuentes de datos mediante conectividad ODBC para análisis y reporte.<br><br> · Generación de informes gerenciales mensuales a partir de datos consolidados de operación, soporte y sistemas administrativos.<br><br> · Gestión y análisis de inventarios de equipos e impresoras para control, trazabilidad y optimización de recursos.<br><br> · Documentación y estandarización de procesos basada en análisis de datos históricos y flujos operativos.<br><br> · Apoyo a la toma de decisiones mediante reportes estructurados y análisis en Excel.<br><br> · Uso avanzado de Excel para análisis de datos (tablas dinámicas, macros y automatización de reportes).<br><br> · Gestión de cuentas de usuario, roles y privilegios, garantizando integridad y consistencia de la información.<br><br> · Administración de entornos de servidores y servicios (impresión, recursos compartidos, Directorio Activo) con enfoque en disponibilidad y métricas operativas.<br><br> · Capacitación y gestión de proyectos bajo metodologías ITIL, orientando la operación a indicadores y mejora continua.<br><br> · Análisis de conectividad y disponibilidad de servicios como variables de desempeño del negocio.",

            exp_5_date: "Mar 2012 - Sep 2016",
            exp_5_role: "Coordinador MPS",
            exp_5_desc: " · Análisis y explotación de datos operativos provenientes de plataformas de impresión y mesa de ayuda para la toma de decisiones.<br><br> · Gestión y análisis de información mediante herramientas de tracking y monitoreo (Markvision, Pharos, NDD, ViewPrint, ViewTrack), integrando datos en SQL y herramientas ofimáticas.<br><br> · Construcción y seguimiento de indicadores clave (KPI) y ANS para evaluar desempeño del servicio, productividad y cumplimiento contractual.<br><br> · Análisis de tickets (incidentes y requerimientos) para identificar patrones, cuellos de botella y oportunidades de mejora.<br><br> · Elaboración de informes ejecutivos y dashboards para seguimiento de operación, costos y niveles de servicio.<br><br> · Gestión, depuración y validación de datos para informes de facturación, control de fechas de corte y pagos.<br><br> · Análisis de inventarios de equipos e impresoras para optimización de recursos y reducción de costos.<br><br> · Optimización del uso de recursos de impresión mediante análisis de consumo y adopción de medios digitales.<br><br> · Documentación y estandarización de procesos basada en datos históricos y métricas de desempeño.<br><br> · Gestión de planes de mejora continua soportados en análisis cuantitativo.<br><br> · Administración de proyectos de impresión y mesa de ayuda con enfoque en métricas, indicadores y resultados.<br><br> · Uso avanzado de Excel para análisis de datos (tablas dinámicas, reportes automatizados, macros).<br><br> · Coordinación y liderazgo de equipos de trabajo, orientando la gestión a resultados medibles.",

            exp_6_date: "Ago 2009 - Mar 2012",
            exp_6_role: "Admin Mesa de Ayuda",
            exp_6_desc: " · Análisis y explotación de datos operativos de plataformas de impresión para control de consumo, disponibilidad y desempeño del servicio.<br><br> · Gestión y análisis de información proveniente de aplicativos de tracking (MarkVision, Pharos, NDD, ViewPrint, ViewTrack), integrando datos con SQL y herramientas ofimáticas.<br><br> · Construcción, seguimiento y análisis de indicadores de desempeño (KPI) y acuerdos de nivel de servicio (ANS)<br><br> · Análisis de tickets de HelpDesk para identificar tendencias, causas raíz y oportunidades de mejora operativa.<br><br> · Generación de informes y reportes de desempeño para soporte a la toma de decisiones.<br><br> · Gestión y análisis de inventarios de equipos e impresoras para optimización de recursos y reducción de costos.<br><br> · Automatización de reportes y análisis en Excel mediante tablas dinámicas y macros.<br><br> · Soporte remoto y multicanal como fuente de datos para medición de tiempos de atención, resolución y calidad del servicio.<br><br> · Participación en proyectos bajo metodologías ITIL, con enfoque en métricas, control y mejora continua. Documentación de procesos y resultados basada en indicadores y datos históricos.",

            exp_7_date: "Ene 2020 - Actualidad",
            exp_7_role: "Trader Autónomo",
            exp_7_desc: "· Análisis de datos financieros de mercados bursátiles globales (S&P 500, Nasdaq, DAX, AUS200, UK100) y acciones del mercado estadounidense.<br><br> · Aplicación de análisis técnico y fundamental como marcos analíticos para la toma de decisiones basadas en datos.<br><br> · Construcción y evaluación de métricas financieras para identificar tendencias, volatilidad, riesgo y oportunidades.<br><br> · Desarrollo de estrategias de swing trading apoyadas en análisis cuantitativo y gestión disciplinada del riesgo.<br><br> · Elaboración de reportes analíticos de tendencias financieras y comportamiento de activos.<br><br> · Análisis comparativo de portafolios mediante indicadores de rendimiento, diversificación y sostenibilidad.<br><br> · Gestión y seguimiento de portafolio diversificado utilizando métricas financieras y análisis histórico de datos.<br><br> · Documentación de hallazgos y resultados para mejorar la toma de decisiones y el control del riesgo.",

            skills_title: "Certificaciones y Formación Complementaria",
            skill_bi_title: "Analítica de Datos y BI",
            skill_bi_desc: "People Analytics · Power BI · Tableau · Google Data Studio · Visualización de Datos · Métricas y Dashboards para Startups",
            skill_data_title: "Bases de Datos y Programación",
            skill_data_desc: "PostgreSQL para Ciencia de Datos · SQL · Fundamentos de R y Python · ETL con Python y Pentaho (básico) · Git/GitHub",
            skill_excel_title: "Excel y Herramientas Avanzadas",
            skill_excel_desc: "Excel Avanzado (Macros, Análisis de Datos) · Análisis Financiero en Excel",
            skill_cloud_title: "Cloud y Desarrollo",
            skill_cloud_desc: "Introducción a Azure · Configuración de entornos (Windows, Linux, macOS) · Terminal y Línea de Comandos · Frontend y WordPress",
            skill_erp_title: "ERP y Sistemas de Gestión",
            skill_erp_desc: "Fundamentos de SAP (Core Consultores) · SIIGO (Informática y Gestión)",
            skill_ds_title: "Data Science & Ética",
            skill_ds_desc: "Ética y Manejo de Datos en IA · Prompt Engineering con ChatGPT · Carrera en Data Science e Inteligencia Artificial",
            skill_bus_title: "Negocios y Finanzas",
            skill_bus_desc: "Análisis de Negocios · Retención para Startups · Inversión en Bolsa · Trading",
            contact_title: "Contacto",
            footer_rights: "&copy; 2026 Hiraida Castellano. Todos los derechos reservados."
        },
        en: {
            nav_home: "Home",
            nav_about: "About Me",
            nav_exp: "Experience",
            nav_skills: "Skills",
            nav_contact: "Contact",
            hero_greeting: "Hello, I am",
            hero_title: "Data Analyst | Data Analytics & Reporting | People Analytics",
            hero_desc: "Specialist in transforming data into strategic decisions. Expert in Power BI, SQL, and process automation.",
            hero_btn_contact: "Contact Me",
            hero_btn_exp: "View Experience",
            about_title: "About Me",
            about_p1: "Professional with over 10 years of experience in data analytics, reporting, and process optimization. My focus is on efficiency and automation, using tools such as Power BI, SQL, and advanced Excel.",
            about_p2: "I have a solid background in People Analytics and key performance indicator management. Additionally, I complement my analytical profile with experience as an independent trader in capital markets, which sharpens my technical and fundamental analysis skills.",
            stat_exp_label: "Years of Experience",
            stat_opt_label: "Time Optimization",
            exp_title: "Professional Trajectory",

            exp_1_date: "Oct 2023 - Feb 2025",
            exp_1_role: "HR Analyst - People Analytics",
            exp_1_desc: " · Analysis and tracking of human management metrics and indicators: turnover, absenteeism, hiring SLAs, retention, incident and accident rates.<br><br> · Design, construction, and monitoring of KPIs for strategic decision-making in personnel management.<br><br> · Administration and data exploitation from the HR platform (Heinshon), including mass uploads/downs of employees, position creation, and headcount control.<br><br> · Management, maintenance, and cleaning of the personnel database, ensuring quality, consistency, and continuous updates.<br><br> · Generation of weekly and monthly analytical reports for operational and managerial tracking.<br><br> · Data modeling, transformation, and visualization using Power BI, Excel, Power Pivot, and Power Query.<br><br> · Implementation of ETL processes for cleaning, standardization, and improvement of HR databases.<br><br> · Presentation and defense of indicators and findings to senior management and stakeholders.<br><br><br>Achievements<br><br> · Development and optimization of key indicators that allowed identifying critical areas and improvement opportunities in talent management.<br><br> · Automation of reports using macros, increasing efficiency and reducing errors in information generation.<br><br> · Improvement in headcount administration and personnel onboarding/offboarding processes through HR platform optimization.",

            exp_2_date: "Jun 2023 - Sep 2023",
            exp_2_role: "Reporting Analyst",
            exp_2_desc: " · Strategic data analysis for a corporate client in the pharmaceutical sector (AstraZeneca), covering multiple business lines.<br><br> · Design, development, and maintenance of Power BI dashboards for tracking commercial and operational performance.<br><br> · Extraction, cleaning, and transformation of data from Salesforce for analysis and reporting.<br><br> · Cleaning, validation, and standardization of data using Excel and SQL to ensure information quality and consistency.<br><br> · Automation of reporting processes using macros and n8n flows, optimizing times and reducing manual errors.<br><br> · Generation of analytical and executive reports oriented towards decision-making.<br><br> · Version management and quality control of information reported to the client.<br><br><br>Achievements<br><br> · 30% reduction in report generation time through process automation.<br><br> · Significant improvement in accuracy, consistency, and reliability of information delivered to the corporate client.",

            exp_3_date: "Jan 2018 - Nov 2022",
            exp_3_role: "Technology, Inventory & Purchasing Analyst",
            exp_3_desc: " · Analysis, modeling, and visualization of technology inventory and purchasing data using Power BI.<br><br> · Construction and tracking of key performance indicators (KPIs) associated with inventories, purchases, loans, and equipment assignment.<br><br> · Administration, cleaning, and standardization of technology inventory databases.<br><br> · Management and analysis of user databases for access control, assignments, and asset traceability.<br><br> · Integration and analysis of supplier information, purchase orders, and acquisitions.<br><br> · Generation of analytical reports to support decisions on technology purchasing, renewal, and assignment.<br><br> · Documentation and standardization of processes based on data and operational metrics.<br><br> · Management of access to corporate applications as a data source for control and auditing.<br><br> · Analysis of meeting room usage and availability of technological resources.<br><br> · Analytical support for approval processes and budget control in acquisitions.",

            exp_4_date: "Jun 2017 - Nov 2017",
            exp_4_role: "Technology Assistant",
            exp_4_desc: " · Analysis and management of operational data associated with IT infrastructure and user support.<br><br> · Administration and exploitation of SQL databases for accounting and payroll systems, performing queries, validations, and mass data modifications.<br><br> · Integration of data sources via ODBC connectivity for analysis and reporting.<br><br> · Generation of monthly management reports from consolidated operation, support, and administrative system data.<br><br> · Management and analysis of equipment and printer inventories for control, traceability, and resource optimization.<br><br> · Documentation and standardization of processes based on historical data analysis and operational flows.<br><br> · Support for decision-making through structured reports and Excel analysis.<br><br> · Advanced use of Excel for data analysis (pivot tables, macros, and report automation).<br><br> · Management of user accounts, roles, and privileges, ensuring information integrity and consistency.<br><br> · Administration of server environments and services (printing, shared resources, Active Directory) focusing on availability and operational metrics.<br><br> · Training and project management under ITIL methodologies, orienting operations towards indicators and continuous improvement.<br><br> · Analysis of connectivity and service availability as business performance variables.",

            exp_5_date: "Mar 2012 - Sep 2016",
            exp_5_role: "MPS Coordinator",
            exp_5_desc: " · Analysis and exploitation of operational data from printing platforms and help desk for decision-making.<br><br> · Management and analysis of information using tracking and monitoring tools (Markvision, Pharos, NDD, ViewPrint, ViewTrack), integrating data in SQL and office tools.<br><br> · Construction and tracking of key performance indicators (KPIs) and SLAs to evaluate service performance, productivity, and contractual compliance.<br><br> · Analysis of tickets (incidents and requirements) to identify patterns, bottlenecks, and improvement opportunities.<br><br> · Preparation of executive reports and dashboards for tracking operations, costs, and service levels.<br><br> · Management, cleaning, and validation of data for billing reports, control of cut-off dates, and payments.<br><br> · Analysis of equipment and printer inventories for resource optimization and cost reduction.<br><br> · Optimization of print resource usage through consumption analysis and adoption of digital media.<br><br> · Documentation and standardization of processes based on historical data and performance metrics.<br><br> · Management of continuous improvement plans supported by quantitative analysis.<br><br> · Administration of printing and help desk projects focusing on metrics, indicators, and results.<br><br> · Advanced use of Excel for data analysis (pivot tables, automated reports, macros).<br><br> · Coordination and leadership of work teams, orienting management towards measurable results.",

            exp_6_date: "Aug 2009 - Mar 2012",
            exp_6_role: "Help Desk Admin",
            exp_6_desc: " · Analysis and exploitation of operational data from printing platforms for control of consumption, availability, and service performance.<br><br> · Management and analysis of information from tracking applications (MarkVision, Pharos, NDD, ViewPrint, ViewTrack), integrating data with SQL and office tools.<br><br> · Construction, tracking, and analysis of performance indicators (KPIs) and service level agreements (SLAs).<br><br> · HelpDesk ticket analysis to identify trends, root causes, and operational improvement opportunities.<br><br> · Generation of reports and performance reports to support decision-making.<br><br> · Management and analysis of equipment and printer inventories for resource optimization and cost reduction.<br><br> · Automation of reports and analysis in Excel using pivot tables and macros.<br><br> · Remote and multi-channel support as a data source for measuring response times, resolution, and service quality.<br><br> · Participation in projects under ITIL methodologies, focusing on metrics, control, and continuous improvement. Documentation of processes and results based on indicators and historical data.",

            exp_7_date: "Jan 2020 - Present",
            exp_7_role: "Freelance Trader",
            exp_7_desc: " · Analysis of financial data from global stock markets (S&P 500, Nasdaq, DAX, AUS200, UK100) and US market stocks.<br><br> · Application of technical and fundamental analysis as analytical frameworks for data-driven decision-making.<br><br> · Construction and evaluation of financial metrics to identify trends, volatility, risk, and opportunities.<br><br> · Development of swing trading strategies supported by quantitative analysis and disciplined risk management.<br><br> · Preparation of analytical reports on financial trends and asset behavior.<br><br> · Comparative analysis of portfolios using performance, diversification, and sustainability indicators.<br><br> · Management and tracking of a diversified portfolio using financial metrics and historical data analysis.<br><br> · Documentation of findings and results to improve decision-making and risk control.",

            skills_title: "Certifications and Complementary Training",
            skill_bi_title: "Data Analytics & BI",
            skill_bi_desc: "People Analytics · Power BI · Tableau · Google Data Studio · Data Visualization · Metrics and Dashboards for Startups",
            skill_data_title: "Databases & Programming",
            skill_data_desc: "PostgreSQL for Data Science · SQL · R and Python Fundamentals · ETL with Python and Pentaho (basic) · Git/GitHub",
            skill_excel_title: "Excel & Advanced Tools",
            skill_excel_desc: "Advanced Excel (Macros, Data Analysis) · Financial Analysis in Excel",
            skill_cloud_title: "Cloud & Development",
            skill_cloud_desc: "Introduction to Azure · Environment Configuration (Windows, Linux, macOS) · Terminal and Command Line · Frontend and WordPress",
            skill_erp_title: "ERP & Management Systems",
            skill_erp_desc: "SAP Fundamentals (Core Consultores) · SIIGO (Management Softwure)",
            skill_ds_title: "Data Science & Ethics",
            skill_ds_desc: "Ethics and Data Handling in AI · Prompt Engineering with ChatGPT · Career in Data Science and Artificial Intelligence",
            skill_bus_title: "Business & Finance",
            skill_bus_desc: "Business Analysis · Retention for Startups · Stock Market Investment · Trading",
            contact_title: "Contact",
            footer_rights: "&copy; 2026 Hiraida Castellano. All rights reserved."
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'es';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        if (langToggle) {
            langToggle.textContent = lang === 'es' ? 'EN' : 'ES'; // Switch button label to "target" language
        }

        // Update document lang attribute
        document.documentElement.lang = lang;
    }
});
