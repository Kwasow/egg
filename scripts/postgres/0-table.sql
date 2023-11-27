-- Select database
\connect egg;

-- Create tables
CREATE TABLE Session (
  session_id VARCHAR(64),
  username VARCHAR(30),
  last_used TIMESTAMP
);

CREATE TABLE EggUser (
  username VARCHAR(30),
  passwd_hash VARCHAR(60)
);

CREATE TABLE Speakers (
  id SERIAL PRIMARY KEY,
  position Integer,
  name Text,
  description_pl Text,
  description_en Text,
  picture Text
);

CREATE TABLE Experts (
  id SERIAL PRIMARY KEY,
  position Integer,
  name Text,
  description_pl Text[],
  description_en Text[],
  picture Text
);

CREATE TABLE News (
  id SERIAL PRIMARY KEY,
  title_pl TEXT,
  title_en TEXT,
  text_pl TEXT[],
  text_en TEXT[],
  image TEXT,
  published_date TEXT
);

-- Create test user
-- User details:
--   - login: admin
--   - password: admin
INSERT INTO EggUser (username, passwd_hash)
VALUES ('admin', '$2y$10$Mbhv49o0OwWcb1uOv3YaB.cyMhfygftmpjZgwBrv65tYcZzh2tXs2');

-- Create example organizers
INSERT INTO Speakers (position, name, description_pl, description_en, picture)
VALUES
  (1, 'Aleksandra Kujawa', 'Kierunek lekarski (V rok), Przewodnicząca Koła i Komitetu Organizacyjnego', 'Medicine program (5th year), chairwoman', 'aleksandra_kujawa.webp'),
  (2, 'Marta Bombała', 'Kierunek lekarski (IV rok)', 'Medicine program (4th year)', 'marta_bombala.webp'),
  (3, 'Agata Chojnicka', 'Lekarz stażysta, Szpital MSWiA', 'Doctor intern, MSWiA Hospital', 'agata_chojnicka.webp'),
  (4, 'Julia Dróżdż', 'Kierunek lekarski (V rok)', 'Medicine program (5th year)', 'julia_drozdz.webp'),
  (5, 'Ewa Jagodzińska', 'Kierunek lekarski (III rok)', 'Medicine program (3rd year)', 'ewa_jagodzinska.webp'),
  (6, 'Weronika Jędrzejczak', 'Kierunek lekarski (II rok)', 'Medicine program (2nd year)', 'weronika_jedrzejczak.webp'),
  (7, 'Julia Jeridi', 'Kierunek lekarski (II rok)', 'Medicine program (2nd year)', 'julia_jeridi.webp'),
  (8, 'Monika Kamińska', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'monika_kaminska.webp'),
  (9, 'Jana Krasowska', 'Kierunek lekarski (IV rok)', 'Medicine program (4th year)', 'jana_krasowska.webp'),
  (10, 'Adrian Kruszewski', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'adrian_kruszewski.webp'),
  (11, 'Katarzyna Mączka', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'katarzyna_maczka.webp'),
  (12, 'Agata Pisula', 'Lekarz', 'Doctor', 'agata_pisula.webp'),
  (13, 'Paulina Przybysz', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'paulina_przybysz.webp'),
  (14, 'Natalia Rosół', 'Kierunek lekarski (IV rok)', 'Medicine program (4th year)', 'natalia_rosol.webp'),
  (15, 'Julia Rudnicka', 'Kierunek lekarski (V rok)', 'Medicine program (5th year)', 'julia_rudnicka.webp'),
  (16, 'Elena Sztemberg', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'elena_sztemberg.webp'),
  (17, 'Zuzanna Tomczewska', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'zuzanna_tomczewska.webp'),
  (18, 'Monika Wyszyńska', 'Kierunek lekarski (III rok)', 'Medicine program (3rd year)', 'monika_wyszynska.webp'),
  (19, 'Damian Zdanowski', 'Kierunek lekarski (VI rok)', 'Medicine program (6th year)', 'damian_zdanowski.webp');

-- Create example speakers
INSERT INTO Experts (position, name, description_pl, description_en, picture)
VALUES
  (1, 'prof. dr hab. n. med. Krzysztof Czajkowski', 
    '{
      "Zajmuje się prowadzeniem ciąży u kobiet chorych na cukrzycę (cukrzyca ciążowa) oraz leczeniem powikłań i patologii w ciąży, zastosowaniem progesteronu i gestagenów w ciąży, gospodarką lipidową w ciąży, porodem przedwczesnym oraz uroginekologią szczególnie w powiązaniu z położnictwem.",
      "W 2007 roku otrzymał tytuł profesora nauk medycznych. Na zaproszenie North American Diabetes Study Group Pan Profesor wziął udział w specjalnej konferencji w San Antonio (USA) poświęconej planowaniu kierunków dalszych badań naukowych w ciąży powikłanej cukrzycą.",
      "Pan Profesor jest <b>krajowym konsultantem w Dziedzinie Położnictwa i Ginekologii, prezesem Polskiego Towarzystwa Medycyny Perinatalnej oraz członkiem: Polskiego Towarzystwa Ginekologicznego, Polskiego Towarzystwa Ginekologii Onkologicznej Oddziału Warszawskiego Polskiego Towarzystwa Ginekologicznego, IUGA,</b> zarządu sekcji Diabetologii i Otyłości PTG, zarządu sekcji Uroginekologii PTG."
    }',
    '{
      "He deals with pregnancy management in women with diabetes (gestational diabetes) and the treatment of pregnancy complications and pathologies, the use of progesterone and gestagens in pregnancy, lipid management in pregnancy, premature birth and urogynecology, especially in connection with obstetrics.",
      "In the year 2007 he received the title of professor of medical sciences. At the invitation of the North American Diabetes Study Group, the Professor took part in a special conference in San Antonio (USA) devoted to planning directions for further scientific research in pregnancy complicated by diabetes.",
      "The Professor is a <b>National Consultant in the Field of Obstetrics and Gynecology, president of the Polish Society of Perinatal Medicine and a member of: Polish Gynecological Society, Polish Society of Oncological Gynecology, Warsaw Branch of the Polish Gynecological Society, IUGA,</b> board of the Diabetology and Obesity section of PTG, board of the Urogynecology section of PTG."
    }',
    'krzysztof-czajkowski.webp'),
  (2, 'dr hab. n. med Ewa Romejko-Wolniewicz',
    '{
      "<b>Jest opiekunem Studenckiego Koła Naukowego przy II Katedrze Ginekologii i Położnictwa Warszawskiego Uniwersytetu Medycznego.</b>",
      "Jest <b>kierownikiem oddziału położniczego w II Katedrze i Klinice Położnictwa i Ginekologii Warszawskiego Uniwersytetu Medycznego</b>. Posiada specjalizację z ginekologii i położnictwa, endokrynologii oraz perinatologii.",
      "Jest autorką i współautorką 167 publikacji oraz 7 rozdziałów w monografiach. Promotorka 2 ukończonych prac doktorskich i 9 magisterskich, 2 otwartych przewodów doktorskich, recenzentka 2 obronionych prac doktorskich i 2 do obrony oraz 33 prac magisterskich; sekretarz 3 komisji habilitacyjnych, recenzentka 23 artykułów w czasopismach zagranicznych.",
      "Pani docent od 10 lat współpracuje i wspiera na wielu polach studentów działających w Kole Naukowym przy II Katedrze i Klinice Położnictwa i Ginekologii WUM."
    }',
    '{
      "<b>Se is a supervisor of the Student Scientific Circle at the 2nd Department of Gynecology and Obstetrics of the Medical University of Warsaw.</b>",
      "She is <b>head of the obstetrics ward at the 2nd Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw</b>. He specializes in gynecology and obstetrics, endocrinology and perinatology.",
      "She is the author and co-author of 167 publications and 7 chapters in monographs. Supervisor of 2 completed doctoral and 9 master&#39;s theses, 2 open doctoral dissertations, reviewer of 2 defended doctoral theses and 2 to be defended, and 33 master&#39;s theses; secretary of 3 habilitation committees, reviewer of 23 articles in foreign journals.",
      "For 10 years, the docent has been cooperating and supporting students working in the Scientific Circle at the 2nd Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw in many fields."
    }',
    'ewa-romejko-wolniewicz.webp'),
  (3, 'dr n. med. Agnieszka Dobrowolska-Redo', 
    '{
      "<b>Jest opiekunem Studenckiego Koła Naukowego przy II Katedrze Ginekologii i Położnictwa Warszawskiego Uniwersytetu Medycznego.</b>",
      "Pełni funkcję <b>starszego asystenta w Szpitalu Klinicznym im. ks. A. Mazowieckiej przy ul. Karowej,</b> a także jako nauczyciel akademicki Warszawskiego Uniwersytetu Medycznego. Jest specjalistą położnictwa i ginekologii, w trakcie specjalizacji z perinatologii.",
      "Zajmuje się: prowadzeniem ciąży fizjologicznej i powikłanej, diagnozowaniem oraz leczeniem niepłodności, poradnictwem pre-koncepcyjnym- przygotowaniem do ciąży, badaniami profilaktycznymi, leczeniem stanów zapalnych narządu rodnego i leczeniem zaburzeń miesiączkowania. Do kręgu zainteresowań Pani Doktor należy leczenie cukrzycy ciężarnych i jej wpływ na dalszy przebieg życia kobiety. Pani Doktor ma na swoim koncie również liczne konferencje, międzynarodowe zjazdy ginekologów i położników."
    }',
    '{
      "<b>Se is a supervisor of the Student Scientific Circle at the 2nd Department of Gynecology and Obstetrics of the Medical University of Warsaw.</b>",
      "She works as a <b>senior assistant at the Clinical Hospital of A. Mazowiecka at Karowa street,</b> and also as an academic teacher at the Medical University of Warsaw. She is a specialist in obstetrics and gynecology, acquiring a specialization in perinatology.",
      "She deals with: conducting physiological and complicated pregnancies, diagnosing and treating infertility, pre-conception counseling - preparation for pregnancy, preventive examinations, treatment of inflammation of the reproductive organs and treatment of menstrual disorders. The doctor&#39;s interests include the treatment of gestational diabetes and its impact on the further course of a woman&#39;s life. The doctor has also participated in numerous conferences, international meetings of gynecologists and obstetricians."
    }',
    'agnieszka-dobrowolska-redo.webp'),
  (4, 'dr n. med. Joanna Kacperczyk-Bartnik',
    '{
      "<b>Jest opiekunem Studenckiego Koła Naukowego przy II Katedrze Ginekologii i Położnictwa Warszawskiego Uniwersytetu Medycznego.</b>",
      "Jest absolwentką Warszawskiego Uniwersytetu Medycznego. Interesuje się profilaktyką chorób nowotworowych żeńskiego układu rozrodczego. Jest <b>członkiem ESGO Prevention Committee, członkiem zarządu European Network of Young Gyne Oncologists oraz członkiem zespołu redakcyjnego International Journal of Gynecologic Oncology.</b>"
    }',
    '{
      "<b>Se is a supervisor of the Student Scientific Circle at the 2nd Department of Gynecology and Obstetrics of the Medical University of Warsaw.</b>",
      "She is a graduate of the Medical University of Warsaw. She is interested in the prevention of cancer diseases of the female reproductive system. She is a <b>member of the ESGO Prevention Committee, a member of the board of the European Network of Young Gyne Oncologists and a member of the editorial team of the International Journal of Gynecologic Oncology.</b>"
    }',
    'joanna-kacperczyk-bartnik.webp'),
  (5, 'prof. dr hab. n. med Mariusz Bidziński',
    '{
      "Prof. dr hab. n. med. Mariusz Bidziński jest <b>specjalistą ginekologiem położnikiem, specjalistą ginekologiem onkologiem.</b> Jest <b>członkiem Polskiego Towarzystwa Ginekologii, Polskiego Towarzystwa Ginekologii Onkologicznej, Europejskiego Towarzystwa Ginekologii Onkologicznej, Europejskiego Towarzystwa Endoskopii Ginekologicznej, Amerykańskiego Towarzystwa Onkologii Klinicznej.</b> Profesor jest <b>konsultantem krajowym w dziedzinie Ginekologii Onkologicznej oraz kierownikiem Kliniki Ginekologii Onkologicznej Narodowego Instytutu Onkologii-Państwowego Instytutu Badawczego.</b>",
      "Pan profesor jest absolwentem Warszawskiego Uniwersytetu Medycznego (Warszawskiej Akademii Medycznej). W 1999 roku uzyskał stopień naukowy doktora habilitowanego w Centrum Onkologii - Instytut imienia Marii Skłodowskiej-Curie w oparciu o pracę &#34;Analiza zaburzeń gęstości mineralnej kości oraz ocena wybranych farmakologicznych metod przeciwdziałania im u kobiet leczonych z powodu raka trzonu macicy&#34;. W 2007 roku otrzymał tytuł Profesora nauk medycznych.",
      "Pierwszego dnia konferencji wygłosi dla Państwa specjalny wykład pt. &#34;Współczesne zasady opieki nad pacjentem leczonym onkologicznie&#34;."
    }',
    '{
      "Dr. Mariusz Bidziński MD, PhD is a <b>specialist in obstetrics and gynecology, a specialist in gynecology and oncology.</b> He is a <b>member of the Polish Society of Gynecology, Polish Society of Gynecological Oncology, European Society of Gynecological Oncology, European Society of Gynecological Endoscopy, American Society of Clinical Oncology.</b> The professor is a <b>national consultant in the field of Oncological Gynecology and the head of the Oncological Gynecology Clinic of the National Institute of Oncology-National Research Institute.</b>",
      "The professor is a graduate of the Medical University of Warsaw (Warsaw Medical Academy). In 1999, he obtained the degree of doctor habilitated at the Oncology Center - Maria Skłodowska-Curie Institute based on the work &#34;Analysis of bone mineral density disorders and evaluation of selected pharmacological methods of counteracting them in women treated for endometrial cancer&#34;. In 2007 he received the title of Professor of Medical Sciences.",
      "On the first day of the conference, he will give a special lecture entitled &#34;Modern principles of caring for an oncological patient&#34;, and on the second day he will comment on the lectures presented during the second scientific session."
    }',
    'mariusz-bidzinski.webp'),
  (6, 'prof. dr hab. n. med. Włodzimierz Sawicki',
    '{
      "Profesor dr hab. n. med. Włodzimierz Sawicki jest <b>kierownikiem Katedry i Kliniki Położnictwa, Chorób Kobiecych i Ginekologii Onkologicznej Warszawskiego Uniwersytetu Medycznego w Mazowieckim Szpitalu Bródnowskim. Został wybrany na Prezesa Polskiego Towarzystwa Ginekologii Onkologicznej</b> na lata 2021-2025. Zajmuje się głównie: ginekologią, ginekologią onkologiczną, diagnostyką ultrasonograficzną w ciąży powikłanej i wysokiego ryzyka, ultrasonograficznym wykrywaniem i różnicowaniem nowotworów trzonu macicy, szyjki macicy i jajnika."
    }',
    '{
      "Professor Włodzimierz Sawicki MD is the <b>head of the Department and Clinic of Obstetrics, Gynecology and Oncological Gynecology at the Medical University of Warsaw in the Mazowiecki Szpital Bródnowski. He was elected President of the Polish Society of Gynecology Oncology</b> for the years 2021-2025. He mainly deals with: gynecology, gynecological oncology, ultrasound diagnostics in complicated and high-risk pregnancy, ultrasound detection and differentiation of endometrial, cervical and ovarian cancers."
    }',
    'wlodzimierz-sawicki.webp'),
  (7, 'prof. dr hab. n. med. Robert Jach',
    '{
      "Prof. dr hab. n. med. Robert Jach jest <b>kierownikiem Kliniki Endokrynologii Ginekologicznej</b> Szpitala Uniwersyteckiego Uniwersytetu Jagiellońskiego Collegium Medicum w Krakowie. Pan Profesor jest <b>konsultantem wojewódzkim w zakresie endokrynologii ginekologicznej.</b> Posiada specjalizacje: ginekolog - położnik, ginekolog- onkolog oraz tytuł specjalisty endokrynologii ginekologicznej. Jest <b>członkiem Polskiego Towarzystwa Ginekologicznego, Polskiego Towarzystwa Kolposkopii i Patofizjologii Szyjki Macicy oraz Europejskiego Towarzystwa Ginekologii Onkologicznej.</b>"
    }',
    '{
      "Prof. Robert Jach MD, PhD is the <b>head of the Department of Gynecological Endocrinology</b> at the University Hospital of the Jagiellonian University Medical College in Krakow. The professor is a <b>provincial consultant in the field of gynecological endocrinology.</b> He has the following specializations: gynecologist-obstetrician, gynecologist-oncologist and the title of specialist in gynecological endocrinology. He is a <b>member of the Polish Gynecological Society, the Polish Society of Colposcopy and Cervical Pathophysiology and the European Society of Gynecological Oncology.</b>"
    }',
    'robert-jach.webp'),
  (8, 'prof. dr hab. n. med. Artur Jakimiuk',
    '{
      "Jest <b>specjalistą w zakresie ginekologii i położnictwa, perinatologii, endokrynologii ginekologicznej i rozrodczości oraz onkologii ginekologicznej.</b> Pan Profesor jest <b>konsultantem wojewódzkim ds. Perinatologii i prezesem Warszawskiego Towarzystwa Ginekologów i Położników.</b> Posiada bogate doświadczenie zawodowe, które nabywał, pracując jako <b>kierownik Kliniki Położnictwa, Chorób Kobiecych i Ginekologii Onkologicznej w Centralnym Szpitalu Klinicznym MSWiA, kierownik Zakładu Zdrowia Prokreacyjnego Instytut Matki i Dziecka oraz profesor zwyczajny Instytutu Medycyny Doświadczalnej i Klinicznej im. Mirosława Mossakowskiego Polskiej Akademii Nauk.</b>"
    }',
    '{
      "He is a <b>specialist in gynecology and obstetrics, perinatology, gynecological endocrinology and reproductive and gynecological oncology.</b> The professor is a <b>provincial consultant for perinatology and the president of the Warsaw Society of Gynecologists and Obstetricians.</b> He has extensive professional experience, which he gained while working as the <b>head of the Department of Obstetrics, Gynecological Diseases and Oncological Gynecology at the Central Clinical Hospital of the Ministry of Interior and Administration, head of the Reproductive Health Department of the Institute of Mother and Child and full professor at the Institute of Experimental and Clinical Medicine at the Polish Academy of Sciences.</b>"
    }',
    'artur-jakimiuk.webp'),
  (9, 'prof. dr hab. n. med. Grzegorz Panek',
    '{
      "Jest <b>specjalistą II stopnia z ginekologii i położnictwa oraz ginekologii onkologicznej.</b> Obecnie jest <b>kierownikiem Oddziału Klinicznego Ginekologii i Położnictwa Szpitala im. W. Orłowskiego CMKP.</b> Zajmując stanowisko <b>kierownika Zespołu Ginekologii Onkologicznej I Katedry i Kliniki Położnictwa i Ginekologii WUM</b> współpracuje z wieloma renomowanymi ośrodkami, w których zajmuje się pomocą pacjentkom dotkniętym problemem nowotworu."
    }',
    '{
      "He is a <b>second degree specialist in gynecology and obstetrics as well as gynecological oncology.</b> Currently, he is the <b>head of the Clinical Department of Gynecology and Obstetrics of the W. Orłowski CMKP Hospital.</b> As the <b>head of the Oncological Gynecology Team of the 1st Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw,</b> he cooperates with many renowned centers where she helps patients affected by cancer."
    }',
    'grzegorz-panek.webp'),
  (10, 'dr hab. n. med. Paweł Derlatka',
    '{
      "Pan dr hab. n. med. Paweł Derlatka ukończył studia na I Wydziale Lekarskim Akademii Medycznej w Warszawie otrzymując dyplom z wyróżnieniem. W 1998 otrzymał I stopień specjalizacji w zakresie Położnictwa i Ginekologii, a w 2001 II stopień <b>specjalizacji w zakresie Położnictwa i Ginekologii.</b> W 2005 otrzymał tytuł <b>specjalisty ginekologii onkologicznej.</b> W 2000 uzyskał tytuł doktora nauk medycznych nadany przez Radę Naukową Centrum Onkologii-Instytutu im. Marii Skłodowskiej-Curie na podstawie pracy pt.: Zagrożenie żylną chorobą zakrzepowo-zatorową u chorych z rozpoznanym rakiem błony śluzowej trzonu macicy.",
      "W ciągu swojego 25-letniego doświadczenia zawodowego, przez ponad 14 lat pracy zawodowej, pan dr. hab. n. med. Paweł Derlatka był związany z Narodowym Instytutem Onkologii. Obecnie pełni funkcję <b>kierownika oddziału ginekologii onkologicznej w Szpitalu Klinicznym imienia Księżnej Anny Mazowieckiej przy ulicy Karowej w Warszawie,</b> gdzie wykonuje m.in. operacje cytoredukcyjne w przebiegu raka jajnika."
    }',
    '{
      "Mr. Paweł Derlatka MD, PhD graduated from the 1st Faculty of Medicine of the Medical Academy in Warsaw, receiving a diploma with distinction. In 1998 he received the first degree of specialization in Obstetrics and Gynecology, and in 2001 the <b>second degree of specialization in Obstetrics and Gynecology.</b> In 2005 he received the title of <b>specialist in gynecological oncology.</b> In 2000, he obtained the title of doctor of medical sciences awarded by the Scientific Council of the Oncology Center - Institute of Maria Skłodowska-Curie on the basis of the work entitled: Threat of venous thromboembolism in patients diagnosed with endometrial cancer.",
      "During his 25 years of professional experience, over 14 years of professional work, Paweł Derlatka MD, PhD was associated with the National Institute of Oncology. Currently, he is the <b>head of the oncological gynecology department at the Duchess Anna Mazowiecka Clinical Hospital at Karowa Street in Warsaw,</b> where among others, he performs cytoreductive surgery in the course of ovarian cancer."
    }',
    'pawel-derlatka.webp'),
  (11, 'dr hab. n. med. Jacek Sieńko',
    '{
      "Jest <b>specjalistą położnikiem-ginekologiem oraz ginekologiem-onkologiem.</b> Zajmuje się opieką nad kobietami w ciąży, diagnostyką i leczeniem pacjentek z problemami ginekologicznymi oraz chorymi z nowotworami narządu rodnego, w tym także wikłającymi ciążę. Na co dzień łączy pracę lekarza w Szpitalu Klinicznym im. ks. Anny Mazowieckiej w Warszawie z rolą nauczyciela akademickiego w II Katedrze i Klinice Położnictwa i Ginekologii Warszawskiego Uniwersytetu Medycznego. Od 1 października 2020 pełni funkcję <b>Prodziekana ds. Studenckich English Division na Wydziale Lekarskim Warszawskiego Uniwersytetu Medycznego.</b>"
    }',
    '{
      "He is a <b>specialist obstetrician-gynecologist and gynecologist-oncologist.</b> He cares for pregnant women, diagnoses and treats patients with gynecological problems and patients with cancers of the reproductive organs, including those complicating pregnancy. On a daily basis, he combines the work of a doctor at the Clinical Hospital of Anna Mazowiecka in Warsaw with the role of an academic teacher in the 2nd Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw. From October 1, 2020, he is the <b>Vice-Dean for Student Affairs of the English Division at the Faculty of Medicine of the Medical University of Warsaw.</b>"
    }',
    'jacek-sienko.webp'),
  (12, 'dr n. med. Anna Dańska-Bidzińska',
    '{
      "Jest <b>specjalistką w zakresie: położnictwa i ginekologii oraz ginekologii onkologicznej.</b> Pani Doktor jest <b>członkinią Polskiego Towarzystwa Ginekologii i Położnictwa, Polskiego Towarzystwa Ginekologii Onkologicznej, Europejskiego Towarzystwa Ginekologii Onkologicznej.</b>",
      "Pani Doktor Anna Dańska-Bidzińska specjalizuje się w leczeniu zachowawczym i operacyjnym schorzeń ginekologicznych w tym mięśniaków macicy, guzów macicy i jajnika. Dużą część pracy zawodowej poświęciła wszelkim nieprawidłowościom w zakresie szyjki macicy. Pani Doktor prowadzi leczenie skojarzone w zakresie nowotworów kobiecych ze szczególnym naciskiem w kierunku raka szyjki macicy."
    }',
    '{
      "She is a <b>specialist in obstetrics and gynecology as well as oncological gynecology.</b> The doctor is a <b>member of the Polish Society of Gynecology and Obstetrics, Polish Society of Gynecology Oncology, European Society of Gynecology Oncology.</b>",
      "Doctor Anna Dańska-Bidzińska specializes in the conservative and surgical treatment of gynecological diseases, including uterine fibroids, uterine and ovarian tumors. She devoted a large part of her professional work to all abnormalities in the area of the cervix. The doctor conducts combined treatment in the field of female cancers with particular emphasis on cervical cancer."
    }',
    'anna-danska-bidzinska.webp'),
  (13, 'dr Grzegorz Chmielewski',
    '{
      "Dr Grzegorz Chmielewski jest lekarzem <b>specjalistą z zakresu położnictwa i ginekologii.</b> Przez 10 lat związany ze Szpitalem Klinicznym im. Ks. Anny Mazowieckiej w Warszawie, pracuje <b>obecnie w szpitalu uniwersyteckim Norrlands Universitetssjukhus w Umeå w Szwecji.</b> Podczas specjalizacji w Polsce interesował się głównie położnictwem, ultrasonografią ciąży, oraz uroginekologią. Aktualnie zajmuje się chirurgicznym leczeniem nowotworów kobiecych narządów rodnych, choć w dalszym ciągu utrzymuje też kontakt z położnictwem poprzez dyżury na sali porodowej. Szczególnie zafascynowany rozwojem laparoskopii z wykorzystaniem robota. Trzeciego dnia Konferencji wygłosi wykład &#34;Chirurgia robotowa na oddziale chirugii ginekologicznej w Szwecji&#34;."
    }',
    '{
      "Dr. Grzegorz Chmielewski is a <b>specialist in obstetrics and gynecology.</b> For 10 years associated with the Clinical Hospital of Anna Mazowiecka in Warsaw, <b>currently works at the Norrlands Universitetssjukhus in Umeå, Sweden.</b> During his specialization in Poland, he was mainly interested in obstetrics, ultrasound of pregnancy and urogynecology. Currently, he deals with the surgical treatment of cancers of female reproductive organs, although he still maintains contact with obstetrics through shifts in the delivery room. Particularly fascinated by the development of robotic laparoscopy. On the third day of the Conference, he will give a lecture &#34;Robotic surgery in the department of gynecological surgery in Sweden&#34;."
    }',
    'grzegorz-chmielewski.png');

INSERT INTO News (title_pl, title_en, text_pl, text_en, image, published_date)
VALUES
  ('MedPharm Polska', 'MedPharm Poland',
    '{
      "Kolejnym sponsorem naszej konferencji jest MedPharm Polska. Wydawnictwo Medyczne i Farmaceutyczne MedPharm Polska działa na polskim rynku wydawniczym od 2005 roku. Siedziba firmy znajduje się we Wrocławiu. W swojej ofercie mają już ponad 300 tytułów książkowych, które znaleźć można w ich księgarni medycznej www.medpharm.pl",
      "Ich książki kierowane są przede wszystkim do lekarzy, farmaceutów, fizjoterapeutów, diagnostów laboratoryjnych, kosmetologów oraz lekarzy weterynarii. Po publikacje MedPharmu sięgają również osoby spoza branży medycznej.",
      "Każdy uczestnik konferencji otrzyma kalendarz zapachowy na rok 2023."
    }',
    '{
      "Another sponsor of our conference is MedPharm Poland. Wydawnictwo Medyczne i Farmaceutyczne MedPharm Polska has been operating on the Polish publishing market since 2005. The company&#39;s headquarters is in Wrocław. They already offer over 300 book titles, which can be found in their medical bookstore www. medpharm.pl",
      "Their books are addressed primarily to doctors, pharmacists, physiotherapists, laboratory diagnosticians, cosmetologists and veterinarians. MedPharm&#39;s publications are also used by people from outside the medical industry.",
      "Each conference participant will receive a scented calendar for 2023."
    }',
  'medpharm.webp', '2023-04-13T17:28'),
  ('MEDUSES', 'MEDUSES',
    '{
      "Niezmiernie miło nam przedstawić kolejnego sponsora naszej Konferencji Weekend z Ginekologią - firmę MEDUSES! MEDUSES to sklep z odzieżą medyczną o uznanej w całej Polsce renomie. Są firmą, która produkuje stroje medyczne z chirurgiczną precyzją. Szyją ubrania lekarskie z wykorzystaniem tkanin z dodatkiem naturalnych włókien. Dzięki temu masz gwarancję nie tylko wysokiej jakości, ale również tego, że materiały oddychają. Misją marki Meduses jest tworzenie scrubsów estetycznych, dopracowanych i eleganckich. Takich, na jakie medycy zasługują.",
      "Każdy uczestnik konferencji otrzyma kod rabatowy ze zniżką -12% na spodnie i bluzy w sklepie MEDUSES.",
      "Zachęcamy odwiedzenia ich strony internetowej: https://meduses.pl/"
    }',
    '{
      "We are very pleased to introduce another sponsor of our Weekend with Gynecology Conference - MEDUSES! MEDUSES is a medical clothing store with a reputation throughout Poland. They are a company that produces medical clothes with surgical precision. They sew medical clothes using fabrics with the addition of natural fibers Thanks to this, you have a guarantee not only of high quality, but also that the materials are very breathable. The mission of the Meduses brand is to create aesthetic, refined and elegant scrubs. The kind that doctors deserve.",
      "Each conference participant will receive a discount code with a -12% discount on pants and sweatshirts in the MEDUSES store.",
      "We encourage you to visit their website: https://meduses.pl/"
    }',
    'meduses.webp', '2023-04-13T17:28'),
  ('KANGOOMED', 'KANGOOMED',
    '{
      "Kolejnym sponsorem naszej konferencji jest KANGOOMED. Postaw na wygodę i styl - odzież medyczna Kangoomed zapewni najwyższy komfort pracy! We jump for perfection!",
      "Do wygrania:",
      "· 5 voucherów na kwotę 100 zł",
      "· 2 vouchery na kwotę 150 zł",
      "· 1 voucher na równowartość kompletu scrubs",
      "· kod rabatowy -10% tylko dla uczestników konferencji",
      "Zachęcamy do sprawdzenia oferty na ich stronie: https://www.kangoomed.pl/",
      "Bardzo dziękujemy za wsparcie!"
    }',
    '{
      "Another sponsor of our conference is KANGOOMED. Bet on comfort and style - Kangoomed medical clothing will ensure the highest comfort of work! We jump for perfection!",
      "Prizes:",
      "· 5 vouchers of 100zł each",
      "· 2 vouchers of 150zł each",
      "· 1 voucher for the equivalent of a set of scrubs ",
      "· a 10% exclusive discount for conference participants",
      "We encourage you to check the offer on their website: https://www.kangoomed.pl/",
      "Thank you for your support!"
    }',
    'kangoomed.webp', '2023-04-13T17:28'),
  ('InWhite', 'InWhite',
    '{
      "Niezmiernie miło nam przedstawić kolejnego sponsora naszej Konferencji Weekend z Ginekologią - firmę InWhite! InWhite to największy producent koncepcyjnej odzieży medycznej w Europie. Produkty firmy można kupić w 5 krajach, w tym w Polsce w Warszawie i Gdańsku. Przez 8 lat ubrali ponad 2 miliony specjalistów. InWhite podkreśli Twoją indywidualność. Ich misją jest uszczęśliwiać tych, którzy dbają o nas każdego dnia! Nasze zdrowie jest w Twoich rękach, Twój styl w naszych!",
      "Każdy uczestnik konferencji otrzyma kod rabatowy ze zniżką -25% na zamówienia online oraz w sklepach stacjonarnych.",
      "Zachęcamy odwiedzenia ich strony internetowej: https://inwhite.store/"
    }',
    '{
      "We are very pleased to introduce another sponsor of our Weekend with Gynecology Conference - InWhite! InWhite is the largest manufacturer of concept medical clothing in Europe. The company&#39;s products can be purchased in 5 countries, including Poland in Warsaw and Gdańsk. Over 8 years, they have dressed over 2 million specialists. InWhite will emphasize your individuality. Their mission is to make those who care for us happy every day! Our health is in your hands, your style in ours!",
      "Each conference participant will receive a discount code with a -25% discount on orders online and in their stores.",
      "We encourage you to visit their website: https://inwhite.store/"
    }',
    'inwhite.webp', '2023-04-13T17:28'),
  ('SKYN®', 'SKYN®',
    '{
      "Przedstawiamy kolejnego sponsora naszej konferencji - markę SKYN®, oferującą nielateksowe prezerwatywy wykonane z nowatorskiego materiału SKYNFEEL®. Jeśli cenicie naturalne odczucia, a jednocześnie poszukujecie nowych doznań i głębi przyjemności, produkty marki SKYN® z pewnością Was zainteresują. Delikatne i ultracienkie prezerwatywy SKYN® Elite znajdziecie, dzięki uprzejmości sponsora, w konferencyjnych welcome bagach. A jeśli chcecie dowiedzieć się więcej, sprawdźcie www.skyn.pl.",
      "Bardzo dziękujemy za wsparcie!"
    }',
    '{
      "Introducing another sponsor of our conference - the SKYN® brand, offering non-latex condoms made of the innovative SKYNFEEL® material. If you value natural sensations and at the same time are looking for new sensations and depth of pleasure, SKYN® brand products will certainly interest you. You will find SKYN® delicate and ultra-thin condoms Elite, courtesy of the sponsor, in our conference welcome bags. And if you want to learn more, check out www.skyn.pl.",
      "Thank you very much for your support!"
    }',
    'skyn.webp', '2023-04-13T17:28'),
  ('WUMshop', 'WUMshop',
    '{
      "Z ogromną przyjemnością przedstawiamy kolejnego sponsora naszej konferencji - WUMshop! Każdy student WUM powinien znać WUM Shop - w końcu to źródło wszystkiego WUMowskiego! Znajdziecie tu wszystko co może być potrzebne na zajęcia czy praktyki: odzież medyczną, długopisy, notatniki i wiele innych gadżetów ułatwiających codzienną naukę i pracę.",
      "Dzięki uprzejmości sponsora wszyscy uczestnicy otrzymają wyjątkową 20% zniżkę na odzież medyczną dostępną na stronie www.wum.shop.pl!"
    }',
    '{
      "We are pleased to introduce another sponsor of our conference - WUMshop! Every WUM student should know the WUM Shop - after all, it is the source of everything WUM! Here you will find everything you may need for classes or internships: medical clothing, pens, notebooks and many other gadgets that facilitate everyday learning and work.",
      "Thanks to the generosity of the sponsor, all participants will receive a unique 20% discount on medical clothing available at www.wum.shop.pl!"
    }',
    'wumshop.webp', '2023-04-13T17:28'),
  ('Corpus Mind', 'Corpus Mind',
    '{
      "Mamy przyjemność przedstawić Państwu kolejnego sponsora naszej Konferencji - Corpus Mind. Oto kilka słów prosto od firmy:",
      "&#34;Corpus Mind to zespół lekarzy, studentów medycyny oraz specjalistów z dziedzin ekonomii i marketingu. Dzięki wieloletniemu doświadczeniu tworzymy dla Was produkty do nauki przedmiotów medycznych, które mają na celu wspomóc efektywną naukę opartą o mnemotechniki - sprytne sposoby i sztuczki ułatwiające zapamiętywanie. Zaczęliśmy od tworzenia pomocy dydaktycznych do nauki farmakologii, ale już teraz możemy Wam zdradzić, że pracujemy nad materiałami z innych dziedzin medycyny!",
      "Jesteśmy firmą, która tworzy mnemotechniczne pomoce do nauki farmakologii, a od tego roku także fizjologii z patofizjologią człowieka.",
      "Szukasz sposobu na skuteczną i przyjemną naukę? To my!&#34;",
      "Ale to nie koniec informacji. Firma przygotowała kod rabatowy na -10% dla wszystkich uczestników Konferencji oraz nagrody dla zwycięzców w konkursie internetowym.",
      "🥇1 miejsce: dostęp roczny dla platformy F.army",
      "🥈2 miejsce: dostęp roczny do platformy physio",
      "🥉3 miesjce: Mind.book F.army"
    }',
    '{
      "We are pleased to introduce you to another sponsor of our Conference - Corpus Mind. Here are a few words straight from the company:",
      "&#34;Corpus Mind is a team of doctors, medical students and specialists in the fields of economics and marketing. Thanks to many years of experience, we create products for you to learn medical subjects, which are designed to support effective learning based on mnemonics - clever ways and tricks to help you remember. creating teaching aids for learning pharmacology, but we can already tell you that we are working on materials from other fields of medicine!",
      "We are a company that creates mnemonic aids for learning pharmacology, and from this year also physiology with human pathophysiology.",
      "Are you looking for a way to learn effectively and pleasantly? You&#39;re looking for us!&#34;",
      "But that&#39;s not all. The company has prepared a discount code for -10% for all participants of the Conference and prizes for winners in the online competition.",
      "🥇1st place: one-year access to the F.army platform",
      "🥈2nd place: one-year access to the physio platform",
      "🥉3rd place: Mind.book F.army"
    }',
    'corpus-mind.webp', '2023-04-12T10:42'),
  ('Ekspert - prof. Grzegorz Panek', 'Expert - prof. Grzegorz Panek',
    '{
      "Prof. dr hab. n. med. Grzegorz Panek specjalistą II stopnia z ginekologii i położnictwa oraz ginekologii onkologicznej. Obecnie jest kierownikiem Oddziału Klinicznego Ginekologii i Położnictwa Szpitala im. W. Orłowskiego CMKP. Zajmując stanowisko kierownika Zespołu Ginekologii Onkologicznej I Katedry i Kliniki Położnictwa i Ginekologii WUM współpracuje z wieloma renomowanymi ośrodkami, w których zajmuje się pomocą pacjentkom dotkniętym problemem nowotworu."
    }',
    '{
      "Prof. Grzegorz Panek MD, PhD is a second degree specialist in gynecology and obstetrics as well as gynecological oncology. Currently, he is the head of the Clinical Department of Gynecology and Obstetrics of the W. Orłowski CMKP Hospital. As the head of the Oncological Gynecology Team of the 1st Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw, he cooperates with many renowned centers where she helps patients affected by cancer."
    }',
    'panek.webp', '2023-03-31T17:28'),
  ('Sponsor - NOSHI', 'Sponsor - NOSHI',
    '{
      "Niezmiernie miło nam przedstawić kolejnego sponsora naszej Konferencji Weekend z Ginekologią - firmę NOSHI! NOSHI to polska marka odzieży medycznej, oparta na innowacyjnych tkaninach i minimalistycznym wzornictwie. NOSHI produkuje scrubsy medyczne oraz uniformy medyczne o różnych krojach i wariantach kolorystycznych. Odzież medyczna, którą oferuje marka wykonana jest z najlepszej jakości tkanin odpornych na spieranie, wytrzymałych a przede wszystkim oddychających. Wszystkie produkty NOSHI zostały zaprojektowane a następnie uszyte w małej rodzinnej szwalni na Podkarpaciu. Od samego początku szwalnia działała stawiając na jakość a nie na ilość.",
      "KAŻDY UCZESTNIK konferencji otrzyma kod rabatowy ze zniżką -15% na dowolny zakup w sklepie NOSHI."
    }',
    '{
      "We are very pleased to introduce another sponsor of our Weekend with Gynecology Conference - NOSHI! NOSHI is a Polish brand of medical clothing, based on innovative fabrics and minimalist design. NOSHI produces medical scrubs and medical uniforms of various cuts and colors. Medical clothing offered by the brand is made of the best quality fabrics that are resistant to washing, durable and, above all, breathable. All NOSHI products have been designed and then sewn in a small family sewing room in Subcarpathia (Poland). From the very beginning, the sewing room has been focusing on quality and not quantity.",
      "EVERY PARTICIPANT of the conference will receive a discount code with a -15% discount on any purchase in the NOSHI store."
    }',
    'noshi.webp', '2023-03-30T11:17'),
  ('Ekspert - dr Grzegorz Chmielewski', 'Expert - dr Grzegorz Chmielewski',
    '{
      "Dr Grzegorz Chmielewski jest lekarzem specjalistą z zakresu położnictwa i ginekologii. Przez 10 lat związany ze Szpitalem Klinicznym im. Ks. Anny Mazowieckiej w Warszawie, pracuje obecnie w szpitalu uniwersyteckim Norrlands Universitetssjukhus w Umeå w Szwecji. Podczas specjalizacji w Polsce interesował się głównie położnictwem, ultrasonografią ciąży, oraz uroginekologią. Aktualnie zajmuje się chirurgicznym leczeniem nowotworów kobiecych narządów rodnych, choć w dalszym ciągu utrzymuje też kontakt z położnictwem poprzez dyżury na sali porodowej. Szczególnie zafascynowany rozwojem laparoskopii z wykorzystaniem robota. Trzeciego dnia Konferencji wygłosi wykład &#34;Chirurgia robotowa na oddziale chirugii ginekologicznej w Szwecji&#34;."
    }',
    '{
      "Dr. Grzegorz Chmielewski is a specialist in obstetrics and gynecology. For 10 years associated with the Clinical Hospital of Anna Mazowiecka in Warsaw, currently works at the Norrlands Universitetssjukhus in Umeå, Sweden. During his specialization in Poland, he was mainly interested in obstetrics, ultrasound of pregnancy and urogynecology. Currently, he deals with the surgical treatment of cancers of female reproductive organs, although he still maintains contact with obstetrics through shifts in the delivery room. Particularly fascinated by the development of robotic laparoscopy. On the third day of the Conference, he will give a lecture &#34;Robotic surgery in the department of gynecological surgery in Sweden&#34;."
    }',
    'chmielewski.webp', '2023-03-28T06:09'),
  ('Medelight', 'Medelight',
    '{
      "Kolejnym sponsorem naszej konferencji jest Medelight. Medelight to propozycja dla studentów oraz specjalistów branży medycznej, którzy chcą podnieść swoje kompetencje, spędzając przy tym dobre chwile w gronie kolegów i koleżanek po fachu.",
      "Ich szkolenia kładą nacisk na umiejętności praktyczne , które trudno zdobyć jest na nastawionych na teorię studiach, a dostarczone materiały i wskazówki pozwalają na utrwalenie wiedzy i wdrożenie jej na swojej ścieżce zawodowej. Współpracując z doświadczonymi praktykami, mistrzami w swojej dziedzinie, pomogą Ci zdobyć najistotniejsze umiejętności oraz zwiększyć konkurencyjność na rynku.",
      "Do wygrania:",
      "· 4 vouchery -20% na kurs online EKG złap rytm,",
      "· 3 vouchery -10 % na kurs stacjonarny USG doppler naczyń,",
      "· 3 vouchery -10% na kurs stacjonarny USG jamy brzusznej."
    }',
    '{
      "Another sponsor of our conference is Medelight. Medelight is an offer for students and specialists in the medical industry who want to improve their competences, while spending good time with their colleagues.",
      "Their trainings emphasize practical skills, which are difficult to acquire in theory-oriented studies, and the materials and tips provided allow you to consolidate knowledge and implement it on your professional path. Working with experienced practitioners, masters in their field, they will help you acquire the most important skills and increase your competitiveness on the market.",
      "You&#39;ll have to possibility of winning one of the following:",
      "· 4 vouchers -20% for the ECG catch the rhythm online course,",
      "· 3 vouchers -10% for a stationary USG doppler course,",
      "· 3 vouchers -10% for the stationary abdominal ultrasound course."
    }',
    'medelight.webp', '2023-03-27T18:01'),
  ('Ekspertka - dr Dańska-Bidzińska', 'Expert - dr Dańska-Bidzińska',
    '{
      "Dr n. med. Anna Dańska-Bidzińska specjalistką w zakresie: położnictwa i ginekologii oraz ginekologii onkologicznej. Pani Doktor jest członkinią Polskiego Towarzystwa Ginekologii i Położnictwa, Polskiego Towarzystwa Ginekologii Onkologicznej, Europejskiego Towarzystwa Ginekologii Onkologicznej.",
      "Pani Doktor Anna Dańska-Bidzińska specjalizuje się w leczeniu zachowawczym i operacyjnym schorzeń ginekologicznych w tym mięśniaków macicy, guzów macicy i jajnika. Dużą część pracy zawodowej poświęciła wszelkim nieprawidłowościom w zakresie szyjki macicy. Pani Doktor prowadzi leczenie skojarzone w zakresie nowotworów kobiecych ze szczególnym naciskiem w kierunku raka szyjki macicy."
    }',
    '{
      "Anna Dańska-Bidzińska MD, PhD is a specialist in obstetrics and gynecology as well as oncological gynecology. The doctor is a member of the Polish Society of Gynecology and Obstetrics, Polish Society of Gynecology Oncology, European Society of Gynecology Oncology.",
      "Doctor Anna Dańska-Bidzińska specializes in the conservative and surgical treatment of gynecological diseases, including uterine fibroids, uterine and ovarian tumors. She devoted a large part of her professional work to all abnormalities in the area of the cervix. The doctor conducts combined treatment in the field of female cancers with particular emphasis on cervical cancer."
    }',
    'anna-danska-bidzinska.webp', '2023-03-26T14:31'),
  ('Kolejny ekspert', 'Another expert',
    '{
      "Prof. dr hab. n. med. Artur Jakimiuk jest specjalistą w zakresie ginekologii i położnictwa, perinatologii, endokrynologii ginekologicznej i rozrodczości oraz onkologii ginekologicznej. Pan Profesor jest konsultantem Wojewódzkim ds. Perinatologii i prezesem Warszawskiego Towarzystwa Ginekologów i Położników. Posiada bogate doświadczenie zawodowe, które nabywał, pracując jako kierownik Kliniki Położnictwa, Chorób Kobiecych i Ginekologii Onkologicznej w Centralnym Szpitalu Klinicznym MSWiA, kierownik Zakładu Zdrowia Prokreacyjnego Instytut Matki i Dziecka oraz profesor zwyczajny Instytutu Medycyny Doświadczalnej i Klinicznej im. Mirosława Mossakowskiego Polskiej Akademii Nauk."
    }',
    '{
      "Prof. Artur Jakimiuk MD, PhD is a specialist in gynecology and obstetrics, perinatology, gynecological endocrinology and reproductive and gynecological oncology. The professor is a regional consultant for perinatology and the president of the Warsaw Society of Gynecologists and Obstetricians. He has extensive professional experience, which he gained while working as the head of the Department of Obstetrics, Gynecological Diseases and Oncological Gynecology at the Central Clinical Hospital of the Ministry of Interior and Administration, head of the Reproductive Health Department of the Institute of Mother and Child and full professor at the Institute of Experimental and Clinical Medicine at the Polish Academy of Sciences."
    }',
    'jakimiuk.webp', '2023-03-25T20:21'),
  ('Sponsor - ERBE', 'Sponsor - ERBE',
    '{
      "Z przyjemnością przedstawiamy Państwu kolejnego sponsora naszej konferencji Weekend z Ginekologią - ERBE! Firma ERBE Elektromedizin założona w 1851 roku w Tubingen (Niemcy) jest najstarszym na świecie producentem diatermii chirurgicznych i szerokiej gamy podsystemów (przystawka argonowa, ewakuator dymów, nóż wodny,) dla wszystkich dziedzin chirurgii i gastroenterologii.",
      "W tym roku ERBE Polska obchodzi 31 -lecie działalności na rynku polskim. Sprzedają, serwisują, ale przede wszystkim edukują lekarzy i pielęgniarki z zakresu bezpieczeństwa w elektrochirurgii.",
      "Ich warsztaty oraz workshopy laparoskopowe na sali operacyjnej są na najwyższym poziomie merytorycznym i przyczyniają się do podniesienia poziomu wiedzy i umiejętności polskich lekarzy i pielęgniarek. W związku z dynamicznym powiększeniem ich portfolio rozpoczynają promocję i sprzedaż pełnej wieży laparoskopowej VIRON X 2D z innowacyjnymi modułami wspartymi energią dostarczaną przez ich flagowy aparat VIO3 oraz zielenią indocyjaninową 4K."
    }',
    '{
      "We are pleased to introduce you to another sponsor of our Weekend with Gynecology conference - ERBE! ERBE Elektromedizin, founded in 1851 in Tubingen (Germany), is the world&#39;s oldest manufacturer of surgical diathermy devices and a wide range of subsystems (argon adapter, fume evacuator, water knife) for all areas of surgery and gastroenterology.",
      "This year, ERBE Poland celebrates its 31st anniversary on the Polish market. They sell, service, but above all, they educate doctors and nurses in the field of safety in electrosurgery.",
      "Their laparoscopic workshops in the operating room are at the highest substantive level and contribute to raising the level of knowledge and skills of Polish doctors and nurses. Due to the dynamic expansion of their portfolio, they start the promotion and sale of the full VIRON X 2D laparoscopic tower with innovative modules supported by the energy provided by their flagship VIO3 camera and 4K indocyanine green."
    }',
    'erbe.png', '2023-03-24T23:54'),
  ('Lady Planer', 'Lady Planer',
    '{
      "Niezmiernie miło nam przedstawić kolejnego sponsora naszej Konferencji - Lady Planer! Firmę Lady Planer wyróżnia troska o ekologię, tworzenie niepowtarzalnych projektów, kreatywność. Produkcja w Polsce, w warszawskiej pracowni z najlepszej jakości materiałów!",
      "W swojej kolekcji planerów mają też coś dla studentów kierunków medycznych! Zachęcamy do odwiedzenia ich strony, aby wybrać planer dla siebie wcześniej i kupić z 30% zniżką po rozpoczęciu konferencji!",
      "Link do strony: https://www.ladyplaner.pl/",
      "Link do IG: https://www.instagram.com/ladyplaner/",
      "Serdecznie dziękujemy za wsparcie tegorocznej edycji konferencji Weekend z Ginekologią!"
    }',
    '{
      "We are very pleased to introduce another sponsor of our Conference - Lady Planer! The Lady Planer company distinguishes itself by its care for ecology, creating unique projects and creativity. Production in Poland, in a Warsaw workshop from the best quality materials!",
      "They also have something for medical students in their collection of planners! We encourage you to visit their website to choose your planner in advance and buy it with a 30% discount after the conference starts!",
      "Website: https://www.ladyplaner.pl/",
      "Instagram: https://www.instagram.com/ladyplaner/",
      "Thank you very much for supporting this year&#39;s edition of the Weekend with Gynecology conference!"
    }',
    'lady_planer.webp', '2023-03-24T23:23'),
  ('Ekspert - Jacek Sieńko', 'Expert - Jacek Sieńko',
    '{
      "Dr hab. n. med. Jacek Sieńko jest specjalistą położnikiem-ginekologiem oraz ginekologiem-onkologiem. Zajmuje się opieką nad kobietami w ciąży, diagnostyką i leczeniem pacjentek z problemami ginekologicznymi oraz chorymi z nowotworami narządu rodnego, w tym także wikłającymi ciążę. Na co dzień łączy pracę lekarza w Szpitalu Klinicznym im. ks. Anny Mazowieckiej w Warszawie z rolą nauczyciela akademickiego w II Katedrze i Klinice Położnictwa i Ginekologii Warszawskiego Uniwersytetu Medycznego. Od 1 października 2020 pełni funkcję Prodziekana ds. Studenckich English Division na Wydziale Lekarskim Warszawskiego Uniwersytetu Medycznego."
    }',
    '{
      "Jacek Sieńko MD, PhD is a specialist obstetrician-gynecologist and gynecologist-oncologist. He cares for pregnant women, diagnoses and treats patients with gynecological problems and patients with cancers of the reproductive organs, including those complicating pregnancy. On a daily basis, he combines the work of a doctor at the Clinical Hospital of Anna Mazowiecka in Warsaw with the role of an academic teacher in the 2nd Department and Clinic of Obstetrics and Gynecology of the Medical University of Warsaw. From October 1, 2020, he is the Vice-Dean for Student Affairs of the English Division at the Faculty of Medicine of the Medical University of Warsaw."
    }',
    'sienko.webp', '2023-03-23T07:12'),
  ('Nestmedic - sponsor', 'Nestmedic - sponsor',
    '{
      "Niezmiernie miło nam przedstawić kolejnego sponsora naszej Konferencji - Nestmedic! Nestmedic S.A. to producent innowacyjnego rozwiązania telemedycznego Pregnabit, do zdalnego monitorowania dobrostanu płodu, poprzez badanie kardiotokograficzne (KTG).",
      "Kardiotokografia umożliwia monitorowanie akcji serca płodu, tętna mamy, z jednoczasowym zapisem czynności skurczowej mięśnia macicy i ruchów płodu. Badanie przeprowadzane jest w ramach intensywnej opieki przedporodowej a także pozwala wcześnie wykryć sytuacje zagrożenia życia płodu.",
      "W 2022 spółka wprowadziła na rynek nową generację urządzenia o nazwie Pregnabit Pro. Produkt pracuje w czasie rzeczywistym, przesyłając zapis badania KTG bezpośrednio w jego trakcie na platformę telemedyczną, umożliwiając tym samym monitoring dobrostanu płodu przez personel medyczny, już od pierwszych minut badania."
    }',
    '{
      "We are very pleased to introduce another sponsor of our Conference - Nestmedic! Nestmedic S.A. is a manufacturer of the innovative Pregnabit telemedicine solution for remote monitoring of fetal well-being through cardiotocography (CTG).",
      "Cardiotocography enables monitoring of the fetal&#39;s heart rate and maternal pulse, with the simultaneous recording of uterine contractions and fetal movements. The test is carried out as part of intensive antenatal care and allows early detection of fetal life-threatening situations.",
      "In 2022, the company launched a new generation of the device called Pregnabit Pro. The product works in real time, sending the CTG recording directly during the examination to the telemedicine platform, thus enabling monitoring of the fetus&#39; well-being by medical personnel from the very first minutes of the examination."
    }',
    'nestmedic.webp', '2023-03-22T17:16'),
  ('Kolejna ekspertka', 'Another expert',
    '{
      "Ujawniamy ostatnią, nie mniej ważną, opiekunkę naszego koła, która dołączyła do grona ekspertów. Pani dr n. med. Joanna Kacperczyk-Bartnik jest absolwentką Warszawskiego Uniwersytetu Medycznego. Interesuje się profilaktyką chorób nowotworowych żeńskiego układu rozrodczego. Jest członkiem ESGO Prevention Committee, członkiem zarządu European Network of Young Gyne Oncologists oraz członkiem zespołu redakcyjnego International Journal of Gynecologic Oncology.",
      "Dziękujemy za poświęcony czas i zaangażowanie w kształcenie młodszego pokolenia!"
    }',
    '{
      "We reveal the last, no less important, guardian of our scientific circle, who joined the group of experts. Joanna Kacperczyk-Bartnik, MD, PhD is a graduate of the Medical University of Warsaw. She is interested in the prevention of cancer diseases of the female reproductive system. She is a member of the ESGO Prevention Committee, a member of the board of the European Network of Young Gyne Oncologists and a member of the editorial team of the International Journal of Gynecologic Oncology.",
      "Thank you for your time and commitment to educating the younger generation!"
    }',
    'kacperczyk.webp', '2023-03-22T14:47');
