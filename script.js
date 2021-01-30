'use strict'

function progressBarControl(){ // изменение длины progressBar'а
    let progressPercent = (window.pageYOffset - header.clientHeight) / (Main.scrollHeight - window.innerHeight) * 100;

    progressPercent = Math.max(0, progressPercent);
    progressPercent = Math.min(100, progressPercent);

    progressBar.style.width = progressPercent + '%';
}

function adjustArrows(){ // выравнивание стрелок переключения слайдов
    let elem = Main.querySelectorAll("section")[0];
    let height = elem.clientHeight;

    forwardArrow.style.top = (height / 4) + "px";
    backwardArrow.style.top = (height / 4) + "px";
}

function changeSlide(direction){ // смена слайдов
    let currentPosition;
    
    // нахождение позиции текущего слайда
    for(let i = 0; i < slidesList.length; ++i){
        if(slidesList[i].style.display != "none"){
            currentPosition = i;
            break;
        }
    }

    // расчет позиции следующего слайда
    currentPosition = direction == "forward" ? currentPosition + 1 : currentPosition - 1;
    currentPosition = (currentPosition + slidesList.length) % slidesList.length;

    // "включение" нужного и отключение ненужных слайдов
    for(let i = 0; i < slidesList.length; ++i){
        if(i == currentPosition)
            slidesList[i].style.display = "flex";
        else
            slidesList[i].style.display = "none";
    }

    console.log(currentPosition);
}

function appearUpwardArrow(){ // включение кнопки вверх
    let btn = document.querySelector(".upwardArrow");

    if(window.pageYOffset * 4 >= document.body.clientWidth)
        btn.style.opacity = '1';
    else
        btn.style.opacity = '0';
}

function changeNavigationBar(){ // "следящая" навигационная панель
    let elems = header.querySelectorAll(".mainnav > ul > li"); // список всех разделов
    let headers = Main.querySelectorAll("section > h2"); // список всех заголовков

    let currentPosition = 0; // текущий активный раздел

    for(let i = 1; i < headers.length; i++){ // поиск активного раздела
        if(headers[i].getBoundingClientRect().top < headers[currentPosition].getBoundingClientRect().top || headers[currentPosition].getBoundingClientRect().top < 0){
            currentPosition = i;
        }
    }

    for(let i = 0; i < elems.length; i++){ // выделение активного раздела, и деактивация остальных
        if(i == currentPosition){
            elems[i].classList.add("active");
        }
        else{
            elems[i].classList.remove("active");
        }
    }
}

function checkInputFields(){ // проверка заполнения полей ввода
    let fields = Main.querySelectorAll(".order-form > input"); // получение всех полей ввода
    let checker = true;

    for(let i = 0; i < fields.length; i++){
        let text = Main.querySelector(".order-form > label:nth-of-type(" + (i + 1) + ")");
        let cauntion = Main.querySelector(".order-form > label:nth-of-type(" + (i + 1) + ") > span"); // поле, где должно появляться предупреждение
        
        if(fields[i].value == ''){ 
            
            cauntion.style.color = "red";
            text.innerHTML = text.innerHTML.slice(0, -1);
            
            if(i == 0){
                first.classList.add("visibleSpan");
            }
            else if(i == 1){
                second.classList.add("visibleSpan");
            }
            else if(i == 2){
                third.classList.add("visibleSpan");
            }

            fields[i].style.border = "3px solid red";
            checker = false;
        }
        else{
            if(i == 0){
                first.classList.remove("visibleSpan");
            }
            else if(i == 1){
                second.classList.remove("visibleSpan");
            }
            else if(i == 2){
                third.classList.remove("visibleSpan");
            }
            fields[i].style.border = "1px solid black";
        }
    }

    return checker;
}

function addToCart(){ // добавление товара в корзину
    let cart = header.querySelector(".mainnav > ul > li:last-child");
    let cartCounter = header.querySelector(".mainnav > ul > li:last-child > span")

    cart.innerHTML = '<img src="img/cart25.png"></img> <span>' + (++cartCounter.innerHTML) + '</span>';
}

function getGoodsList(){ // функция для получения списка товаров
    let goodsList = Main.querySelector(".goods-wrapper");

    return goodsList;
}

function addReferences(list){
    for(let i = 0; i < list.length; i++){
        if(i == 0){
            console.log(i);
            list[i].addEventListener('click', function(){
                console.log(sliderSection.getBoundingClientRect().y);
               smoothTransition(0, sliderSection.getBoundingClientRect().y);
            });
        }
        else if(i == 1){
            list[i].addEventListener('click', function(){
                console.log(about.getBoundingClientRect().y);
               smoothTransition(0, about.getBoundingClientRect().y);
            });
        }
        else if(i == 2){
            list[i].addEventListener('click', function(){
                console.log(sendRequest.getBoundingClientRect().y);
               smoothTransition(0, sendRequest.getBoundingClientRect().y);
            });
        }
        else if(i == 3){
            list[i].addEventListener('click', function(){
               console.log(window.pageYOffset, marketSection.getBoundingClientRect().y);
               smoothTransition(0, marketSection.getBoundingClientRect().y);
            });
        }
    }
    console.log('Done');
}

function bottomDetection(){ // реакция на достижение конца страницы
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("Bottom");
        // дальше идёт ОГРООООМНЫЙ костыль по добавлению товаров в конец страницы
        marketSection.innerHTML += '<div class="goods-wrapper"><div class="product"><img src="img/goods/death-stranding.jpg"><h4>Death Stranding</h4><button><img src="img/cart16.png"></button></div><div class="product"><img src="img/goods/cyberpunk.jpg"><h4>Cyberpunk 2077</h4><button><img src="img/cart16.png"></button></div><div class="product"><img src="img/goods/rainbow-six.jpg"><h4>Rainbow Six Siege</h4><button><img src="img/cart16.png"></button></div><div class="product"><img src="img/goods/ghostrunner.jpg"><h4>Ghostrunner</h4><button><img src="img/cart16.png"></button></div><div class="product"><img src="img/goods/Battlefront_2.jpg"><h4>Battlefront II</h4><button><img src="img/cart16.png"></button></div><div class="product"><img src="img/goods/sea-of-thieves.jpg"><h4>Sea Of Thieves</h4><button><img src="img/cart16.png"></button></div></div>';
    }
}

function closePreloader(){ // выключение прелоадера и вклбчение основной страницы

    // по странным причинам не работает classList через querrySelector, проблема как и с формой отправки
    preloaderId.classList.add("disabled");
    
    header.classList.remove("disabled");
    progressBar.classList.remove("disabled");
    Main.classList.remove("disabled");
    navPosition = [sliderSection.getBoundingClientRect().top, about.getBoundingClientRect().top, sendRequest.getBoundingClientRect().top, marketSection.getBoundingClientRect().top]; // точки для плавного перехода

    setInterval(main, 10);
}

let goodsOrig = getGoodsList();
let goods = goodsOrig;

function main(){ // функции, которые должны исполняться каждый кадр
    progressBarControl();
    adjustArrows();
    appearUpwardArrow();
    changeNavigationBar();
    bottomDetection();
}

let slidesList = Main.querySelectorAll(".kit_slide"); // поиск всех слайдов
let buttonsList = Main.querySelectorAll(".product > button"); // поиск всех кнопок добавления в корзину
let navButtonsList = header.querySelectorAll(".mainnav > ul > li > a"); // поиск всех кнопок навигации
let navPosition;

for(let i = 0; i < buttonsList.length; i++){ // добавление всем кнопкам товаров события добавления в корзину
    buttonsList[i].addEventListener('click', function(){
        addToCart();
    });
}

for(let i = 0; i < navButtonsList.length; i++){ // добавление плавного перехода якорным ссылкам
    navButtonsList[i].addEventListener('click', function(){
        window.scrollTo({
            top: navPosition[i] - 35,
            left: 0,
            behavior: 'smooth' // эта странная конструкция позволяет делать плавные переходы
        });
    });
}

backwardArrow.addEventListener('click', function(){ // кнопка предыдущего слайда
    changeSlide('backward');
});

forwardArrow.addEventListener('click', function(){ // кнопка следующего слайда
    changeSlide('forward');
});

upArrow.addEventListener('click', function(){ // кнопка перемещения к верху страницы
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});  
    //smoothTransition(0, 0);
});

orderButton.addEventListener('click', function(){ // проявление окна при подаче заявки
    if(checkInputFields()){
        let message = Main.querySelector(".order-alert");

        let name = firstname_field.value;
        let surname = lastname_field.value[0];

        nameField.innerHTML = name + " " + surname + ".";

        message.classList.add("visible");
    }
});

let loadTimer = setTimeout(closePreloader, 4 * 1000);