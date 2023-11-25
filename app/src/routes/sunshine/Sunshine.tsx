import React from 'react'
import './Sunshine.css'

function Sunshine() {
  return (
    <div
      style={{
        backgroundImage: 'url(/static/images/background.svg)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '',
      }}
    >
      <div className='sunshine-main-wrapper'>
        <p className='corner-text'>13/52</p>

        <div className='peek-container'>
          <img
            className='peek-image'
            src='/static/experts/krzysztof-czajkowski.webp'
          />
          <p className='peek-text'>Doceniony?</p>
        </div>

        <img
          className='ronia-image'
          src='static/images/ronia.jpg'
          alt='Moja ukochana'
        />
        <h2 className='image-sub'>Ronia 🥰</h2>
        <p className='ronia-text-center'>
          Moja ukochana, najcudowniejsza dziewczyna na świecie. <br />
          Ta stronka nie powstałaby, gdyby nie ona.
        </p>
      </div>
      <div className='splitter'>
        <div className='ronia-div-split'>
          <p className='ronia-section-header'>Upór</p>
          <p>
            Wiele pracy kosztowało nas oboje zrobienie tej strony, ale myślę, że
            było warto i że oboje jesteśmy bardzo zadowoleni z efektów. I może
            ja jestem programistą i ja wprowadziłem w życie wszystkie pomysły,
            ale to Ty Ronia byłaś dla mnie cały czas motywacją. To Ty mówiłaś
            &quot;idc, zrób to&quot;, kiedy ja mówiłem &quot;nie da się&quot;. I
            zawsze okazywało się, że jednak się da 😇
          </p>
          <p>
            Przeklinałem czasami po cichu Twój upór i myślałem sobie w duchu, że
            mam dosyć, że przecież powiedziałem, że się nie da, czemu dalej
            drążysz temat. Wiele razy miałem ochotę powiedzieć &quot;nie da
            się&quot; i zakończyć temat. Ale Ty dalej byłaś uparta.
          </p>
          <p>
            Ale wiesz co? Robienie tej stronki razem z Tobą nauczyło mnie kochać
            Twój upór. Czasami to ja musiałem postawić na swoim i powiedzieć, że
            nie można czegośc jakoś zrobić, a czasami to Ty to robiłaś i
            pozwalałaś mi uwolnić mój pełen potencjał. Twój brak wiedzy na temat
            tego, jak zrobić różne rzeczy i skupienie się na tym, jaki ma być
            efekt zmuszało mnie nieustannie do wychodzenia ze swojej strefy
            komforu i uczenia się nowych rzeczy. Kocham Twój upór, tak jak
            kocham też całą resztę Ciebie ❤️
          </p>

          <p className='ronia-section-header'>Gust</p>
          <p>
            Wiele też się nauczyłem o tym, co Ci się podoba. To, że nie lubisz
            kiczu wiedziałem już wcześniej. Już wcześniej wiedziałem, że masz
            wysokie wymagania i w praktyce zobaczyłem, jak faktycznie wygląda
            Twój gust. I cieszę się bardzo, że mamy podobny, to nam bardzo wiele
            rzeczy w życiu ułatwi.
          </p>
          <p>
            Podejrzewam, że wiele rzeczy też utrudni, bo będziemy w stanie
            spędzić tygodnie próbując wybrać kolor fug do łazienki xD
            <br />
          </p>

          <p className='ronia-section-header'>Dziękuję</p>
          <p>Muszę Ci podziękować za dwie rzeczy.</p>
          <p>
            Dziękuję Ci za to, że cały czas mnie popychałaś i nie dawałaś mi się
            poddać. Dziękuję, że cały czas byłaś przy mnie i wspierałaś mnie,
            kiedy już nie miałem siły, kiedy robienie stronki nakładało się z
            obowiązkami na studiach. Dziękuję za to, że nie zostawiłaś mnie z
            tym zadaniem samego, tylko razem ze mną godzinami siedziałaś i
            zastanawiałaś się, jak to wszystko zrobić, żeby dobrze wyglądało.
            Bez Ciebie nie dałbym rady, a dzięki Twojemu wsparciu stworzyliśmy
            razem coś cudownego &lt;3
          </p>
          <p>
            Dziękuję Ci za to, że przyjęłaś propozycję zrobienia stronki. Nawet
            nie wiesz ile rzeczy to mi ułatwi w tym semestrze, bo przecież
            dzięki temu udało mi się zaliczyć jeden przedmiot bez robienia
            projektu. Może w zeszłym semestrze było trudniej przez robienie
            stronki, ale w tym będzie nieporównywalnie łatwiej.
          </p>
          <p>
            Cieszę się, że mamy teraz to doświadczenie robienia czegoś razem. To
            jest dobre doświadczenie ❤️
          </p>
          <div className='sign-container'>
            <img className='rose-svg' src='/static/images/rose.svg' />
            <div>
              <p className='sign-label'>Twój kochający</p>
              <p className='sign'>Karol</p>
            </div>
          </div>
        </div>
        <div className='ronia-div-split ronia-div-right'>
          <img className='screen-image' src='/static/images/screen1.png' />
          <p className='screen-image-subtext'>
            Pierwsza wersja ekranu głównego
          </p>
          <img className='screen-image' src='/static/images/screen2.png' />
          <p className='screen-image-subtext'>dr Elton John!</p>
          <img className='screen-image' src='/static/images/screen3.png' />
          <p className='screen-image-subtext'>
            No i yyyy... To też się wydarzyło.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sunshine
