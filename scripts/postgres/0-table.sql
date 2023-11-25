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
