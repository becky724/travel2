const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

const app = createApp({
    setup() {
        // Navigation State
        const currentPage = ref('home');
        const mobileMenuOpen = ref(false);

        // Navigation Items
        const navItems = [
            { id: 'home', name: '首页' },
            { id: 'topics', name: '核心议题' },
            { id: 'cases', name: '案例库' },
            { id: 'data', name: '学术数据' },
            { id: 'references', name: '参考资料' },
            { id: 'about', name: '关于' }
        ];

        // Case Study Categories with Icons
        const caseCategories = [
            { id: 'all', name: '全部案例', icon: '🌟' },
            { id: '演艺景区', name: '演艺景区', icon: '�' },
            { id: '文化景区', name: '文化景区', icon: '�️' },
            { id: '互动景区', name: '互动景区', icon: '⚔️' }
        ];

        const selectedCategory = ref('all');

        // Case Studies Data with Real Images from Unsplash - Henan Immersive Tourism Cases
        const caseStudies = [
            {
                category: '演艺景区',
                categoryIcon: '🎭',
                icon: '🏛️',
                title: '只有河南・戏剧幻城',
                year: '2021',
                image: 'images/case1-zhiyouhenan.jpg',
                summary: '物理空间：21个剧场、行进式观演、光影舞台、夯土墙场景；社会空间：中原文化、黄河文明、1942饥荒历史叙事；体验空间：感官震撼→情感共情→思维反思。',
                insight: '该案例展示了空间生产理论在旅游演艺中的典型应用，通过物理空间、社会空间与体验空间的有机融合，实现了从感官到思维的完整沉浸体验链条。',
                source: '知网《空间生产视域下旅游演艺空间的建构与差异》、《旅游演艺沉浸体验的影响因素与形成机制》'
            },
            {
                category: '文化景区',
                categoryIcon: '🏛️',
                icon: '🌸',
                title: '开封清明上河园',
                year: '1998',
                image: 'images/case2-qingming.jpg',
                summary: '物理空间：宋代实景建筑、实景演出、NPC互动装置；社会空间：宋文化、民俗市井、宋词文脉；体验空间：场景代入→文化认同→社交传播。',
                insight: '清明上河园通过场景还原与文化符号的深度植入，成功实现了游客的文化认同建构，成为宋代文化旅游的标杆性项目。',
                source: '河南省文旅厅官方案例、河南日报'
            },
            {
                category: '文化景区',
                categoryIcon: '🏛️',
                icon: '👘',
                title: '洛阳隋唐洛阳城',
                year: '2020',
                image: 'images/case3-suitang.jpg',
                summary: '物理空间：古建筑复原、夜间灯光秀、汉服场景；社会空间：盛唐文化、国潮符号、古都叙事；体验空间：视觉沉浸→情感共鸣→身份认同。',
                insight: '隋唐洛阳城以国潮文化为切入点，通过视觉冲击与身份认同的双重机制，成功吸引青年群体并形成持续的文化影响力。',
                source: '河南日报《穿越千年的城市脊梁》'
            },
            {
                category: '互动景区',
                categoryIcon: '⚔️',
                icon: '⚡',
                title: '开封万岁山武侠城',
                year: '2023',
                image: 'images/case4-wanyueshan.jpg',
                summary: '物理空间：武侠实景街区、全域互动、高密度NPC；社会空间：武侠文化、角色扮演、青年社群；体验空间：行为参与→情绪价值→社交分享。',
                insight: '万岁山武侠城通过高密度的行为参与设计与社交传播机制，创造了独特的情绪价值供给模式，成为青年群体"打卡"式消费的典型案例。',
                source: '知网、河南省文旅厅创新密码报道'
            }
        ];

        // Computed property for filtered cases
        const filteredCases = computed(() => {
            if (selectedCategory.value === 'all') {
                return caseStudies;
            }
            return caseStudies.filter(caseStudy => caseStudy.category === selectedCategory.value);
        });

        // References Data with Types - Immersive Tourism Academic Literature
        const references = [
            {
                title: '空间生产视域下旅游演艺空间的建构与差异——以《印象刘三姐》和《只有河南》为例',
                authors: '厉新建、霍蕙苓、宋昌耀',
                source: '旅游科学',
                year: '2025',
                type: '期刊论文',
                icon: '📄',
                link: '#li-2025-space-production'
            },
            {
                title: '旅游演艺沉浸体验的影响因素与形成机制——基于《只有河南・戏剧幻城》的扎根分析',
                authors: '李万莲、陈晓钱、王良举',
                source: '四川师范大学学报(社会科学版)',
                year: '2023',
                type: '期刊论文',
                icon: '📝',
                link: '#li-2023-immersive-mechanism'
            },
            {
                title: '新型沉浸式互动体验、国家认同与青年出游意愿——以"红色剧本杀"为例',
                authors: '王强、许丁夫、杨庆媛',
                source: '西南大学学报(社会科学版)',
                year: '2026',
                type: '期刊论文',
                icon: '�',
                link: '#wang-2026-youth-intention'
            },
            {
                title: '数字沉浸式场景下城市青年文旅消费的行为表征与情感体验',
                authors: '常天恺',
                source: '中国青年研究',
                year: '2025',
                type: '期刊论文',
                icon: '📄',
                link: '#chang-2025-digital-immersive'
            },
            {
                title: '沉浸式旅游场景中游客多元互动的测度与影响路径研究',
                authors: '吴昕阳、张新成、高楠等',
                source: '地理科学',
                year: '2025',
                type: '期刊论文',
                icon: '📝',
                link: '#wu-2025-interaction-path'
            },
            {
                title: '沉浸式旅游的转化机制研究',
                authors: '金准',
                source: '财经智库',
                year: '2025',
                type: '期刊论文',
                icon: '�',
                link: '#jin-2025-transformation'
            },
            {
                title: '沉浸式旅游"圈粉"年轻人的内在逻辑',
                authors: '孙九霞',
                source: '人民论坛',
                year: '2025',
                type: '学术文章',
                icon: '📖',
                link: '#sun-2025-youth-logic'
            },
            {
                title: '沉浸式文化旅游空间形成要素及路径研究——基于价值共创理论与扎根理论分析',
                authors: '马聪玲等',
                source: '重庆社会科学',
                year: '2025',
                type: '期刊论文',
                icon: '📄',
                link: '#ma-2025-space-elements'
            },
            {
                title: '沉浸其中就可以了吗？沉浸体验和意义体验对旅游演艺游客满意度影响研究',
                authors: '施思等',
                source: '旅游学刊',
                year: '2021',
                type: '期刊论文',
                icon: '�',
                link: '#shi-2021-satisfaction'
            },
            {
                title: '河南文旅频出圈，背后藏着怎样的"创新密码"?',
                authors: '河南省文化和旅游厅',
                source: '官方报告',
                year: '2025',
                type: '政府报告',
                icon: '🏛️',
                link: '#henan-2025-innovation'
            },
            {
                title: '穿越千年的城市脊梁',
                authors: '河南日报',
                source: '报纸报道',
                year: '2025',
                type: '媒体报道',
                icon: '📰',
                link: '#henan-2025-city-spine'
            },
            {
                title: '"十五五"主题公园高质量发展路径探析',
                authors: '人民论坛',
                source: '学术期刊',
                year: '2026',
                type: '期刊论文',
                icon: '📄',
                link: '#people-2026-theme-park'
            },
            {
                title: '以游客为中心优化服务质量评价体系',
                authors: '中国旅游新闻网',
                source: '网络媒体',
                year: '2024',
                type: '媒体报道',
                icon: '🌐',
                link: '#ctn-2024-service-quality'
            }
        ];

        // Chart initialization function with Spring Art Palette Colors
        const initCharts = () => {
            nextTick(() => {
                if (currentPage.value !== 'data') return;

                // Destroy existing charts if they exist
                if (window.consumptionChartInstance) {
                    window.consumptionChartInstance.destroy();
                }
                if (window.durationChartInstance) {
                    window.durationChartInstance.destroy();
                }

                // Chart 1: Youth Immersive Tourism Preference - Spring Palette
                const consumptionCtx = document.getElementById('consumptionChart');
                if (consumptionCtx) {
                    window.consumptionChartInstance = new Chart(consumptionCtx, {
                        type: 'bar',
                        data: {
                            labels: ['青年偏好沉浸式慢游', '沉浸演艺35岁以下', 'Z世代愿跨城出行'],
                            datasets: [{
                                label: '占比 (%)',
                                data: [55.3, 85, 90],
                                backgroundColor: [
                                    'rgba(254, 213, 214, 0.85)',  // pink-light #fed5d6
                                    'rgba(204, 232, 146, 0.85)',   // primary #cce892
                                    'rgba(170, 203, 116, 0.85)'    // accent #aacb74
                                ],
                                borderColor: [
                                    'rgba(245, 192, 193, 1)',     // pink-dark #f5c0c1
                                    'rgba(170, 203, 116, 1)',     // accent #aacb74
                                    'rgba(150, 181, 96, 1)'       // accent-dark
                                ],
                                borderWidth: 2,
                                borderRadius: 10,
                                borderSkipped: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(170, 203, 116, 0.95)',  // accent color
                                    titleColor: '#ffffff',
                                    bodyColor: '#ffffff',
                                    padding: 14,
                                    displayColors: false,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: function(context) {
                                            return `占比: ${context.parsed.y}%`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 13, weight: '500' },
                                        callback: function(value) {
                                            return value + '%';
                                        }
                                    },
                                    grid: {
                                        color: 'rgba(204, 232, 146, 0.2)',  // primary light
                                        drawBorder: false
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 12, weight: 'bold' },
                                        maxRotation: 15
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart'
                            }
                        }
                    });
                }

                // Chart 2: Immersive Experience Impact - Spring Gradient
                const durationCtx = document.getElementById('durationChart');
                if (durationCtx) {
                    window.durationChartInstance = new Chart(durationCtx, {
                        type: 'bar',
                        data: {
                            labels: ['重游率提升', '主动推荐率', '文化认同度提升'],
                            datasets: [{
                                label: '影响效应 (%)',
                                data: [42.5, 78, 42],
                                backgroundColor: function(context) {
                                    const chart = context.chart;
                                    const {ctx, chartArea} = chart;
                                    if (!chartArea) return null;
                                    
                                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                    gradient.addColorStop(0, 'rgba(204, 232, 146, 0.7)');      // primary
                                    gradient.addColorStop(0.5, 'rgba(254, 213, 214, 0.8)');   // pink-light
                                    gradient.addColorStop(1, 'rgba(170, 203, 116, 0.9)');     // accent
                                    return gradient;
                                },
                                borderColor: 'rgba(170, 203, 116, 1)',  // accent
                                borderWidth: 2,
                                borderRadius: 10,
                                borderSkipped: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(45, 55, 72, 0.95)',  // warm-heading
                                    titleColor: '#ffffff',
                                    bodyColor: '#ffffff',
                                    padding: 14,
                                    displayColors: false,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: function(context) {
                                            return `提升: +${context.parsed.y}%`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100,
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 13, weight: '500' },
                                        stepSize: 20
                                    },
                                    grid: {
                                        color: 'rgba(254, 213, 214, 0.2)',  // pink-light
                                        drawBorder: false
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 13 }
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart',
                                delay: function(context) {
                                    return context.dataIndex * 200;
                                }
                            }
                        }
                    });
                }
            });
        };

        // Watch for page changes to initialize charts when on data page
        watch(currentPage, (newPage) => {
            if (newPage === 'data') {
                setTimeout(initCharts, 150);
            }
            
            // Smooth scroll to top on page change
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });

        // Lifecycle hook
        onMounted(() => {
            // Initialize charts if starting on data page
            if (currentPage.value === 'data') {
                setTimeout(initCharts, 100);
            }

            // Add intersection observer for fade-in animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all cards after DOM is ready
            nextTick(() => {
                document.querySelectorAll('.topic-item-elegant, .case-card-elegant, .featured-card-elegant, .stat-card-elegant, .reference-card-elegant').forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            });
        });

        return {
            currentPage,
            mobileMenuOpen,
            navItems,
            caseCategories,
            selectedCategory,
            filteredCases,
            references,
            caseStudies
        };
    }
});

// Mount the Vue application
app.mount('#app');