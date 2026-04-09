export type Language = 'en' | 'ar';

export const translations: Record<Language, any> = {
    en: {
        dir: 'ltr',
        nav: {
            features: 'Features',
            howItWorks: 'How it Works',
            pricing: 'Pricing',
            dashboard: 'Dashboard',
            schedule: 'Schedule',
            patients: 'Patients',
            getStarted: 'Get Started',
            login: 'Login',
            home: 'Home',
            settings: 'Settings'
        },
        settings: {
            title: "Settings",
            profile: "Profile",
            appearance: "Appearance",
            security: "Security",
            subscription: "Subscription",
            notifications: "Notifications",
            system: "System",
            save: "Save Changes",
            success: "Settings saved successfully",
            logout: "Log out",
            themeMode: "Theme Mode",
            themeDesc: "Switch between light and dark mode",
            switchToLight: "Switch to Light Mode",
            switchToDark: "Switch to Dark Mode",
            saveTheme: "Remember theme preference",
            saveThemeDesc: "Automatically save your theme choice",
            currentPlan: "Current Plan",
            renewsOn: "Renews on",
            upgradePlan: "Upgrade Plan",
            paymentHistory: "Payment History",
            managePayments: "Manage Payment Methods",
            whatsappNotifications: "WhatsApp Notifications",
            whatsappDesc: "Receive appointment alerts on WhatsApp",
            reminders: "Appointment Reminders",
            remindersDesc: "Send automatic reminders to patients",
            systemAlerts: "System Alerts",
            systemAlertsDesc: "Receive important system updates",
            changePassword: "Change Password",
            lastChanged: "Last changed",
            twoFactor: "Two-Factor Authentication",
            twoFactorDesc: "Extra security for your account",
            dangerZone: "Danger Zone",
            deleteDesc: "Deleting your account will permanently remove all data.",
            deleteAccount: "Delete Account",
            language: "Language",
            timeZone: "Time Zone",
            dateFormat: "Date Format",
            timeFormat: "Time Format",
            twelveHour: "12-hour",
            twentyFourHour: "24-hour"
        },
        hero: {
            badge: 'New AI Assistant',
            title: 'AI-Powered Assistant',
            titleAccent: 'for Clinic Management',
            description: 'Handles appointment booking, patient communication, schedule organization, and automated reminders — all on autopilot, 24/7.',
            getStarted: 'Start Free Trial',
            viewDemo: 'Watch Demo',
            benefits: ['14-day free trial', 'No credit card required', 'Setup in minutes']
        },
        landing: {
            features: {
                badge: 'Features',
                description: 'Everything you need to run your modern clinic seamlessly.',
                dashboard: 'AI Dashboard',
                dashboardDesc: 'Centralized view of all clinic activities and AI operations.',
                schedule: 'Smart Scheduling',
                scheduleDesc: 'Automated booking and smart conflict resolution.',
                patients: 'Patient Management',
                patientsDesc: 'Comprehensive patient history and records management.',
                settings: 'Integrations',
                settingsDesc: 'Connect with existing tools easily.'
            },
            multiClinic: {
                title: 'Built for scale',
                description: 'Whether you run a single clinic or a large hospital chain, we have you covered.',
                singleDoctor: 'Single Practice',
                singleDoctorDesc: 'Perfect for independent physicians.',
                multiDoctor: 'Multi-Branch',
                multiDoctorDesc: 'Centralize operations across locations.',
                centralized: 'Centralized Control',
                benefit1: 'Unified Analytics',
                benefit2: 'Role-based access',
                benefit3: 'Enterprise Security',
                benefit4: '24/7 Support'
            },
            howItWorks: {
                title: 'How It Works',
                description: 'A simple process to transform your clinic.',
                steps: [
                    { title: 'Sign Up', desc: 'Create your account in minutes.' },
                    { title: 'Configure', desc: 'Set up your schedule preferences.' },
                    { title: 'Connect', desc: 'Link WhatsApp and your existing tools.' },
                    { title: 'Automate', desc: 'Let AI handle your bookings.' }
                ]
            },
            testimonials: {
                title: 'What Doctors Say',
                items: [
                    { text: "It transformed our operations.", name: "Dr. Smith", role: "Cardiologist" },
                    { text: "A life saver for our reception team.", name: "Sarah J.", role: "Clinic Manager" },
                    { text: "The AI booking is incredibly accurate.", name: "Dr. Ahmed", role: "Dentist" }
                ]
            },
            pricing: {
                title: 'Simple Pricing',
                description: 'Scalable plans tailored to your clinic size and needs.',
                mostPopular: 'Most Popular',
                perMonth: '/month',
                getStarted: 'Start Free Trial',
                choosePlan: 'Choose Plan',
                contactSales: 'Contact Sales',
                plans: [
                    {
                        name: 'Starter',
                        price: '$19',
                        features: [
                            '1 Doctor',
                            'Up to 300 appointments/mo',
                            'AI WhatsApp assistant (basic)',
                            'Automated reminders',
                            'Appointment dashboard',
                            'Email support'
                        ]
                    },
                    {
                        name: 'Pro',
                        price: '$49',
                        features: [
                            'Up to 5 Doctors',
                            'Unlimited appointments',
                            'Advanced AI scheduling',
                            'Smart calendar management',
                            'WhatsApp reminders',
                            'Patient management system',
                            'Analytics dashboard',
                            'Priority support'
                        ]
                    },
                    {
                        name: 'Enterprise',
                        price: 'Custom',
                        features: [
                            'Unlimited doctors',
                            'Multi-branch management',
                            'AI call assistant',
                            'Custom integrations (API)',
                            'Dedicated account manager',
                            'SLA support'
                        ]
                    }
                ]
            },
            cta: {
                title: 'Ready to start?',
                description: 'Join thousands of medical clinics already using CuraAI.',
                getStarted: 'Get Started Now',
                contactSales: 'Contact Sales'
            },
            footer: {
                tagline: 'The future of medical management.',
                product: 'Product',
                company: 'Company',
                about: 'About',
                contact: 'Contact',
                privacy: 'Privacy Policy',
                terms: 'Terms of Service',
                rights: 'All rights reserved.'
            }
        },
        register: {
            steps: {
                type: 'Clinic Type',
                info: 'Clinic Info',
                doctor: 'Doctors',
                account: 'Account'
            },
            upload: {
                title: 'Click to upload or drag and drop',
            },
            type: {
                title: 'Choose your setup',
                subtitle: 'Select the type of clinic you operate to tailor your experience.',
                single: {
                    title: 'Single Practice',
                    description: 'Perfect for independent physicians operating in a single location.'
                },
                multi: {
                    title: 'Multi-Branch',
                    description: 'Ideal for group practices or clinics with multiple locations and doctors.'
                }
            },
            info: {
                title: 'Clinic Information',
                subtitle: 'Tell us a bit about your clinic setup.',
                name: 'Clinic Name',
                specialty: 'Primary Specialty',
                address: 'Clinic Address',
                Country: 'Country',
                city: 'City',
                phone: 'Clinic Phone Number',
                website: 'Website (Optional)'
            },
            admin: {
                title: 'Set Up Credentials',
                description: 'Create secure access for your centralized dashboard.',
                infoBox: 'This account will become the Clinic Admin. The administrator can manage the clinic, view all appointments, and add or remove doctors.',
                fullName: 'Full Name',
                email: 'Contact Email',
                password: 'Password',
                confirmPassword: 'Confirm Password'
            },
            doctors: {
                title: 'Add Doctors',
                subtitle: 'Add doctors operating in your branches.',
                addDoctor: 'Add Another Doctor',
                name: 'Full Name',
                email: 'Email Address',
                specialty: 'Specialty',
                phone: 'Phone Number',
                skip: 'Skip for now'
            },
            nav: {
                back: 'Back',
                continue: 'Continue',
                registering: 'Registering...',
                register: 'Complete Registration'
            },
            trust: {
                title: 'Trusted & Secure',
                hipaa: {
                    title: 'HIPAA Compliant',
                    description: 'Your patient data is fully secure and encrypted according to global healthcare standards.'
                },
                encryption: {
                    title: 'End-to-End Encryption',
                    description: 'All communications, including WhatsApp AI bot messages, are fully encrypted.'
                },
                community: {
                    title: 'Verified Network',
                    description: 'Join thousands of verified medical professionals using out platform.'
                }
            },
            help: {
                title: 'Need help?',
                description: 'Our support team is available 24/7 to help you with the registration process.',
                contact: 'Contact Support'
            },
        },
        dashboard: {
            search: "Search appointments, patients...",
            newAppointment: "New Appointment",
            todayAppointments: "Today's Appointments",
            todayAppointmentsDesc: "You have 48 appointments scheduled for today",
            recentActivity: "Recent Activity",
            recentActivityDesc: "Latest updates across your clinic",
            doctorsOverview: "Doctors Overview",
            doctorsOverviewDesc: "Live status of your medical team",
            aptsToday: "apts today",
            addNewDoctor: "Add New Doctor",
            clinicCalendar: "Clinic Calendar",
            clinicCalendarDesc: "Weekly overview of all branches",
            recentPatients: "Recent Patients",
            recentPatientsDesc: "Latest registered or visited patients",
            viewAllPatients: "View All Patients",
            myPatients: "My Patients",
            myPatientsDesc: "Recent patients assigned to you",
            visitType: "Visit Type",
            startSession: "Start Session",
            addNote: "Add Note",
            weeklySchedule: "Weekly Schedule",
            weeklyScheduleDesc: "Your appointments for the week",
            statsLabels: {
                totalDoctors: "Total Doctors",
                totalPatients: "Total Patients",
                todayAppointments: "Today's Appointments",
                completedVisits: "Completed Visits",
                revenueToday: "Revenue Today",
                pendingAppointments: "Pending Appointments"
            },
            mock: {
                thisMonth: "This Month",
                fromLastMonth: "From last month",
                pending: "Pending",
                completionRate: "Completion rate",
                fromYesterday: "From yesterday",
                cardiology: "Cardiology",
                pediatrics: "Pediatrics",
                dermatology: "Dermatology",
                cardiologist: "Cardiologist",
                pediatrician: "Pediatrician",
                dermatologist: "Dermatologist",
                available: "Available",
                busy: "Busy",
                patientRegistered: "{name} registered as a new patient",
                appointmentCompleted: "Appointment completed for {name}",
                appointmentCancelled: "Appointment cancelled by {name}",
                hoursAgo: "{n} hours ago"
            },
            appointments: {
                statusConfirmed: "Confirmed",
                statusPending: "Pending",
                statusCancelled: "Cancelled",
                viewAll: "View All"
            },
            sidebar: {
                dashboard: "Dashboard",
                doctors: "Doctors",
                patients: "Patients",
                appointments: "Appointments",
                calendar: "Calendar",
                billing: "Billing",
                staff: "Staff Management",
                reports: "Reports",
                settings: "Settings",
                myAccount: "My Account",
                profile: "Profile",
                team: "Team",
                subscription: "Subscription",
                logout: "Logout"
            },
            table: {
                time: "TIME",
                patient: "PATIENT",
                doctor: "DOCTOR",
                department: "DEPARTMENT",
                status: "STATUS",
                patientName: "PATIENT NAME",
                phoneNumber: "PHONE NUMBER",
                lastVisit: "LAST VISIT",
                actions: "ACTIONS"
            },
            doctorsManagement: {
                title: "Doctors Management",
                description: "Manage your clinic's doctors, view their status and quick stats.",
                addDoctor: "Add Doctor",
                filter: "Filter",
                table: {
                    doctorName: "DOCTOR NAME",
                    specialty: "SPECIALTY",
                    patients: "PATIENTS",
                    appointments: "APPOINTMENTS",
                    status: "STATUS",
                    actions: "ACTIONS"
                },
                status: {
                    active: "Active",
                    inactive: "Inactive",
                    onLeave: "On Leave"
                }
            },
            patientsManagement: {
                title: "Patients Management",
                description: "View and manage your clinic's patient records and history.",
                searchPlaceholder: "Search by name or phone...",
                filterAll: "All",
                filterActive: "Active",
                filterInactive: "Inactive",
                table: {
                    name: "PATIENT NAME",
                    phone: "PHONE NUMBER",
                    visits: "VISITS",
                    lastVisit: "LAST VISIT",
                    status: "STATUS",
                    actions: "ACTIONS"
                },
                details: {
                    totalVisits: "Total Visits",
                    totalAppointments: "Total Appointments",
                    cancelledAppointments: "Cancelled",
                    tabs: {
                        appointments: "Appointments",
                        doctors: "Doctors",
                        notes: "Notes"
                    },
                    noNotes: "No notes available",
                    addNote: "Add Note",
                    notePlaceholder: "Write a new note for this patient...",
                    whatsappMessage: "Hello, this is CuraClinic reaching out regarding your health record."
                }
            }
        }
    },
    ar: {
        dir: 'rtl',
        nav: {
            features: 'المميزات',
            howItWorks: 'كيف يعمل',
            pricing: 'الأسعار',
            dashboard: 'لوحة التحكم',
            schedule: 'الجدول',
            patients: 'المرضى',
            getStarted: 'ابدأ الآن',
            login: 'دخول',
            home: 'الرئيسية',
            settings: 'الإعدادات'
        },
        settings: {
            title: "الإعدادات",
            profile: "الملف الشخصي",
            appearance: "المظهر",
            security: "الأمان",
            subscription: "الاشتراك",
            notifications: "الإشعارات",
            system: "النظام",
            save: "حفظ التغييرات",
            success: "تم حفظ الإعدادات بنجاح",
            logout: "تسجيل الخروج",
            themeMode: "وضع المظهر",
            themeDesc: "التبديل بين الوضع الفاتح والداكن",
            switchToLight: "الوضع الفاتح",
            switchToDark: "الوضع الداكن",
            saveTheme: "تذكر إعداد المظهر",
            saveThemeDesc: "حفظ اختيار المظهر تلقائياً",
            currentPlan: "الخطة الحالية",
            renewsOn: "تجدد في",
            upgradePlan: "ترقية الخطة",
            paymentHistory: "سجل المدفوعات",
            managePayments: "إدارة وسائل الدفع",
            whatsappNotifications: "إشعارات واتساب",
            whatsappDesc: "استقبال إشعارات المواعيد عبر واتساب",
            reminders: "تذكيرات المواعيد",
            remindersDesc: "إرسال تذكيرات تلقائية للمرضى",
            systemAlerts: "تنبيهات النظام",
            systemAlertsDesc: "استقبال تحديثات النظام المهمة",
            changePassword: "تغيير كلمة المرور",
            lastChanged: "آخر تغيير",
            twoFactor: "التحقق بخطوتين",
            twoFactorDesc: "حماية إضافية لحسابك",
            dangerZone: "منطقة الخطر",
            deleteDesc: "حذف الحساب سيؤدي إلى إزالة جميع البيانات نهائياً.",
            deleteAccount: "حذف الحساب",
            language: "اللغة",
            timeZone: "المنطقة الزمنية",
            dateFormat: "تنسيق التاريخ",
            timeFormat: "تنسيق الوقت",
            twelveHour: "12 ساعة",
            twentyFourHour: "24 ساعة"
        },
        hero: {
            badge: 'المساعد الذكي الجديد',
            title: 'مساعد ذكاء اصطناعي',
            titleAccent: 'لإدارة العيادات',
            description: 'يتولى حجز المواعيد، التواصل مع المرضى، تنظيم جدول العيادة، إرسال التذكيرات والتنبيهات — كل ذلك تلقائيًا وعلى مدار الساعة.',
            getStarted: 'ابدأ التجربة المجانية',
            viewDemo: 'مشاهدة العرض',
            benefits: ['تجربة مجانية 14 يوم', 'لا يتطلب بطاقة ائتمان', 'إعداد خلال دقائق']
        },
        landing: {
            features: {
                badge: 'المميزات',
                description: 'كل ما تحتاجه لإدارة عيادتك الحديثة بسلاسة.',
                dashboard: 'لوحة تحكم ذكية',
                dashboardDesc: 'عرض مركزي لجميع الأنشطة وعمليات الذكاء الاصطناعي.',
                schedule: 'جدولة ذكية',
                scheduleDesc: 'حجز تلقائي وحل ذكي للتعارضات.',
                patients: 'إدارة المرضى',
                patientsDesc: 'سجلات تاريخية شاملة للمرضى.',
                settings: 'التكامل',
                settingsDesc: 'ربط سهل مع أدواتك الحالية.'
            },
            multiClinic: {
                title: 'مصمم للتوسع',
                description: 'سواء كنت تدير عيادة واحدة أو مجموعة مستشفيات..',
                singleDoctor: 'عيادة مفردة',
                singleDoctorDesc: 'مثالي للأطباء المستقلين.',
                multiDoctor: 'فروع متعددة',
                multiDoctorDesc: 'إدارة مركزية لجميع الفروع.',
                centralized: 'تحكم مركزي',
                benefit1: 'تحليلات موحدة',
                benefit2: 'صلاحيات مخصصة',
                benefit3: 'أمان عالي',
                benefit4: 'دعم على مدار الساعة'
            },
            howItWorks: {
                title: 'كيف يعمل النظام',
                description: 'خطوات بسيطة لتحويل عيادتك.',
                steps: [
                    { title: 'التسجيل', desc: 'أنشئ حسابك في دقائق.' },
                    { title: 'الإعداد', desc: 'اضبط تفضيلات جدولك.' },
                    { title: 'الربط', desc: 'اربط واتساب وأدواتك.' },
                    { title: 'الأتمتة', desc: 'دع الذكاء الاصطناعي يدير حجوزاتك.' }
                ]
            },
            testimonials: {
                title: 'آراء الأطباء',
                items: [
                    { text: "غير عملياتنا بالكامل.", name: "د. سميث", role: "طبيب قلب" },
                    { text: "منقذ لفريق الاستقبال لدينا.", name: "سارة.", role: "مديرة عيادة" },
                    { text: "حجوزات دقيقة للغاية.", name: "د. أحمد", role: "طبيب أسنان" }
                ]
            },
            pricing: {
                title: 'أسعار مناسبة',
                description: 'خطط قابلة للتوسع مصممة لتناسب حجم عيادتك واحتياجاتك.',
                mostPopular: 'الأكثر شعبية',
                perMonth: '/شهرياً',
                getStarted: 'ابدأ التجربة المجانية',
                choosePlan: 'اختر الخطة',
                contactSales: 'اتصل بالمبيعات',
                plans: [
                    {
                        name: 'البداية',
                        price: '$19',
                        features: [
                            'طبيب واحد',
                            'حتى 300 موعد شهرياً',
                            'مساعد واتساب ذكي (أساسي)',
                            'تذكيرات تلقائية',
                            'لوحة تحكم المواعيد',
                            'دعم عبر البريد الإلكتروني'
                        ]
                    },
                    {
                        name: 'برو',
                        price: '$49',
                        features: [
                            'حتى 5 أطباء',
                            'مواعيد غير محدودة',
                            'جدولة ذكية متقدمة',
                            'إدارة التقويم الذكي',
                            'تذكيرات عبر الواتساب',
                            'نظام إدارة المرضى',
                            'لوحة تحكم التحليلات',
                            'دعم ذو أولوية'
                        ]
                    },
                    {
                        name: 'المؤسسات',
                        price: 'مخصص',
                        features: [
                            'أطباء غير محدودين',
                            'إدارة فروع متعددة',
                            'مساعد اتصال بالذكاء الاصطناعي',
                            'تكاملات مخصصة (API)',
                            'مدير حساب مخصص',
                            'دعم مستوى الخدمة (SLA)'
                        ]
                    }
                ]
            },
            cta: {
                title: 'هل أنت مستعد للبدء؟',
                description: 'انضم لآلاف العيادات التي تستخدم النظام بالفعل.',
                getStarted: 'ابدأ الآن',
                contactSales: 'تواصل مع المبيعات'
            },
            footer: {
                tagline: 'مستقبل الإدارة الطبية.',
                product: 'المنتج',
                company: 'الشركة',
                about: 'من نحن',
                contact: 'تواصل معنا',
                privacy: 'سياسة الخصوصية',
                terms: 'شروط الخدمة',
                rights: 'جميع الحقوق محفوظة.'
            }
        },
        register: {
            steps: {
                type: 'نوع العيادة',
                info: 'معلومات العيادة',
                doctor: 'الأطباء',
                account: 'الحساب'
            },
            upload: {
                title: 'انقر للرفع أو اسحب وأفلت',
            },
            type: {
                title: 'اختر نوع العيادة',
                subtitle: 'حدد نوع العيادة التي تديرها لتخصيص تجربتك.',
                single: {
                    title: 'عيادة مفردة',
                    description: 'مثالي للأطباء المستقلين في موقع واحد.'
                },
                multi: {
                    title: 'فروع متعددة',
                    description: 'مثالي للعيادات ذات الفروع المتعددة والأطباء المتعددين.'
                }
            },
            info: {
                title: 'معلومات العيادة',
                subtitle: 'أخبرنا قليلاً عن عيادتك.',
                name: 'اسم العيادة',
                specialty: 'التخصص الأساسي',
                address: 'عنوان العيادة',
                Country: 'الدولة ',
                city: 'مدينة ',
                phone: 'رقم هاتف العيادة',
                website: 'الموقع الإلكتروني (اختياري)'
            },
            admin: {
                title: 'إعداد بيانات الدخول',
                description: 'قم بإنشاء وصول آمن للوحة التحكم الخاصة بك.',
                infoBox: 'هذا الحساب سيكون مسؤول العيادة. يمكن للمسؤول إدارة العيادة، عرض جميع المواعيد، وإضافة أو إزالة الأطباء.',
                fullName: 'الاسم الكامل',
                email: 'البريد الإلكتروني للاتصال',
                password: 'كلمة المرور',
                confirmPassword: 'تأكيد كلمة المرور'
            },
            doctors: {
                title: 'إضافة الأطباء',
                subtitle: 'أضف الأطباء العاملين في فروعك.',
                addDoctor: 'إضافة طبيب آخر',
                name: 'الاسم الكامل',
                email: 'البريد الإلكتروني',
                specialty: 'التخصص',
                phone: 'رقم الهاتف',
                skip: 'تخطي الآن'
            },
            nav: {
                back: 'رجوع',
                continue: 'متابعة',
                registering: 'جارٍ التسجيل...',
                register: 'إكمال التسجيل'
            },
            trust: {
                title: 'موثوق وآمن',
                hipaa: {
                    title: 'متوافق مع HIPAA',
                    description: 'بيانات مرضاك آمنة ومشفرة بالكامل وفقاً لمعايير الرعاية الصحية العالمية.'
                },
                encryption: {
                    title: 'تشفير شامل',
                    description: 'جميع الاتصالات مشفرة بالكامل، بما في ذلك رسائل واتساب الذكية.'
                },
                community: {
                    title: 'شبكة موثوقة',
                    description: 'انضم لآلاف الأطباء المعتمدين والموثوقين الذين يستخدمون منصتنا.'
                }
            },
            help: {
                title: 'تحتاج إلى مساعدة؟',
                description: 'فريق الدعم متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في عملية التسجيل.',
                contact: 'تواصل مع الدعم'
            }
        },
        dashboard: {
            search: "البحث في المواعيد والمرضى...",
            newAppointment: "موعد جديد",
            todayAppointments: "مواعيد اليوم",
            todayAppointmentsDesc: "لديك 48 موعداً مجدولاً اليوم",
            recentActivity: "النشاط الأخير",
            recentActivityDesc: "آخر التحديثات في عيادتك",
            doctorsOverview: "نظرة عامة على الأطباء",
            doctorsOverviewDesc: "الحالة المباشرة لفريقك الطبي",
            aptsToday: "موعد اليوم",
            addNewDoctor: "إضافة طبيب جديد",
            clinicCalendar: "تقويم العيادة",
            clinicCalendarDesc: "نظرة أسبوعية شاملة لجميع الفروع",
            recentPatients: "المرضى الأخيرون",
            recentPatientsDesc: "آخر المرضى المسجلين أو الذين تمت زيارتهم",
            viewAllPatients: "عرض جميع المرضى",
            myPatients: "المرضى الخاصين بي",
            myPatientsDesc: "أحدث المرضى المعينين لك",
            visitType: "نوع الزيارة",
            startSession: "بدء الجلسة",
            addNote: "إضافة ملاحظة",
            weeklySchedule: "الجدول الأسبوعي",
            weeklyScheduleDesc: "مواعيدك لهذا الأسبوع",
            statsLabels: {
                totalDoctors: "إجمالي الأطباء",
                totalPatients: "إجمالي المرضى",
                todayAppointments: "مواعيد اليوم",
                completedVisits: "الزيارات المكتملة",
                revenueToday: "إيرادات اليوم",
                pendingAppointments: "المواعيد قيد الانتظار"
            },
            mock: {
                thisMonth: "هذا الشهر",
                fromLastMonth: "منذ الشهر الماضي",
                pending: "قيد الانتظار",
                completionRate: "معدل الإكمال",
                fromYesterday: "منذ أمس",
                cardiology: "أمراض القلب",
                pediatrics: "طب الأطفال",
                dermatology: "الجلدية",
                cardiologist: "طبيب قلب",
                pediatrician: "طبيب أطفال",
                dermatologist: "طبيب جلدية",
                available: "متاح",
                busy: "مشغول",
                patientRegistered: "تم تسجيل مريض جديد: {name}",
                appointmentCompleted: "تم إكمال موعد المريض: {name}",
                appointmentCancelled: "تم إلغاء موعد المريض: {name}",
                hoursAgo: "منذ {n} ساعات"
            },
            appointments: {
                statusConfirmed: "مؤكد",
                statusPending: "قيد الانتظار",
                statusCancelled: "ملغى",
                viewAll: "عرض الكل"
            },
            sidebar: {
                dashboard: "لوحة التحكم",
                doctors: "الأطباء",
                patients: "المرضى",
                appointments: "المواعيد",
                calendar: "التقويم",
                billing: "الفواتير",
                staff: "إدارة الموظفين",
                reports: "التقارير",
                settings: "الإعدادات",
                myAccount: "حسابي",
                profile: "الملف الشخصي",
                team: "الفريق",
                subscription: "الاشتراك",
                logout: "تسجيل الخروج"
            },
            table: {
                time: "الوقت",
                patient: "المريض",
                doctor: "الطبيب",
                department: "القسم",
                status: "الحالة",
                patientName: "اسم المريض",
                phoneNumber: "رقم الهاتف",
                lastVisit: "آخر زيارة",
                actions: "الإجراءات"
            },
            doctorsManagement: {
                title: "إدارة الأطباء",
                description: "إدارة أطباء العيادة ومتابعة حالاتهم وملخص الإحصائيات.",
                addDoctor: "إضافة طبيب",
                filter: "تصفية",
                table: {
                    doctorName: "اسم الطبيب",
                    specialty: "التخصص",
                    patients: "المرضى",
                    appointments: "المواعيد",
                    status: "الحالة",
                    actions: "الإجراءات"
                },
                status: {
                    active: "نشط",
                    inactive: "غير نشط",
                    onLeave: "في إجازة"
                }
            },
            patientsManagement: {
                title: "إدارة المرضى",
                description: "عرض وإدارة سجلات المرضى وتاريخهم الطبي في عيادتك.",
                searchPlaceholder: "ابحث بالاسم أو رقم الهاتف...",
                filterAll: "الكل",
                filterActive: "نشط",
                filterInactive: "غير نشط",
                table: {
                    name: "اسم المريض",
                    phone: "رقم الهاتف",
                    visits: "الزيارات",
                    lastVisit: "آخر زيارة",
                    status: "الحالة",
                    actions: "الإجراءات"
                },
                details: {
                    totalVisits: "إجمالي الزيارات",
                    totalAppointments: "إجمالي المواعيد",
                    cancelledAppointments: "الملغاة",
                    tabs: {
                        appointments: "المواعيد",
                        doctors: "الأطباء",
                        notes: "الملاحظات"
                    },
                    noNotes: "لا توجد ملاحظات متاحة",
                    addNote: "إضافة ملاحظة",
                    notePlaceholder: "اكتب ملاحظة جديدة لهذا المريض...",
                    whatsappMessage: "مرحباً، نحن من CuraClinic نتواصل معك بخصوص سجلك الصحي."
                }
            }
        }
    }
};
